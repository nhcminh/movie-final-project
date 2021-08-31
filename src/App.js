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
import NewFilm from "./View/Admin/NewFilm";
import Showtime from "./View/Admin/Showtime";
import EditFilm from "./View/Admin/EditFilm";

function App() {
  return (
    <BrowserRouter>
      <Switch>
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
        <Route>
          <MainLayout>
            <AuthRoute path='/signin' exact component={SignIn} />
            <PrivateRoute path='/profile' exact component={Profile} />
            <Route path='/home' exact component={Home} />
          </MainLayout>
        </Route>
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
