import React from 'react';
import Users from './layouts/users';
import Main from './layouts/main';
import Login from './layouts/login';
import NavBar from './components/ui/navBar';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfessionProvider } from './hooks/useProfession';
import { QualityProvider } from './hooks/useQualities';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';

const App = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <QualityProvider>
          <ProfessionProvider>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/login/:type?" component={Login} />
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
            </Switch>
          </ProfessionProvider>
        </QualityProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
