import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axios";

export default function Profile() {
  const { nick } = useParams();
  const [twits, setTwits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/twits?author=${nick}`)
      .then((res) => {
        setTwits(res.data);
      })
      .catch((err) => {
        console.error("Profil twitleri alınamadı:", err);
      })
      .finally(() => setLoading(false));
  }, [nick]);

  if (loading) {
    return <div className="p-4">Yükleniyor...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{nick} kullanıcısının twitleri</h2>
      {twits.length === 0 ? (
        <p>Henüz twit yok.</p>
      ) : (
        <ul className="space-y-4">
          {twits.map((twit) => (
            <li key={twit.id} className="border rounded p-3 bg-white shadow-sm">
              <p className="mb-2">{twit.text}</p>
              <div className="text-sm text-gray-500 flex gap-4">
                <span>{new Date(twit.createdAt).toLocaleString()}</span>
                <span>❤️ {twit.likes?.length || 0}</span>
                <span>💬 {twit.replies?.length || 0}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
