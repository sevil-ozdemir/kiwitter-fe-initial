import { useState, useEffect } from "react";
import axios from "../utils/axios";
import Timeline from "../components/Timeline";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/twits").then((res) => {
      setPosts(res.data.twits);
    });
  }, []);

  const handleAddPost = (content) => {
    axios.post("/twits", { content }).then((res) => {
      setPosts((prev) => [res.data.twit, ...prev]);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`/twits/${id}`).then(() => {
      setPosts((prev) => prev.filter((post) => post.id !== id));
    });
  };

  return (
    <div className="container mx-auto w-[40vw] py-8">
      <div className="mb-6">
        <label className="block font-semibold mb-1">Düşüncelerini yaz</label>
        <textarea id="newPost" className="w-full border p-2 rounded" maxLength={160} placeholder="160 karakter kaldı" />
        <button
          onClick={() => {
            const content = document.getElementById("newPost").value;
            if (content.trim()) {
              handleAddPost(content);
              document.getElementById("newPost").value = "";
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Gönder
        </button>
      </div>

      <Timeline posts={posts} onDelete={handleDelete} />
    </div>
  );
}
