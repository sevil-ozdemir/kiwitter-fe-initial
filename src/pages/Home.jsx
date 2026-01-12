import { useState } from "react";
import Timeline from "./Timeline";
import axios from "../utils/axios";

export default function Home() {
  const [posts, setPosts] = useState([]);

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
      {/* ✅ Tek gönderim kutusu burada */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Düşüncelerini yaz</label>
        <textarea id="newPost" className="w-full border p-2 rounded" maxLength={160} />
        <button
          onClick={() => {
            const content = document.getElementById("newPost").value;
            handleAddPost(content);
            document.getElementById("newPost").value = "";
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Gönder
        </button>
      </div>

      {/* Post listesi */}
      <Timeline posts={posts} onDelete={handleDelete} />
    </div>
  );
}
