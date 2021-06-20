import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

import {CredentialsContext} from '../App';
import Todos from "../components/Todo";

function Welcome() {
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const logout = () => {
    setCredentials(null);
  }

  return (
    <div id="main-div">
      <div id="title-txt">
        <h1>Welcome {credentials && credentials.username}</h1>
      </div>
      {credentials && <button onClick={logout} id="logoutBtn">Logout</button>}
      {!credentials && <Link to='/register' className="button">Register</Link>}
      <br />
      {!credentials && <Link to='/login' className="button">Login</Link>}
      {credentials && <Todos />}
    </div>
  )
}

export default Welcome
