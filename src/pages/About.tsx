import { 
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar
} from '@ionic/react';

import { personCircleOutline, codeSlashOutline, mailOutline } from 'ionicons/icons';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>About Me</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding" style={{ backgroundColor: '#f4f4f4' }}>
        {/* Profile Section */}
        <IonCard className="ion-text-center" style={{ marginBottom: '20px' }}>
          <IonCardHeader>
            <IonIcon icon={personCircleOutline} style={{ fontSize: '80px', color: '#4CAF50' }} />
            <IonCardTitle>Racoma</IonCardTitle>
            <p>Wanna be App Developer</p>
          </IonCardHeader>
          <IonCardContent>
            Passionate about building efficient and scalable applications.  
            Always exploring new technologies and frameworks.  
            Currently studying <strong>Ionic Framework</strong> to enhance cross-platform development skills.
          </IonCardContent>
        </IonCard>

        {/* Skills Section */}
        <IonCard style={{ marginBottom: '20px' }}>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={codeSlashOutline} style={{ marginRight: '8px', color: '#4CAF50' }} />
              Skills & Technologies
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            ⚡ JavaScript | TypeScript | Python | Java <br />
            ⚡ React | Ionic | Node.js <br />
            ⚡ PHP | MySQL <br />
          </IonCardContent>
        </IonCard>

        {/* Contact Section */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={mailOutline} style={{ marginRight: '8px', color: '#4CAF50' }} />
              Contact Me
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>GitHub: <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">github.com/yourusername</a></p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default About;
