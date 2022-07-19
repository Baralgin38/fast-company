import React from 'react';
import Users from './layouts/users';
import Main from './layouts/main';
import Login from './layouts/login';
import NavBar from './components/ui/navBar';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logOut';
import AppLoader from './components/ui/hoc/appLoader';

const App = () => {
  return (
    <>
      <AppLoader>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
        </Switch>
      </AppLoader>
      <ToastContainer />
    </>
  );
};

export default App;
