import React, { useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Welcome from './pages/Welcome';

export const CredentialsContext = React.createContext();

function App() {
  const credentialsState = useState(null);
  return (
    <div className="App">
      <Router>
        <CredentialsContext.Provider value={credentialsState}>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </CredentialsContext.Provider>
      </Router>
    </div>
  );
}

export default App;
