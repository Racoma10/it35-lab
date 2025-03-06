import { 
  IonAvatar,
  IonButton,
  IonButtons,
    IonContent, 
    IonHeader, 
    IonIcon, 
    IonInput, 
    IonInputPasswordToggle, 
    IonItem, 
    IonList, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    useIonRouter
} from '@ionic/react';
import { lockClosed, eye } from 'ionicons/icons';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const doLogin = () => {
      navigation.push('/it35-lab/app','forward','replace');
  }
  function setEmail(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  function setPassword(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <IonAvatar style={{ width: "120px", height: "120px", margin: "auto" }}>
            <img 
              
              src="https://scontent.fmnl13-3.fna.fbcdn.net/v/t39.30808-6/471161084_2495034340827974_3518411833534799390_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFOkB6OuUHL086IixVOFHFcg5x6nKHXBt-DnHqcodcG3yeFsX7B9zPNt8KQeSgvj7jJjRDW28olziOnzO20yM_g&_nc_ohc=yY8CEAU8m0kQ7kNvgEMLqvv&_nc_oc=Adi5jj6vsZOz2T3yNCz_R8xklmmr31Va0FdKf7kBmuJe23b2zPCKdFjhxPon76vGRAhy_Y4untkb9oFNRtTngplF&_nc_zt=23&_nc_ht=scontent.fmnl13-3.fna&_nc_gid=AgTpEspk7pFfSayuBbECi_8&oh=00_AYCq2r5bHjw8Eec7T1xJX6knx5FyzzMnHOcuVOUvuJQlsg&oe=67CE3FC3"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }} 
            />
          </IonAvatar>
          
        </div>
      <>
      <IonInput 
          label="Email" 
          labelPlacement="floating" 
          value="racoma1@gmail.com"
          onIonInput={(e) => setEmail(e.detail.value!)}
          placeholder="Enter email" 
        />

        <br />

        <IonInput 
          type="password" 
          label="Password" 
          labelPlacement="floating"
          value=" BEBENA"
          onIonInput={(e) => setPassword(e.detail.value!)}
          placeholder="Enter password"
        >
          <IonInputPasswordToggle slot="end" />
        </IonInput>
       
        
    

      <br />

     
    </>
          <IonButton onClick={() => doLogin()} expand="full">
              Login
          </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;