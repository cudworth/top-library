import React from 'react';
import './Header.css';

function Header(props) {
  return (
    <div className="Header">
      <h1>Reading List</h1>
      <h2>Built with React for The Odin Project</h2>
      <h3>{props.auth() ? props.user() : ''}</h3>
      <input
        type="button"
        className="button"
        value={props.auth() ? 'Sign Out' : 'Sign In'}
        onClick={() => (props.auth() ? props.signOut() : props.signIn())}
      ></input>
    </div>
  );
}

export default Header;
