import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AuthRoute from './HOC/AuthRoute';
import MainLayout from './HOC/MainLayout';
import PrivateRoute from './HOC/PrivateRoute';
import Home from './View/Home';
import PageNotFound from './View/PageNotFound';
import SignIn from './View/SignIn';
import Profile from './View/Profile';
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <AuthRoute path='/signin' exact component={SignIn} />
          <PrivateRoute path='/profile' exact component={Profile} />
          <Route path='/home' exact component={Home} />
          <Route component={PageNotFound} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
