import Post from "./Post.jsx";

export default function Timeline({ posts, isLoading, isSuccess }) {

  if (isLoading) {

    return <span className="text-white">Yükleniyor...</span>
  }

  if (!isSuccess) {

    return <span>Bir şeyler ters gitti</span>
  }

  const postItems = posts
    .map(post => <Post key={post.id} post={post} />)

  return <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-6">
      {postItems.length > 0 ? postItems : <span className="text-white">Bu kullanıcının twitleri yok</span>}
    </div>
  </div>;
}