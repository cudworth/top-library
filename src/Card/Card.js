import React from 'react';
import './Card.css';

function Card(props) {
  const { title, author, pages, read } = props.book;
  const readValue = read === 'read' ? 'Mark Unread' : 'Mark Read';

  return (
    <div className="Card">
      <div>Title: {title}</div>
      <div>Author: {author}</div>
      <div>Pages: {pages}</div>
      <div>{read === 'read' ? 'Read' : 'Unread'}</div>
      <div className="Card-buttons">
        <input
          className="button"
          type="button"
          value={readValue}
          onClick={() => props.toggleRead(props.book)}
        ></input>
        <input
          className="button"
          type="button"
          value="Delete"
          onClick={() => props.destroyBook(props.book)}
        ></input>
      </div>
    </div>
  );
}

export default Card;
