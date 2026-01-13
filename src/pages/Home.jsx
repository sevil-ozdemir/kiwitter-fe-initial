import { useSelector, useDispatch } from "react-redux";
import { selectTwits, addTwit } from "../twitsSlice.js";
import { useState } from "react";
import PageLayout from "../layouts/PageLayout.jsx";
import Post from "../components/Post.jsx";
import PostEditor from "../components/PostEditor.jsx";
import { twits as dummyTwits } from "../utils/devserver.js";

export default function Home() {
  const dispatch = useDispatch();
  const twits = useSelector(selectTwits("normal"));
  const [mode, setMode] = useState("normal");

  const handleAddPost = (content) => {
    const newTwit = {
      id: crypto.randomUUID(),
      authorId: 1000,
      retweets: 0,
      content,
      createDate: Date.now(),
      likes: 0,
      replies: [],
      name: "Sevil Ozdemir",
      username: "sozdemir",
      likedByUser: false,
    };
    dispatch(addTwit(newTwit));
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
    </PageLayout>
  );
}
