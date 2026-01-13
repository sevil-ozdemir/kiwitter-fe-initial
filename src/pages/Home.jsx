import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadTwits, addTwit, selectTwits } from '../twitsSlice.js';
import { selectUser } from '../userSlice.js';
import { toast } from 'react-toastify';

import PageLayout from "../layouts/PageLayout.jsx";
import Timeline from "../components/Timeline.jsx";
import PostEditor from "../components/PostEditor.jsx";
import TimelineSelector from "../components/TimelineSelector.jsx";

import axios from "../utils/axios.js";

export default function Home() {

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timelineMode, setTimelineMode] = useState("normal"); // normal, most_liked
  const dispatch = useDispatch();

  const posts = useSelector(selectTwits(timelineMode));
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

  const handleAddPost = (post) => {

    dispatch(addTwit(post));
  }

  const handleTimelineModeChange = (mode) => {
    setTimelineMode(mode);
  }

  return <PageLayout className="">
    {isLoggedIn && <PostEditor addPost={handleAddPost} />}
    <TimelineSelector mode={timelineMode} setMode={handleTimelineModeChange} />
    <Timeline posts={posts} isLoading={isLoading} isSuccess={isSuccess} />
  </PageLayout>;
}