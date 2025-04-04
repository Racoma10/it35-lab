import React, { useState } from 'react';
import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonInput, 
  IonItem, 
  IonList, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonLabel, 
  useIonRouter, 
  IonToast,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
} from '@ionic/react';

const Register: React.FC = () => {
  const navigation = useIonRouter();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleRegister = () => {
    if (!userName || !email || !password) {
      setToastMessage('Please fill in all fields!');
      setShowToast(true);
      return;
    }
    if (password.length < 6) {
      setToastMessage('Password should be at least 6 characters.');
      setShowToast(true);
      return;
    }

    // Navigate after successful registration
    navigation.push('/Welcome', 'forward', 'replace');
    setToastMessage('Registration successful!');
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonGrid className="ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="6" sizeLg="4">
              <IonCard style={{ padding: '20px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonLabel position="floating">User Name</IonLabel>
                      <IonInput 
                        value={userName}
                        onIonChange={e => setUserName(e.detail.value!)}
                        placeholder="Enter your username"
                      />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="floating">Email</IonLabel>
                      <IonInput 
                        type="email"
                        value={email}
                        onIonChange={e => setEmail(e.detail.value!)}
                        placeholder="Enter your email"
                      />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="floating">Password</IonLabel>
                      <IonInput 
                        type="password"
                        value={password}
                        onIonChange={e => setPassword(e.detail.value!)}
                        placeholder="Enter your password"
                      />
                    </IonItem>
                  </IonList>

                  <IonButton 
                    expand="full" 
                    onClick={handleRegister} 
                    style={{ marginTop: '20px', borderRadius: '8px', fontWeight: 'bold' }}
                  >
                    Register
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;
