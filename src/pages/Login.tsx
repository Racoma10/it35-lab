import { 
  IonAvatar, 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  useIonRouter 
} from '@ionic/react';
import { useState } from 'react';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const doLogin = () => {
    navigation.push('/it35-lab/app', 'forward', 'replace');
  };

  const doSignup = () => {
    navigation.push('/Register', 'forward', 'replace'); 
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent 
        className="ion-padding" 
        style={{ 
          display: 'flex', flexDirection: 'column', 
          alignItems: 'center', justifyContent: 'center', 
          height: '100vh', background: 'linear-gradient(135deg, #A2DBFA, #39A2DB)' 
        }}
      >
        {/* Avatar Section */}
        <IonAvatar style={{ width: '100px', height: '100px', marginBottom: '20px' }}>
          <img 
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Profile"
            style={{ width: '100%', height: '100%', borderRadius: '50%' }} 
          />
        </IonAvatar>

        {/* Email Input */}
        <IonItem style={{ width: '85%', marginBottom: '15px', borderRadius: '10px', background: '#fff' }}>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput 
            value={email} 
            onIonInput={(e) => setEmail(e.detail.value!)} 
            placeholder="Enter email" 
            type="email"
          />
        </IonItem>

        {/* Password Input */}
        <IonItem style={{ width: '85%', marginBottom: '20px', borderRadius: '10px', background: '#fff' }}>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput 
            type="password" 
            value={password} 
            onIonInput={(e) => setPassword(e.detail.value!)} 
            placeholder="Enter password"
          />
        </IonItem>

        {/* Login Button */}
        <IonButton 
          onClick={doLogin} 
          expand="full" 
          style={{ 
            width: '85%', 
            backgroundColor: '#007AFF', 
            color: '#fff', 
            fontWeight: 'bold',
            borderRadius: '10px',
            padding: '12px',
          }}
        >
          Login
        </IonButton>

        {/* Signup Button */}
        <IonButton 
          onClick={doSignup} 
          expand="full" 
          fill="outline"
          style={{
            width: '85%', 
            marginTop: '10px',
            borderRadius: '10px',
            fontWeight: 'bold',
          }}
        >
          Sign Up
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
