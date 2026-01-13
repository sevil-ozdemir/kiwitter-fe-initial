import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { getAuthToken } from "./utils/auth.js";
import { setToken } from "./utils/axios.js";
import { useDispatch } from 'react-redux';
import { login } from './userSlice.js';

import PageLayout from "./layouts/PageLayout.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";

import './utils/devserver.js';
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {

    setIsLoading(true);

    const token = getAuthToken();
    console.log(token);
    if (token) {
      dispatch(login(token));
      setToken(token);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="text-center text-2xl font-bold text-white">Yükleniyor...</div>;
  }

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
          <Route path="/:username">
            <Profile />
          </Route>
        </Switch>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;