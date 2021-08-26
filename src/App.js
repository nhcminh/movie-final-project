import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AuthRoute from './HOC/AuthRoute';
import MainLayout from './HOC/MainLayout';
import PrivateRoute from './HOC/PrivateRoute';
import Home from './View/Home';
import PageNotFound from './View/PageNotFound';
import SignIn from './View/SignIn';
import Profile from './View/Profile';
import './App.css';
import AdminLayout from './HOC/AdminLayout';
import Dashboard from './View/Admin/Dashboard';
import Films from './View/Admin/Films';
import Showtime from './View/Admin/Showtime';
function App() {
  return (
    <BrowserRouter>
      {/* <MainLayout> */}
        <Switch>
          <Route path='/' exact>
            {/* <Redirect to='/home' /> */}
          </Route>
          <AuthRoute path='/signin' exact component={SignIn} />
          <PrivateRoute path='/profile' exact component={Profile} />
          <Route path='/home' exact component={Home} />

          <AdminLayout path="/adminhome" exact component={Dashboard}></AdminLayout>
          <AdminLayout path="/adminfilms" exact component={Films}></AdminLayout>
          <AdminLayout path="/adminshowtime" exact component={Showtime}></AdminLayout>

          <Route component={PageNotFound} />
        </Switch>
      {/* </MainLayout> */}
    </BrowserRouter>
  );
}

export default App;
