import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent, 
  IonIcon, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonToast,  
  useIonRouter
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons'; // Changed icon
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true); 
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };

  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20%'
        }}>
          <IonAvatar
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '10px'
            }}
          >
            <IonIcon 
              icon={personCircleOutline} // Changed to user icon
              style={{ fontSize: '120px', color: '#3b82f6' }} 
            />
          </IonAvatar>

          <h1 style={{
            marginBottom: '20px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            Welcome Back
          </h1>

          <IonInput
            label="Email" 
            labelPlacement="floating" 
            fill="outline"
            type="email"
            placeholder="Enter your email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
          />
          <IonInput
            style={{ marginTop: '12px' }}
            fill="outline"
            type="password"
            placeholder="Enter your password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>
        </div>

        <IonButton 
          onClick={doLogin} 
          expand="full" 
          shape="round" 
          style={{ marginTop: '24px' }}
        >
          Log In
        </IonButton>

        <IonButton 
          routerLink="/it35-lab/register" 
          expand="full" 
          fill="clear" 
          shape="round"
          style={{ marginTop: '8px' }}
        >
          Don't have an account? Register here
        </IonButton>

        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
