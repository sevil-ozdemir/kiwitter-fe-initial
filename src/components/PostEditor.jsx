import { useState } from "react";
import axios from "../utils/axios.js";

const MAX_LENGTH = 160;

export default function PostEditor({ addPost, className = "" }) {

  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/twits", { content: text })
      .then(resp => {
        addPost(resp.data.twit);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setText("");
      });
  }

  const disabled = text.length === 0;

  return <div className={`flex flex-col container mx-auto bg-white w-[40vw] rounded-xl shadow-xl p-4 gap-6 ${className}`}>
    <form onSubmit={handleSubmit}>
      <textarea className="w-full h-32 border-solid border-[1px] rounded-md p-2" placeholder="Düşüncelerini yaz" value={text} onChange={handleChange} />
      <div className="flex flex-row justify-between items-center">
        <span className="text-sm text-gray-400">{MAX_LENGTH - text.length} karakter kaldı</span>
        <button type="submit" className={`${disabled ? "bg-gray-400" : "bg-primary"} text-white px-2 py-1 rounded-md`}>Gönder</button>
      </div>
    </form>
  </div>
}