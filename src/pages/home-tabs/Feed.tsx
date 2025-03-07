import { 
    IonButtons,
      IonCard,
      IonCardContent,
      IonCardHeader,
      IonCardSubtitle,
      IonCardTitle,
      IonContent, 
      IonHeader, 
      IonMenuButton, 
      IonPage, 
      IonTitle, 
      IonToolbar 
  } from '@ionic/react';
  
  const Feed: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Feed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <IonCard>
      <img alt="Silhouette of mountains" src="https://i.ytimg.com/vi/8dr7YK3wLQ8/maxresdefault.jpg" />
      <IonCardHeader>
        <IonCardTitle>VP SARAH DUTERTE EMPEACHMENT</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>In December 2024, four impeachment complaints were formally filed against Sara Duterte, the vice president of the Philippines, serving under President Bongbong Marcos.</IonCardContent>
    </IonCard>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            Feed
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Feed;