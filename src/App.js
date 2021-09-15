<<<<<<< HEAD
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AuthRoute from "./HOC/AuthRoute";
import MainLayout from "./HOC/MainLayout";
import PrivateRoute from "./HOC/PrivateRoute";
import Home from "./View/Home";
import PageNotFound from "./View/PageNotFound";
import SignIn from "./View/SignIn";
import Profile from "./View/Profile";
import "./App.css";
import AdminLayout from "./HOC/AdminLayout";
import Dashboard from "./View/Admin/Dashboard";
import Films from "./View/Admin/Films";
import Showtime from "./View/Admin/Showtime";
=======
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  Router,
} from 'react-router-dom';
import AuthRoute from './HOC/AuthRoute';
import MainLayout from './HOC/MainLayout';
import PrivateRoute from './HOC/PrivateRoute';
import Home from './View/Home';
import PageNotFound from './View/PageNotFound';
import SignIn from './View/SignIn';
import SignUp from './View/SignUp';
import Profile from './View/Profile';
import './App.css';
import AdminLayout from './HOC/AdminLayout';
import Dashboard from './View/Admin/Dashboard';
import Films from './View/Admin/Films';
import NewFilm from './View/Admin/NewFilm';
import Showtime from './View/Admin/Showtime';
import EditFilm from './View/Admin/EditFilm';
import UserLayout from './HOC/UserLayout';
>>>>>>> 83331e89a9919a72923db1724ea6613b8dd33c78

function App() {
  return (
    <BrowserRouter>
      <Switch>
<<<<<<< HEAD
        {/* <MainLayout> */}
          <Route path="/" exact>
            {/* <Redirect to='/home' />  */}
          </Route>
          <AuthRoute path="/signin" exact component={SignIn} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <Route path="/home" exact component={Home} />
        {/* </MainLayout> */}
        <AdminLayout
          path="/admin/home"
          exact
          component={Dashboard}
        ></AdminLayout>
        <AdminLayout path="/admin/films" exact component={Films}></AdminLayout>
        <AdminLayout
          path="/admin/showtime"
          exact
          component={Showtime}
        ></AdminLayout>

=======
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>
        <Route path='/admin/:path?/:path?/:path?' exact>
          <AdminLayout>
            <Route path='/admin' exact component={Dashboard} />
            <Route path='/admin/films' exact component={Films} />
            <Route path='/admin/films/addnew' exact component={NewFilm} />
            <Route path='/admin/films/edit/:id' exact component={EditFilm} />
            <Route path='/admin/showtime' exact component={Showtime} />
          </AdminLayout>
        </Route>
        {/* <Route>
          <MainLayout>
            <Route path='/home' exact component={Home} />
          </MainLayout>
        </Route> */}
        <Route>
          <UserLayout>
            <AuthRoute path='/signin' exact component={SignIn} />
            <Route path='/signup' exact component={SignUp} />
            <PrivateRoute path='/profile' exact component={Profile} />
          </UserLayout>
        </Route>
>>>>>>> 83331e89a9919a72923db1724ea6613b8dd33c78
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
