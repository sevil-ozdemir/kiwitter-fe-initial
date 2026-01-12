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

  const handleAddPost = (content) => {
    axios.post("/twits", { content }).then((res) => {
      setPosts((prev) => [res.data.twit, ...prev]); // yeni post anında ekleniyor
    });
  };

  const handleDelete = (id) => {
    axios.delete(`/twits/${id}`).then(() => {
      setPosts((prev) => prev.filter((post) => post.id !== id));
    });
  };

  return (
    <div className="container mx-auto w-[40vw] py-8">
      
      <div className="mb-4">
        <textarea id="newPost" className="w-full border p-2 rounded" />
        <button
          onClick={() => {
            const content = document.getElementById("newPost").value;
            handleAddPost(content);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Gönder
        </button>
      </div>

   
      {posts.map((post) => (
        <Post key={post.id} post={post} onDelete={handleDelete} />
      ))}
    </div>
  );
}
