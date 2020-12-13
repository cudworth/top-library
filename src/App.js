import React, { useState, useEffect } from 'react';
import './reset.css';
import './App.css';
import Header from './Header/Header';
import InputForm from './InputForm/InputForm';
import Card from './Card/Card';
import firebaseModule from './firebaseModule';
import _ from 'lodash';

const myFirebase = firebaseModule();

function App() {
  const bookTemplate = {
    title: '',
    author: '',
    pages: '',
    read: 'read',
  };

  const [book, setBook] = useState(bookTemplate);

  const [library, setLibrary] = useState({});

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    Promise.resolve(myFirebase.initFirebaseAuth(getAuth)).then(() => getAuth());
  }, []);

  function getLibrary() {
    myFirebase.read('library').then(
      (data) => {
        setLibrary(() => data);
      },
      (reject) => {
        console.log('error occured loading ids from firebase');
      }
    );
  }

  function handleChange(e) {
    e.persist(); //Makes persistent event, otherwise synthetic event will be destroyed prior to asynchronous setBook method completion
    setBook((prevData) => {
      const newData = _.cloneDeep(prevData);
      newData[e.target.name] = e.target.value;
      return newData;
    });
  }

  function createBook() {
    myFirebase
      .create('library', book)
      .then((uid) => {
        setLibrary((prev) => {
          const next = _.cloneDeep(prev);
          next[uid] = book;
          return next;
        });
      })
      .then(() => setBook(bookTemplate));
  }

  function destroyBook() {
    setLibrary((prev) => {
      const next = _.cloneDeep(prev);
      delete next[this];
      myFirebase.destroy('library', this);
      return next;
    });
  }

  function toggleRead() {
    setLibrary((prev) => {
      const next = _.cloneDeep(prev);
      next[this].read = 'read' === next[this].read ? 'unread' : 'read';
      myFirebase.update('library', this, next[this]);
      return next;
    });
  }

  function getAuth() {
    setAuth(() => myFirebase.isUserSignedIn());
  }

  function handleSignIn() {
    myFirebase.signIn().then(() => {
      getLibrary();
    });
  }

  function handleSignOut() {
    myFirebase.signOut().then(() => {
      console.log(library);
      //setLibrary(() => {});
    });
  }

  if (!auth) {
    return (
      <div className="App">
        <Header
          auth={myFirebase.isUserSignedIn}
          signIn={handleSignIn}
          signOut={handleSignOut}
          user={myFirebase.getUserName}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header
          auth={myFirebase.isUserSignedIn}
          signIn={handleSignIn}
          signOut={handleSignOut}
          user={myFirebase.getUserName}
        />

        <InputForm
          data={book}
          handleChange={handleChange}
          onSubmit={createBook}
        />
        <div className="card-cabinet">
          {Object.keys(library).map((key) => {
            return (
              <Card
                key={key}
                book={library[key]}
                destroyBook={destroyBook.bind(key)}
                toggleRead={toggleRead.bind(key)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
