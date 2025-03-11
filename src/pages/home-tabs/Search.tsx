import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonSearchbar, 
  IonTitle, 
  IonToolbar,
  IonText,
} from '@ionic/react';

const Search: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="search-page-content">
        {/* Searchbar with custom styling */}
        <div className="searchbar-container">
          <IonSearchbar 
            color="primary" 
            placeholder="Search here!"
            debounce={0} // Optional: reduce delay for input
            style={{
              width: '80%',
              marginBottom: '30px',
              borderRadius: '10px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>

        {/* Placeholder for search results */}
        <div className="results-container">
          <IonText>
            <h2 style={{ textAlign: 'center', color: '#777' }}>
              Enter a search term to see results.
            </h2>
          </IonText>
          {/* Add search results below this */}
        </div>

        {/* Styling the container */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60%',
            color: '#555',
          }}
        >
          <IonText>
            <h3>Search for anything...</h3>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Search;
