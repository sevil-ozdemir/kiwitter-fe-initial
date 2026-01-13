import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTwits, addTwit, selectTwits } from "../twitsSlice.js";
import { selectUser } from "../userSlice.js";
import { toast } from "react-toastify";

import axios from "../utils/axios.js";
import Timeline from "../components/Timeline.jsx";
import PageLayout from "../layouts/PageLayout.jsx";
import PostEditor from "../components/PostEditor.jsx";
import TimelineSelector from "../components/TimelineSelector.jsx";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timelineMode, setTimelineMode] = useState("normal"); // normal, most_liked

  const dispatch = useDispatch();
  const posts = useSelector(selectTwits(timelineMode));
  const user = useSelector(selectUser);

  const isLoggedIn = !!user?.token; // kullanıcı login kontrolü

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("/twits")
      .then((res) => {
        dispatch(loadTwits(res.data.twits));
        setIsSuccess(true);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Twitler yüklenirken hata oluştu");
        setIsSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleAddPost = (content) => {
    axios
      .post("/twits", { content })
      .then((res) => {
        dispatch(addTwit(res.data.twit));
      })
      .catch(() => toast.error("Twit eklenemedi"));
  };

  const handleTimelineModeChange = (mode) => {
    setTimelineMode(mode);
  };

  return (
    <PageLayout className="container mx-auto w-[40vw] py-8">
      {isLoggedIn && <PostEditor addPost={handleAddPost} />}
      <TimelineSelector mode={timelineMode} setMode={handleTimelineModeChange} />
      <Timeline posts={posts} isLoading={isLoading} isSuccess={isSuccess} />
    </PageLayout>
  );
}
