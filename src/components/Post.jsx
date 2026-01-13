import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { likeTwit, unlikeTwit, deleteTwit } from '../twitsSlice.js';
import axios from '../utils/axios.js';

import Replies from './Replies.jsx';

export default function Post({ post, isReply = false, className = "" }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const date = dayjs(post.createDate).fromNow();
  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLike = (e) => {

    e.preventDefault();

    axios
      .post(`/twits/${post.id}/like`)
      .then(resp => {

        dispatch(likeTwit({ id: post.id }));
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleUnlike = (e) => {

    e.preventDefault();

    axios
      .delete(`/twits/${post.id}/like`)
      .then(resp => {
        dispatch(unlikeTwit({ id: post.id }));
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleRepliesVisibilityToggle = (e) => {
    e.preventDefault();
    setIsRepliesVisible(!isRepliesVisible);
  }

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  }

  const handleDelete = (e) => {
    e.preventDefault();

    setIsMenuOpen(false);

    if (confirm("Bu twiti silmek istediğinize emin misiniz?")) {
      dispatch(deleteTwit(post.id));
    }
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleProfileClick = (e) => {

    history.push(`/${post.username}`);
  }

  const iconClass = post.likedByUser ? "bi bi-suit-heart-fill cursor-pointer hover:text-primary text-primary" : "bi bi-suit-heart cursor-pointer hover:text-primary text-gray-400";

  return <div>
    <div className={`flex flex-row container mx-auto bg-white w-[40vw] rounded-xl ${isRepliesVisible ? "rounded-b-none" : ""} shadow-xl p-4 gap-6 ${className}`}>
      <div className="flex flex-col justify-start w-24">
        <img onClick={handleProfileClick} src={`https://i.pravatar.cc/150?u=${post.authorId}`} alt={post.name} className="w-full rounded-full aspect-square cursor-pointer" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row justify-between items-center">
          <div className="cursor-pointer" onClick={handleProfileClick}>
            <span className="font-bold text-primary text-sm">{post.name}</span>&nbsp;
            <span className="text-sm text-gray-400 italic">({post.username})</span>
          </div>
          <div className="relative" ref={menuRef}>
            <i
              className="bi bi-three-dots-vertical cursor-pointer hover:text-primary text-gray-400"
              onClick={handleMenuToggle}
            ></i>
            {isMenuOpen && (
              <div className="absolute left-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={handleDelete}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="text-gray-700">
          {post.content}
        </div>
        <div className="text-gray-400 text-sm">{date}</div>
        {!isReply && <div className="flex flex-row gap-2">
          <a href="#" onClick={post.likedByUser ? handleUnlike : handleLike}><i className={iconClass}></i> <span className="text-gray-400">{post.likes}</span> &nbsp;</a>
          <i className="bi bi-arrow-repeat cursor-pointer hover:text-primary text-gray-400"></i> <span className="text-gray-400">{post.retweets}</span> &nbsp;
          <i onClick={handleRepliesVisibilityToggle} className="bi bi-chat cursor-pointer hover:text-primary text-gray-400"></i> <span className="text-gray-400">{post.replies.length}</span>
        </div>}
      </div>
    </div>
    {isRepliesVisible && <Replies parentPost={post} replies={post.replies} />}
  </div>
}