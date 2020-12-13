import firebase from 'firebase';

const firebaseConfig = require('./firebaseCfg.env.json');

// Initialize Firebase with a "default" Firebase project
const myFirebase = firebase.initializeApp(firebaseConfig);

const myFirestore = myFirebase.firestore();

function firebaseModule() {
  function signIn() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }

  function signOut() {
    // Sign out of Firebase.
    return firebase.auth().signOut();
  }

  function initFirebaseAuth(cb) {
    // Listen to auth state changes.
    return firebase.auth().onAuthStateChanged(cb);
  }

  function getUserName() {
    return firebase.auth().currentUser.displayName;
  }

  function isUserSignedIn() {
    return !!firebase.auth().currentUser;
  }

  function create(collection, document) {
    // Add a new message entry to the database.
    return myFirestore
      .collection(collection)
      .add(document)
      .then((docRef) => {
        return docRef.id;
      })
      .catch((error) => {
        console.error('Error writing data to database', error);
      });
  }

  function read(collection, uid) {
    if (uid) {
      return firebase
        .firestore()
        .collection(collection)
        .doc(uid)
        .get()
        .then(console.log('individual doc retrieval not implemented'));
    } else {
      return firebase
        .firestore()
        .collection(collection)
        .get()
        .then((qs) => {
          const obj = {};
          qs.forEach((qds) => {
            obj[qds.id] = qds.data();
          });
          return obj;
        });
    }
  }

  function update(collection, uid, data) {
    return firebase
      .firestore()
      .collection(collection)
      .doc(uid)
      .set(data)
      .catch((error) => console.error(error));
  }

  function destroy(collection, uid) {
    return firebase
      .firestore()
      .collection(collection)
      .doc(uid)
      .delete()
      .catch((error) => {
        console.error(error);
      });
  }

  return {
    signIn,
    signOut,
    initFirebaseAuth,
    getUserName,
    isUserSignedIn,
    create,
    read,
    update,
    destroy,
  };
}

export default firebaseModule;

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
