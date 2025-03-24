import React, { useState } from 'react';
import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonInput, 
  IonItem, 
  IonList, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonLabel, 
  useIonRouter, 
  IonToast,
  IonGrid,
  IonRow,
  IonCol
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

    // If everything is valid, navigate to the next page or perform registration logic
    navigation.push('/Welcome', 'forward', 'replace');
    setToastMessage('Registration successful!');
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid style={{ height: '100%' }}>
          <IonRow
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <IonCol size="12" sizeMd="6" style={{ display: 'flex', justifyContent: 'center' }}>
              <IonList style={{ width: '100%' }}>
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

                <IonItem>
                  <IonButton expand="full" onClick={handleRegister}>
                    Register
                  </IonButton>
                </IonItem>
              </IonList>
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
