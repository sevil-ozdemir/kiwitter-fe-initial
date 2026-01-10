import Post from "./Post.jsx";

export default function Timeline({ posts, isLoading, isSuccess }) {

  if (isLoading) {

    return <span>Yükleniyor...</span>
  }

  if (!isSuccess) {

    return <span>Bir şeyler ters gitti</span>
  }

  const postItems = posts.map(post => <Post key={post.id} post={post} />)

  return <div className="flex flex-col gap-6">
    {postItems}
  </div>;
}