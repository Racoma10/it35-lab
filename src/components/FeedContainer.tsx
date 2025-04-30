import { useState, useEffect } from 'react';
import {
  IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonLabel,
  IonModal, IonFooter, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonAlert, IonText, IonAvatar, IonCol, IonGrid, IonRow, IonIcon, IonPopover
} from '@ionic/react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';
import { pencil, trash, heart, shareSocial } from 'ionicons/icons';

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
  likes?: number;
  likedByUser?: boolean;
}

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user?.email?.endsWith('@nbsc.edu.ph')) {
        setUser(authData.user);
        const { data: userData, error } = await supabase
          .from('users')
          .select('user_id, username, user_avatar_url')
          .eq('user_email', authData.user.email)
          .single();
        if (!error && userData) {
          setUser({ ...authData.user, id: userData.user_id });
          setUsername(userData.username);
        }
      }
    };
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('post_created_at', { ascending: false });

      if (!error && data) {
        const enrichedPosts = await Promise.all(
          data.map(async (post: Post) => {
            const { count: likes } = await supabase
              .from('post_likes')
              .select('*', { count: 'exact', head: true })
              .eq('post_id', post.post_id);

            const { data: userLiked } = await supabase
              .from('post_likes')
              .select('*')
              .eq('post_id', post.post_id)
              .eq('user_id', user?.id)
              .single();

            return {
              ...post,
              likes: likes || 0,
              likedByUser: !!userLiked
            };
          })
        );
        setPosts(enrichedPosts);
      }
    };

    fetchUser();
    fetchPosts();
  }, [user?.id]);

  const createPost = async () => {
    if (!postContent || !user || !username) return;

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();

    if (userError) return;

    const avatarUrl = userData?.user_avatar_url || '';

    const { data, error } = await supabase
      .from('posts')
      .insert([{ post_content: postContent, user_id: user.id, username, avatar_url: avatarUrl }])
      .select('*');

    if (!error && data) setPosts([data[0] as Post, ...posts]);

    setPostContent('');
  };

  const deletePost = async (post_id: string) => {
    await supabase.from('posts').delete().match({ post_id });
    setPosts(posts.filter(post => post.post_id !== post_id));
  };

  const toggleLike = async (post: Post) => {
    if (!user) return;
    if (post.likedByUser) {
      await supabase.from('post_likes').delete().match({ post_id: post.post_id, user_id: user.id });
    } else {
      await supabase.from('post_likes').insert({ post_id: post.post_id, user_id: user.id });
    }
    setPosts(posts.map(p => p.post_id === post.post_id ? { ...p, likedByUser: !p.likedByUser, likes: p.likes! + (p.likedByUser ? -1 : 1) } : p));
  };

  const sharePost = (post: Post) => {
    if (navigator.share) {
      navigator.share({
        title: `${post.username}'s Post`,
        text: post.post_content,
        url: window.location.href
      });
    } else {
      alert('Sharing not supported on this device.');
    }
  };

  const startEditingPost = (post: Post) => {
    setEditingPost(post);
    setPostContent(post.post_content);
    setIsModalOpen(true);
  };

  const savePost = async () => {
    if (!postContent || !editingPost) return;
    const { data, error } = await supabase
      .from('posts')
      .update({ post_content: postContent })
      .match({ post_id: editingPost.post_id })
      .select('*');
    if (!error && data) {
      const updatedPost = data[0] as Post;
      setPosts(posts.map(post => (post.post_id === updatedPost.post_id ? updatedPost : post)));
      setPostContent('');
      setEditingPost(null);
      setIsModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  return (
    <>
      {user ? (
        <>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Create Post</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonInput
                value={postContent}
                onIonChange={e => setPostContent(e.detail.value!)}
                placeholder="Write a post..."
              />
            </IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem' }}>
              <IonButton onClick={createPost}>Post</IonButton>
            </div>
          </IonCard>

          {posts.map(post => (
            <IonCard key={post.post_id}>
              <IonCardHeader>
                <IonRow>
                  <IonCol size="1.85">
                    <IonAvatar><img src={post.avatar_url} alt={post.username} /></IonAvatar>
                  </IonCol>
                  <IonCol>
                    <IonCardTitle>{post.username}</IonCardTitle>
                    <IonCardSubtitle>{new Date(post.post_created_at).toLocaleString()}</IonCardSubtitle>
                  </IonCol>
                  <IonCol size="auto">
                    <IonButton fill="clear" onClick={(e) => setPopoverState({ open: true, event: e.nativeEvent, postId: post.post_id })}>
                      <IonIcon icon={pencil} />
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCardHeader>

              <IonCardContent>
                <IonText><p>{post.post_content}</p></IonText>
                <IonButton fill="clear" onClick={() => toggleLike(post)}>
                  <IonIcon icon={heart} color={post.likedByUser ? 'danger' : 'medium'} /> {post.likes}
                </IonButton>
                <IonButton fill="clear" onClick={() => sharePost(post)}>
                  <IonIcon icon={shareSocial} /> Share
                </IonButton>
              </IonCardContent>

              <IonPopover
                isOpen={popoverState.open && popoverState.postId === post.post_id}
                event={popoverState.event}
                onDidDismiss={() => setPopoverState({ open: false, event: null, postId: null })}
              >
                <IonButton fill="clear" onClick={() => { startEditingPost(post); setPopoverState({ open: false, event: null, postId: null }); }}>Edit</IonButton>
                <IonButton fill="clear" color="danger" onClick={() => { deletePost(post.post_id); setPopoverState({ open: false, event: null, postId: null }); }}>Delete</IonButton>
              </IonPopover>
            </IonCard>
          ))}
        </>
      ) : (
        <IonLabel>Loading...</IonLabel>
      )}

      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonHeader><IonToolbar><IonTitle>Edit Post</IonTitle></IonToolbar></IonHeader>
        <IonInput value={postContent} onIonChange={e => setPostContent(e.detail.value!)} placeholder="Edit your post..." />
        <IonFooter>
          <IonButton onClick={savePost}>Save</IonButton>
          <IonButton onClick={() => setIsModalOpen(false)}>Cancel</IonButton>
        </IonFooter>
      </IonModal>

      <IonAlert isOpen={isAlertOpen} onDidDismiss={() => setIsAlertOpen(false)} header="Success" message="Post updated successfully!" buttons={['OK']} />
    </>
  );
};

export default FeedContainer;
