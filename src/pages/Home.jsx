import { useState, useEffect } from "react";

import PageLayout from "../layouts/PageLayout.jsx";
import Timeline from "../components/Timeline.jsx";
import PostEditor from "../components/PostEditor.jsx";
import useAuth from "../hooks/useAuth.jsx";

import axios from "../utils/axios.js";

export default function Home() {

  const [posts, setPosts] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { isLoggedIn } = useAuth();

  useEffect(() => {

    setIsLoading(true);

    axios.get("/twits")
      .then(response => {

        setPosts(response.data.twits);

        setIsSuccess(true);
      })
      .catch(error => {
        console.error(error);

        toast.error("Bir hata oluştu");

        setIsSuccess(false);
      })
      .finally(() => {

        setIsLoading(false);
      });

  }, []);

  return <PageLayout className="">
    {isLoggedIn && <PostEditor />}
    <Timeline posts={posts} isLoading={isLoading} isSuccess={isSuccess} />
  </PageLayout>;
}