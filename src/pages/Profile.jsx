import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectTwitsByUsername, loadTwits } from "../twitsSlice.js";
import { selectUser } from "../userSlice.js";
import { toast } from "react-toastify";

import PageLayout from "../layouts/PageLayout.jsx";
import Timeline from "../components/Timeline.jsx";
import axios from "../utils/axios.js";

export default function Profile() {
  const { nick } = useParams(); // senin yapında nick vardı, onu koruduk
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const isCurrentUser = user?.username === nick || user?.nickname === nick;

  // Kullanıcı bilgisi yükleme
  useEffect(() => {
    axios
      .get(`/users/${isCurrentUser ? "me" : nick}`)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.error("Kullanıcı bilgisi alınamadı:", err);
      });
  }, [nick, isCurrentUser]);

  // Twitleri yükleme
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/twits")
      .then((res) => {
        dispatch(loadTwits(res.data.twits));
        setIsSuccess(true);
      })
      .catch((err) => {
        console.error("Twitler alınamadı:", err);
        toast.error("Twitler yüklenirken hata oluştu");
        setIsSuccess(false);
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const twits = useSelector(selectTwitsByUsername(nick));

  if (!userInfo) {
    return (
      <div className="text-center text-2xl font-bold text-gray-700">
        Yükleniyor...
      </div>
    );
  }

  return (
    <PageLayout className="">
      <div className="flex flex-col container mx-auto w-[60vw] p-4 gap-6 items-center">
        <img
          src={`https://i.pravatar.cc/1200?u=${userInfo.id}`}
          alt={userInfo.name}
          className="w-48 rounded-full aspect-square cursor-pointer"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 pb-0">
            {userInfo.name}
          </h1>
          <span className="text-sm text-gray-500 italic">
            ({userInfo.username || nick})
          </span>
        </div>
        <Timeline posts={twits} isLoading={isLoading} isSuccess={isSuccess} />
      </div>
    </PageLayout>
  );
}
