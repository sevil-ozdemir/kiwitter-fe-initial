import { useDispatch } from 'react-redux';
import { replyToTwit } from '../twitsSlice.js';
import Post from './Post.jsx';
import PostEditor from './PostEditor.jsx';

export default function Replies({ parentPost, replies }) {

  const dispatch = useDispatch();

  const addPost = (post) => {

    dispatch(replyToTwit({ replyTo: parentPost.id, reply: post }));
  }

  return <div className="flex flex-col container mx-auto bg-white w-[40vw] rounded-xl shadow-xl p-4 gap-2 rounded-t-none bg-gray-100">
    <PostEditor addPost={addPost} className="w-full" />
    {replies.map(reply => <Post key={reply.id} post={reply} isReply={true} className="w-full" />)}
  </div>
}