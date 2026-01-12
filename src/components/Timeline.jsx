import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Post from "./Post";

export default function Timeline() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/twits").then((res) => {
      setPosts(res.data.twits);
    });
  }, []);

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div className="container mx-auto w-[40vw] py-8">
      {posts.map((post) => (
        <Post key={post.id} post={post} onDelete={handleDelete} />
      ))}
    </div>
  );
}
