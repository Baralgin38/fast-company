import React from 'react';
import Users from './layouts/users';
import Main from './layouts/main';
import Login from './layouts/login';
import NavBar from './components/ui/navBar';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfession';

const App = () => {
  return (
    <>
      <NavBar />
      <ProfessionProvider>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/users/:userId?/:edit?" component={Users} />
        </Switch>
      </ProfessionProvider>
      <ToastContainer />
    </>
  );
};

export default App;
