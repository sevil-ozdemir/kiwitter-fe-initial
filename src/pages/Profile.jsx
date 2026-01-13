import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectTwitsByUsername } from '../twitsSlice.js';
import { selectUser } from '../userSlice.js';
import { loadTwits } from '../twitsSlice.js';
import { toast } from 'react-toastify';

import PageLayout from "../layouts/PageLayout.jsx";
import Timeline from "../components/Timeline.jsx";

import axios from "../utils/axios.js";

export default function Profile() {

  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const isCurrentUser = user?.nickname === username;

  useEffect(() => {

    axios
      .get(`/users/${isCurrentUser ? "me" : username}`)
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error(error);
      });

  }, [username]);

  useEffect(() => {

    setIsLoading(true);

    axios.get("/twits")
      .then(response => {

        dispatch(loadTwits(response.data.twits));

        setIsSuccess(true);
      })
      .catch(error => {
        console.error(error);

        toast.error("Bir hata oluştu");

        setIsSuccess(false);
      })
      .finally(() => {

        setIsLoading(false);
      });

  }, []);

  const twits = useSelector(selectTwitsByUsername(username));

  if (!userInfo) {
    return <div className="text-center text-2xl font-bold text-white">Yükleniyor...</div>;
  }

  return <PageLayout className="">
    <div className="flex flex-col container mx-auto w-[60vw] p-4 gap-6 items-center">
      <img src={`https://i.pravatar.cc/1200?u=${userInfo.id}`} alt={userInfo.name} className="w-48 rounded-full aspect-square cursor-pointer" />
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white pb-0">{userInfo.name}</h1>
        <span className="text-sm text-gray-100 italic">({userInfo.username})</span>
      </div>
      <Timeline posts={twits} isLoading={isLoading} isSuccess={isSuccess} />
    </div>
  </PageLayout>;
}