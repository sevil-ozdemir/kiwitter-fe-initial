import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "../utils/axios";
import { login } from "../userSlice";
import { setAuthToken } from "../utils/auth";

export default function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post("/signup", formData);
      const { token, user } = res.data;

      // Token kaydet
      setAuthToken(token);
      dispatch(login({ 
        token, 
        username: user.nickname, 
        name: user.name, 
        id: user.id, 
        role: "user" 
      }));

      history.push("/"); // ana sayfaya yönlendir
    } catch (err) {
      console.error("Signup error:", err);
      setError("Kayıt başarısız. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Kayıt Ol</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Ad Soyad</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Kullanıcı Adı (nickname)</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">E-posta</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Şifre</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}
