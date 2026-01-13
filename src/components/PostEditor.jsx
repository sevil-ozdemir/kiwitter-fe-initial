import { useState } from "react";

export default function PostEditor({ addPost }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "") return;
    addPost(content.trim());
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md w-[40vw]"
    >
      <label className="block text-gray-700 font-semibold mb-2">
        Düşüncelerini yaz
      </label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={160}
        rows={3}
        className="w-full border border-gray-300 rounded-md p-2 resize-none"
        placeholder="160 karaktere kadar..."
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">
          {160 - content.length} karakter kaldı
        </span>
        <button
          type="submit"
          className="bg-lime-700 text-white px-4 py-2 rounded font-bold"
        >
          Gönder
        </button>
      </div>
    </form>
  );
}
