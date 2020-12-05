import firebase from 'firebase';

const firebaseConfig = require('./firebaseCfg.env.json');

// Initialize Firebase with a "default" Firebase project
const myFirebase = firebase.initializeApp(firebaseConfig);

const myFirestore = myFirebase.firestore();

function firebaseModule() {
  function signIn() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  function signOut() {
    // Sign out of Firebase.
    firebase.auth().signOut();
  }

  function initFirebaseAuth() {
    // Listen to auth state changes.
    //firebase.auth().onAuthStateChanged(authStateObserver);
    firebase.auth().onAuthStateChanged(() => {
      console.log('auth state changed');
    });
  }

  function getUserName() {
    return firebase.auth().currentUser.displayName;
  }

  function isUserSignedIn() {
    return !!firebase.auth().currentUser;
  }

  // Saves a new message to your Cloud Firestore database.
  function saveToFirestore(data) {
    // Add a new message entry to the database.
    return myFirestore
      .collection('library')
      .add(data)
      .then((docRef) => docRef.id)
      .catch(function (error) {
        console.error('Error writing new message to database', error);
      });
  }

  // Loads chat messages history and listens for upcoming ones.
  function loadFromFirestore(messageID) {
    if (messageID) {
      return firebase
        .firestore()
        .collection('library')
        .doc(messageID)
        .get()
        .then(console.log('individual doc retrieval not implemented'));
    } else {
      return firebase
        .firestore()
        .collection('library')
        .get()
        .then((qs) => {
          const uids = [];
          const data = [];
          qs.forEach((qds) => {
            uids.push(qds.id);
            data.push(qds.data());
          });
          return [uids, data];
        });
    }
    // Create the query to load the last 12 messages and listen for new ones.
    //var query = firebase.firestore().collection('library');
    //.orderBy('timestamp', 'desc')
    //.limit(12);

    /*
    // Start listening to the query.
    query.onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === 'removed') {
          deleteMessage(change.doc.id);
        } else {
          var message = change.doc.data();
            displayMessage(
            change.doc.id,
            message.timestamp,
            message.name,
            message.text,
            message.profilePicUrl,
            message.imageUrl
          );
        }
      });
    });
    */
  }

  return {
    signIn,
    signOut,
    initFirebaseAuth,
    getUserName,
    isUserSignedIn,
    saveToFirestore,
    loadFromFirestore,
  };
}

export default firebaseModule;

/* 
function authStateObserver(user) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.style.backgroundImage =
      'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userNameElement.textContent = userName;

    // Show user's profile and sign-out button.
    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');

    // Hide sign-in button.
    signInButtonElement.setAttribute('hidden', 'true');

    // We save the Firebase Messaging Device token and enable notifications.
    saveMessagingDeviceToken();
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');

    // Show sign-in button.
    signInButtonElement.removeAttribute('hidden');
  }
}
*/
