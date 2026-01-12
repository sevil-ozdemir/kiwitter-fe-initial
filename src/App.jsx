import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getAuthToken } from "./utils/auth";
import { setToken } from "./utils/axios";
import { useDispatch } from "react-redux";
import { login } from "./userSlice";

import Header from "./components/Header";
import PageLayout from "./layouts/PageLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import TwitDetail from "./pages/TwitDetail";
import Profile from "./pages/Profile";

import "./utils/devserver";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const token = getAuthToken();
    if (token) {
      dispatch(login({ token }));
      setToken(token);
    }
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return <div className="text-center text-2xl font-bold">Yükleniyor...</div>;
  }

  return (
    <div>
      <Header />
      <div className="pt-20 max-w-3xl mx-auto px-4">
        <Switch>
          <Route path="/login">
            <PageLayout><Login /></PageLayout>
          </Route>
          <Route path="/signup">
            <PageLayout><Signup /></PageLayout>
          </Route>
          <Route path="/" exact>
            <PageLayout><Home /></PageLayout>
          </Route>
          <Route path="/detail/:twitId">
            <PageLayout><TwitDetail /></PageLayout>
          </Route>
          <Route path="/profile/:nick">
            <PageLayout><Profile /></PageLayout>
          </Route>
        </Switch>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
