import { Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import PageLayout from "./layouts/PageLayout.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";

import './utils/devserver.js';
import "./App.css";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/" exact>
          {/* /?variant=most_liked */}
          <Home />
        </Route>
        <Route path="/profile/:nick">
          <PageLayout>Profile page</PageLayout>
        </Route>
        <Route path="/detail/:twitId">
          <PageLayout>Twit detail</PageLayout>
        </Route>
      </Switch>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;