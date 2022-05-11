import React from 'react';
import Users from './layouts/users';
import Main from './layouts/main';
import Login from './layouts/login';
import NavBar from './components/ui/navBar';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/users/:userId?" component={Users} />
      </Switch>
    </>
  );
};

export default App;
