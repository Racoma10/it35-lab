import { 
  IonAvatar, 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  useIonRouter 
} from '@ionic/react';
import { eye } from 'ionicons/icons';
import { useState } from 'react';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState<string>(''); // Declare email state
  const [password, setPassword] = useState<string>(''); // Declare password state

  // Navigate to the app page after login
  const doLogin = () => {
    // You might want to add authentication logic here
    navigation.push('/it35-lab/app', 'forward', 'replace');
  };

  // Navigate to the registration (signup) page
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

      <IonContent className="ion-padding" style={{ backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        {/* Avatar Section */}
        <IonAvatar style={{ width: '120px', height: '120px', marginBottom: '30px' }}>
          <img 
            src="https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/465182122_2454731428191599_5004081248321571355_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEFDhFCRmvv1RGV_rtMQPPra6erB_U3p4xrp6sH9TenjGPFVLjc4DEPMe7fa960aONQbKLiirkD4tbapcjK53KW&_nc_ohc=FulTKx5jseYQ7kNvgF5r3k_&_nc_oc=AdgoKcv0QCPwtJVYQ8YFXeezYDDTqD3fxefFexIvpDY3l7Kf035CI4dWnPXSlxikEI3oksu9c5d7f1y5FPOU0DOU&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=ApTMxzHOHDSiyowlkDnh-P2&oh=00_AYEvBuUiXDJcsfxTW6nA20y0lS1vYHqXa_fVvNff25peqQ&oe=67D8CDC1"
            alt="Profile"
            style={{ width: '100%', height: '100%', borderRadius: '50%' }} 
          />
        </IonAvatar>

        {/* Email Input */}
        <IonItem className="ion-margin-bottom" lines="none" style={{ width: '90%', borderRadius: '12px', backgroundColor: '#fff', padding: '10px 15px' }}>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput 
            value={email}
            onIonInput={(e) => setEmail(e.detail.value!)}
            placeholder="Enter email" 
            style={{ borderRadius: '8px' }}
          />
        </IonItem>

        {/* Password Input */}
        <IonItem className="ion-margin-bottom" lines="none" style={{ width: '90%', borderRadius: '12px', backgroundColor: '#fff', padding: '10px 15px' }}>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput 
            type="password" 
            value={password}
            onIonInput={(e) => setPassword(e.detail.value!)}
            placeholder="Enter password"
            style={{ borderRadius: '8px' }}
          >
            <IonIcon slot="end" icon={eye} />
          </IonInput>
        </IonItem>

        {/* Login Button */}
        <IonButton 
          onClick={() => doLogin()} 
          expand="full" 
          style={{
            backgroundColor: '#4CAF50',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '16px',
            marginTop: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          Login
        </IonButton>

        {/* Register Button/Link */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <IonButton 
            onClick={doSignup} 
            color="secondary" 
            expand="full" 
            style={{
              fontWeight: 'bold',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '8px'
            }}
          >
            Don't have an account? Sign Up
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
