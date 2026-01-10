import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadTwits, addTwit, selectTwits } from '../twitsSlice.js';
import { selectUser } from '../userSlice.js';
import { toast } from 'react-toastify';

import PageLayout from "../layouts/PageLayout.jsx";
import Timeline from "../components/Timeline.jsx";
import PostEditor from "../components/PostEditor.jsx";

import axios from "../utils/axios.js";

export default function Home() {

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  const posts = useSelector(selectTwits);
  const user = useSelector(selectUser);

  const isLoggedIn = !!user;

  useEffect(() => {

    setIsLoading(true);

    axios.get("/twits")
      .then(response => {

        dispatch(loadTwits(response.data.twits));

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

  const addPost = (post) => {

    dispatch(addTwit(post));
  }

  return <PageLayout className="">
    {isLoggedIn && <PostEditor addPost={addPost} />}
    <Timeline posts={posts} isLoading={isLoading} isSuccess={isSuccess} />
  </PageLayout>;
}