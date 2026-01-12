import Post from "./Post";

export default function Timeline({ posts, onDelete }) {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} onDelete={onDelete} />
      ))}
    </div>
  );
}
