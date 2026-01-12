import { useContext, useState } from "react";
import axios from "../utils/axios";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [nickname, setNickname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/login", { nickname }).then((res) => {
      login(res.data);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Kullanıcı adı"
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Giriş Yap
      </button>
    </form>
  );
}
