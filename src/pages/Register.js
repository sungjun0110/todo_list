import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router';
import { CredentialsContext } from '../App';
import { handleErrors } from './Login';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const register = async (e) => {
    e.preventDefault();
    await fetch("https://sc-todo-backend.herokuapp.com/register", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      }, 
      body:JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username,
          password,
        })
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const history = useHistory();

  return (
    <div id='main-div'>
      <div id="title-txt">
        <h1>Register</h1>
      </div>
      {!!error && (<span style={{ color: 'red' }}>{error}</span>)}
      <form onSubmit={register}>
        <input 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="username" />
        <br />
        <input 
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password" />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
