import React, { useState, useEffect } from 'react';
import './reset.css';
import './App.css';
import Header from './Header/Header';
import InputForm from './InputForm/InputForm';
import Card from './Card/Card';
import firebaseModule from './firebaseModule';
import _ from 'lodash';

//const savedLibrary = JSON.parse(localStorage.getItem('library'));

const myFirebase = firebaseModule();

function App() {
  const bookTemplate = {
    title: '',
    author: '',
    pages: '',
    read: 'read',
  };

  const [data, setData] = useState(bookTemplate);
  const [library, setLibrary] = useState([]);

  //Initialize app with latest copy of library ID's from Firestore
  useEffect(() => {
    getLibrary();
  }, []);

  //TODO: REVISE USESTATE

  //const [library, setLibrary] = useState(_.cloneDeep(savedLibrary) || []);

  /*
  useEffect(() => {
    //localStorage.setItem('library', JSON.stringify(library));
  }, [library]);
  */

  function getLibrary() {
    myFirebase.loadFromFirestore().then(
      ([uids, data]) => {
        //setLibrary(() => ids);
        console.log(uids);
        console.log(data);
      },
      (reject) => {
        console.log('error occured loading ids from firebase');
      }
    );
  }

  function handleChange(e) {
    e.persist(); //Makes persistent event, otherwise synthetic event will be destroyed prior to asynchronous setData method completion
    setData((prevData) => {
      const newData = _.cloneDeep(prevData);
      newData[e.target.name] = e.target.value;
      return newData;
    });
  }

  function createBook() {
    /*
    Promise.resolve(myFirebase.saveToFirestore(data)).then(
      (id) => {
        setLibrary((library) => [...library, data]);
      },
      (fail) => {
        console.log('fail');
      }
    );
    */
    //myFirebase.loadFromFirestore();
    setData(bookTemplate);
  }

  function destroyBook(book) {
    const index = library.indexOf(book);
    setLibrary((prevLibrary) => {
      const newLibrary = _.cloneDeep(prevLibrary);
      newLibrary.splice(index, 1);
      return newLibrary;
    });
  }

  function toggleRead(book) {
    const index = library.indexOf(book);
    setLibrary((prevLibrary) => {
      const newLibrary = _.cloneDeep(prevLibrary);
      newLibrary[index].read =
        newLibrary[index].read === 'unread' ? 'read' : 'unread';
      return newLibrary;
    });
  }

  return (
    <div className="App">
      <Header />

      <InputForm
        data={data}
        handleChange={handleChange}
        onSubmit={createBook}
      />
      <div className="card-cabinet">
        {library.map((book, index) => {
          return (
            <Card
              key={index}
              book={book}
              destroyBook={destroyBook}
              toggleRead={toggleRead}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
