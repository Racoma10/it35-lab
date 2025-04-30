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
import { codeSlashOutline, mailOutline, logoGithub, logoLinkedin } from 'ionicons/icons';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>About Me</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Profile Section */}
        <IonCard>
          <IonCardHeader className="ion-text-center">
            {/* Replace IonIcon with an image */}
            <img 
              src="https://scontent.fcgy1-3.fna.fbcdn.net/v/t1.6435-9/177006875_1513618882302863_3927441903412311625_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEgHZtkM8FM0qFCmtwkQz4F96tGLJqfIaX3q0Ysmp8hpTba2M4uH3j-3D9Fus8LXht3ZE5HgHUliK0R_tOo0KD_&_nc_ohc=712DtOdAsa0Q7kNvgGozLcZ&_nc_oc=AdhWMD6JTMnXtnbf6ONUpixd2PJKGuOjtO2E91YANa9Hpznn3FEDuSKooyRrETITZj8fnpeLHW3xWfZ9kzvdaDne&_nc_zt=23&_nc_ht=scontent.fcgy1-3.fna&_nc_gid=AVJpf_rCknv5ddsQqubvG6R&oh=00_AYGd_sRvBTYJptrqDul-IBo-aiLi6fcwMl5nyG-zg4thng&oe=67FA60DA" 
              alt="Profile" 
              style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #3880ff' }} 
            />
            <IonCardTitle>RACOMA</IonCardTitle>
            <p>Wanna be App Developer</p>
          </IonCardHeader>
          <IonCardContent>
          "Driven by a passion for creating innovative and scalable applications. Constantly exploring cutting-edge technologies and frameworks to stay ahead in the ever-evolving tech landscape. Currently diving deep into the Ionic Framework to sharpen my skills in building cross-platform mobile applications."

.
          </IonCardContent>
        </IonCard>

        {/* Skills Section */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={codeSlashOutline} slot="start" style={{ marginRight: '8px' }} />
              Skills & Technologies
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            ⚡ JavaScript | TypeScript | Python | Java <br />
            ⚡ React | Ionic | Node.js | Express.js <br />
            ⚡ PHP | MySQL | MongoDB <br />
            ⚡ REST APIs | GraphQL <br />
            ⚡ Git | GitHub | Docker
          </IonCardContent>
        </IonCard>

        {/* Projects Section */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={codeSlashOutline} slot="start" style={{ marginRight: '8px' }} />
              Projects
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Here are some of my recent projects:
            <ul>
              <li>
                <strong>Project 1:</strong> <a href="https://github.com/Racoma10/project1" target="_blank" rel="noopener noreferrer">E-Commerce App</a>
              </li>
              <li>
                <strong>Project 2:</strong> <a href="https://github.com/Racoma10/project2" target="_blank" rel="noopener noreferrer">Weather Dashboard</a>
              </li>
              <li>
                <strong>Project 3:</strong> <a href="https://github.com/Racoma10/project3" target="_blank" rel="noopener noreferrer">Task Manager</a>
              </li>
            </ul>
          </IonCardContent>
        </IonCard>

        {/* Contact Section */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={mailOutline} slot="start" style={{ marginRight: '8px' }} />
              Contact Me
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            📧 Email: ruelracoma09@gmail.com <br />
            <IonIcon icon={logoGithub} style={{ marginRight: '8px' }} />
            <a href="https://github.com/Racoma10" target="_blank" rel="noopener noreferrer">GitHub</a> <br />
            <IonIcon icon={logoLinkedin} style={{ marginRight: '8px' }} />
            <a href="https://linkedin.com/in/ruelracoma" target="_blank" rel="noopener noreferrer">LinkedIn</a> <br />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default About;
