import { useState, useEffect } from 'react';
import {
  IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonLabel,
  IonModal, IonFooter, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonAlert, IonText, IonAvatar, IonCol, IonRow, IonIcon, IonPopover, IonTextarea
} from '@ionic/react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';
import {
  pencilOutline, trashOutline, createOutline,
  heartOutline, chatbubbleOutline, shareSocialOutline
} from 'ionicons/icons';

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
}

interface Comment {
  comment_id: string;
  post_id: string;
  user_id: number;
  username: string;
  content: string;
  created_at: string;
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
  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({});
  const [newComment, setNewComment] = useState<{ [postId: string]: string }>({});
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

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
      const { data, error } = await supabase.from('posts').select('*').order('post_created_at', { ascending: false });
      if (!error) {
        setPosts(data as Post[]);
        data.forEach(post => fetchComments(post.post_id));
      }
    };

    fetchUser();
    fetchPosts();
  }, []);

  const fetchComments = async (postId: string) => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (!error) {
      setComments(prev => ({ ...prev, [postId]: data as Comment[] }));
    }
  };

  const createPost = async () => {
    if (!postContent || !user || !username) return;

    const { data: userData } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();

    const avatarUrl = userData?.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg';

    const { data, error } = await supabase
      .from('posts')
      .insert([
        { post_content: postContent, user_id: user.id, username, avatar_url: avatarUrl }
      ])
      .select('*');

    if (!error && data) {
      setPosts([data[0] as Post, ...posts]);
      fetchComments(data[0].post_id);
    }

    setPostContent('');
  };

  const deletePost = async (post_id: string) => {
    await supabase.from('posts').delete().match({ post_id });
    setPosts(posts.filter(post => post.post_id !== post_id));
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

  const handleComment = async (postId: string) => {
    const content = newComment[postId];
    if (!content || !user || !username) return;

    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          post_id: postId,
          user_id: user.id,
          username,
          content
        }
      ])
      .select('*');

    if (!error && data) {
      fetchComments(postId);
      setNewComment(prev => ({ ...prev, [postId]: '' }));
    }
  };

  const toggleLike = async (postId: string) => {
    if (!user) return;
    const alreadyLiked = likedPosts.includes(postId);
    if (alreadyLiked) {
      await supabase.from('likes').delete().match({ post_id: postId, user_id: user.id });
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      await supabase.from('likes').insert({ post_id: postId, user_id: user.id });
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const sharePost = (content: string) => {
    if (navigator.share) {
      navigator.share({ title: 'Check this out!', text: content }).catch(console.error);
    } else {
      alert('Sharing not supported in this browser.');
    }
  };

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Social Feed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {user ? (
            <>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle><IonIcon icon={createOutline} /> Create Post</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonInput value={postContent} onIonChange={e => setPostContent(e.detail.value!)} placeholder="What's on your mind?" />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <IonButton onClick={createPost}>Post</IonButton>
                  </div>
                </IonCardContent>
              </IonCard>

              {posts.map(post => (
                <IonCard key={post.post_id}>
                  <IonCardHeader>
                    <IonRow className="ion-align-items-center">
                      <IonCol size="auto">
                        <IonAvatar>
                          <img alt={post.username} src={post.avatar_url} />
                        </IonAvatar>
                      </IonCol>
                      <IonCol>
                        <IonCardTitle>{post.username}</IonCardTitle>
                        <IonCardSubtitle>{new Date(post.post_created_at).toLocaleString()}</IonCardSubtitle>
                      </IonCol>
                      <IonCol size="auto">
                        <IonButton
                          fill="clear"
                          onClick={(e) => setPopoverState({ open: true, event: e.nativeEvent, postId: post.post_id })}
                        >
                          <IonIcon icon={pencilOutline} />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonCardHeader>

                  <IonCardContent>
                    <IonText>
                      <p>{post.post_content}</p>
                    </IonText>

                    <IonRow className="ion-justify-content-around ion-margin-top">
                      <IonButton fill="clear" size="small" onClick={() => toggleLike(post.post_id)} color={likedPosts.includes(post.post_id) ? 'danger' : 'medium'}>
                        <IonIcon icon={heartOutline} slot="icon-only" />
                      </IonButton>
                      <IonButton fill="clear" size="small" onClick={() => fetchComments(post.post_id)}>
                        <IonIcon icon={chatbubbleOutline} slot="icon-only" />
                      </IonButton>
                      <IonButton fill="clear" size="small" onClick={() => sharePost(post.post_content)}>
                        <IonIcon icon={shareSocialOutline} slot="icon-only" />
                      </IonButton>
                    </IonRow>

                    {comments[post.post_id]?.map(comment => (
                      <IonText key={comment.comment_id}>
                        <p><strong>{comment.username}:</strong> {comment.content}</p>
                      </IonText>
                    ))}

                    <IonRow className="ion-align-items-center ion-margin-top">
                      <IonCol>
                        <IonTextarea
                          placeholder="Write a comment..."
                          value={newComment[post.post_id] || ''}
                          onIonChange={e =>
                            setNewComment(prev => ({ ...prev, [post.post_id]: e.detail.value! }))
                          }
                        />
                      </IonCol>
                      <IonCol size="auto">
                        <IonButton size="small" onClick={() => handleComment(post.post_id)}>Post</IonButton>
                      </IonCol>
                    </IonRow>
                  </IonCardContent>

                  <IonPopover
                    isOpen={popoverState.open && popoverState.postId === post.post_id}
                    event={popoverState.event}
                    onDidDismiss={() => setPopoverState({ open: false, event: null, postId: null })}
                  >
                    <IonButton
                      fill="clear"
                      onClick={() => {
                        startEditingPost(post);
                        setPopoverState({ open: false, event: null, postId: null });
                      }}
                    >
                      <IonIcon icon={pencilOutline} slot="start" /> Edit
                    </IonButton>
                    <IonButton
                      fill="clear"
                      color="danger"
                      onClick={() => {
                        deletePost(post.post_id);
                        setPopoverState({ open: false, event: null, postId: null });
                      }}
                    >
                      <IonIcon icon={trashOutline} slot="start" /> Delete
                    </IonButton>
                  </IonPopover>
                </IonCard>
              ))}
            </>
          ) : (
            <IonLabel>Loading...</IonLabel>
          )}
        </IonContent>

        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Edit Post</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput value={postContent} onIonChange={e => setPostContent(e.detail.value!)} placeholder="Edit your post..." />
          </IonContent>
          <IonFooter>
            <IonButton expand="full" onClick={savePost}>Save</IonButton>
            <IonButton expand="full" color="medium" onClick={() => setIsModalOpen(false)}>Cancel</IonButton>
          </IonFooter>
        </IonModal>

        <IonAlert
          isOpen={isAlertOpen}
          onDidDismiss={() => setIsAlertOpen(false)}
          header="Success"
          message="Post updated successfully!"
          buttons={['OK']}
        />
      </IonPage>
    </IonApp>
  );
};

export default FeedContainer;
