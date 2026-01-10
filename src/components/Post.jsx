import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default function Post({ post }) {

  const date = dayjs(post.createDate).fromNow();

  return <div className="flex flex-row container mx-auto bg-white w-[40vw] rounded-xl shadow-xl p-4 gap-6">
    <div className="flex flex-col justify-start w-24">
      <img src={`https://i.pravatar.cc/150?u=${post.authorId}`} alt={post.name} className="w-full rounded-full aspect-square" />
    </div>
    <div className="flex flex-col gap-2">
      <div>
        <span className="font-bold text-primary text-sm">{post.name}</span>&nbsp;
        <span className="text-sm text-gray-400 italic">({post.username})</span>
      </div>
      <div className="text-gray-700">
        {post.content}
      </div>
      <div className="text-gray-400 text-sm">{date}</div>
      <div className="flex flex-row gap-2">
        <i className="bi bi-suit-heart cursor-pointer hover:text-primary text-gray-400"></i> <span className="text-gray-400">{post.likes}</span> &nbsp;
        <i className="bi bi-arrow-repeat cursor-pointer hover:text-primary text-gray-400"></i> <span className="text-gray-400">{post.retweets}</span> &nbsp;
        <i className="bi bi-chat cursor-pointer hover:text-primary text-gray-400"></i> <span className="text-gray-400">{post.replies}</span> &nbsp;
      </div>
    </div>
  </div>
}