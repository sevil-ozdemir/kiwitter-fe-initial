import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../utils/axios";
import { login } from "../userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/login", { nickname }).then((res) => {
      // token ve kullanıcı bilgisi Redux’a yazılır
      dispatch(login(res.data.token));
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-xl font-bold">Giriş Yap</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Kullanıcı adı"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Giriş
        </button>
      </form>
    </div>
  );
}
