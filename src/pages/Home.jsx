import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTwits, addTwit, selectTwits } from "../twitsSlice.js";
import { selectUser } from "../userSlice.js";
import { toast } from "react-toastify";

import axios from "../utils/axios.js";
import Timeline from "../components/Timeline.jsx";
import PageLayout from "../layouts/PageLayout.jsx";
import PostEditor from "../components/PostEditor.jsx";
<<<<<<< HEAD
import TimelineSelector from "../components/TimelineSelector.jsx";
=======
import { twits as dummyTwits } from "../utils/devserver.js";
>>>>>>> d1b68f2348bae2dee9c499cc1237e0c5277ae503

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

  // Redux + dummy twitleri birleştir
  let combinedTwits = [...dummyTwits, ...twits];

  if (mode === "normal") {
    combinedTwits = combinedTwits.sort((a, b) => b.createDate - a.createDate);
    const myTwits = combinedTwits.filter((t) => t.username === "sozdemir");
    const otherTwits = combinedTwits.filter((t) => t.username !== "sozdemir");
    combinedTwits = [...myTwits, ...otherTwits];
  }

  if (mode === "most-liked") {
    combinedTwits = combinedTwits.sort((a, b) => b.likes - a.likes);
  }

  return (
<<<<<<< HEAD
    <PageLayout className="container mx-auto w-[40vw] py-8">
      {isLoggedIn && <PostEditor addPost={handleAddPost} />}
      <TimelineSelector mode={timelineMode} setMode={handleTimelineModeChange} />
      <Timeline posts={posts} isLoading={isLoading} isSuccess={isSuccess} />
=======
    <PageLayout>
      <div className="flex flex-col items-center gap-6 py-6">
        <PostEditor addPost={handleAddPost} />
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded ${
              mode === "normal" ? "bg-lime-700 text-white" : "bg-gray-200"
            }`}
            onClick={() => setMode("normal")}
          >
            Normal
          </button>
          <button
            className={`px-4 py-2 rounded ${
              mode === "most-liked" ? "bg-lime-700 text-white" : "bg-gray-200"
            }`}
            onClick={() => setMode("most-liked")}
          >
            En Beğenilenler
          </button>
        </div>
        {combinedTwits.map((twit) => (
          <Post key={twit.id} post={twit} />
        ))}
      </div>
>>>>>>> d1b68f2348bae2dee9c499cc1237e0c5277ae503
    </PageLayout>
  );
}
