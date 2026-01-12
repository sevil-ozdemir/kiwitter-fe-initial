import axios from "../utils/axios";

export default function Post({ post, onDelete }) {
  const handleDelete = () => {
    axios.delete(`/twits/${post.id}`).then(() => {
      onDelete(post.id); // üst bileşene bildir
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex gap-4 mb-4">
      <img
        src={post.avatarUrl || `https://i.pravatar.cc/150?u=${post.authorId}`}
        alt="profil"
        className="w-12 h-12 rounded-full"
      />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <span className="font-semibold">{post.name}</span>
          <span className="text-sm text-gray-500">{new Date(post.createDate).toLocaleString()}</span>
        </div>
        <span className="text-sm text-gray-500">@{post.username}</span>
        <p>{post.content}</p>
        <div className="flex justify-between items-center text-gray-500 text-sm mt-2">
          <div className="flex gap-4">
            <span>❤️ {post.likes}</span>
            <span>💬 {post.replies}</span>
            <span>🔁 {post.retweets}</span>
          </div>
          <button onClick={handleDelete} className="text-red-500 hover:underline">
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}
