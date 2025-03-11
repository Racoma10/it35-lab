import { 
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent, 
  IonHeader, 
  IonImg,
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

const Favorites: React.FC = () => {
  return (
      <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonButtons slot='start'>
                      <IonMenuButton />
                  </IonButtons>
                  <IonTitle>Favorite Issues</IonTitle>
              </IonToolbar>
          </IonHeader>

          <IonContent fullscreen>
              <IonCard color="light">
                  <IonCardHeader>
                      <IonCardTitle>Rice High Demand</IonCardTitle>
                      
                  </IonCardHeader>
                  <IonCardContent>THE Department of Agriculture (DA) said on Monday that it estimates rice demand for 2025 at over 15 million metric tons (MMT).

The rice harvest is expected to improve this year due to favorable growing conditions, Assistant Secretary Arnel V. de Mesa said on the sidelines of a briefing.

He said the El Niño and La Niña weather patterns significantly affected domestic rice output last year.</IonCardContent>
              </IonCard>

              
              <IonImg 
                  src="https://static1.straitstimes.com.sg/s3fs-public/styles/large30x20/public/articles/2023/08/11/2023-08-10T120600Z349680389RC2TG2AT3NCYRTRMADP3ASIA-RICE.JPG" 
                  alt="Below Card Image"
                  style={{ borderRadius: '8px', width: '100%', maxHeight: '50', objectFit: 'cover', marginTop: '5px' }}
              />   

              <div
                  style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '80%',
                  }}
              >
                  Favorites
              </div>
          </IonContent>
      </IonPage>
  );
};

export default Favorites;
