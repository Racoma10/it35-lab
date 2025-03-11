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
import { lockClosed, eye } from 'ionicons/icons';

const Login: React.FC = () => {
  const navigation = useIonRouter();

  // Navigate to the next page after login
  const doLogin = () => {
    navigation.push('/it35-lab/app', 'forward', 'replace');
  };

  // Navigate to the Sign Up page
  const goToSignUp = () => {
    navigation.push('/it35-lab/app/signup', 'forward', 'replace');
  };

  // Dummy functions to handle input (for demonstration purposes)
  function setEmail(arg0: string): void {
    console.log(arg0);
  }

  function setPassword(arg0: string): void {
    console.log(arg0);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ backgroundColor: '#f4f4f4' }}>
        {/* Avatar section */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <IonAvatar style={{ width: '120px', height: '120px', margin: 'auto', border: '4px solid #fff' }}>
            <img 
              src="https://scontent.fmnl13-3.fna.fbcdn.net/v/t39.30808-6/471161084_2495034340827974_3518411833534799390_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFOkB6OuUHL086IixVOFHFcg5x6nKHXBt-DnHqcodcG3yeFsX7B9zPNt8KQeSgvj7jJjRDW28olziOnzO20yM_g&_nc_ohc=yY8CEAU8m0kQ7kNvgEMLqvv&_nc_oc=Adi5jj6vsZOz2T3yNCz_R8xklmmr31Va0FdKf7kBmuJe23b2zPCKdFjhxPon76vGRAhy_Y4untkb9oFNRtTngplF&_nc_zt=23&_nc_ht=scontent.fmnl13-3.fna&_nc_gid=AgTpEspk7pFfSayuBbECi_8&oh=00_AYCq2r5bHjw8Eec7T1xJX6knx5FyzzMnHOcuVOUvuJQlsg&oe=67CE3FC3"
              style={{ width: '100%', height: '100%', borderRadius: '50%' }} 
            />
          </IonAvatar>
        </div>

        {/* Form Inputs */}
        <IonItem className="ion-margin-bottom">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput 
            value="racoma1@gmail.com"
            onIonInput={(e) => setEmail(e.detail.value!)}
            placeholder="Enter email" 
            style={{ borderRadius: '8px', padding: '10px' }}
          />
        </IonItem>

        <IonItem className="ion-margin-bottom">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput 
            type="password" 
            value="BEBENA"
            onIonInput={(e) => setPassword(e.detail.value!)}
            placeholder="Enter password"
            style={{ borderRadius: '8px', padding: '10px' }}
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
            marginTop: '20px'
          }}
        >
          Login
        </IonButton>

        {/* Sign Up Button */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <IonButton 
            onClick={goToSignUp} 
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
