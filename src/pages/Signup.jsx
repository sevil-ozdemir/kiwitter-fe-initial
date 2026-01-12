import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../utils/axios";
import { login } from "../userSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", nickname: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/signup", form).then((res) => {
      // signup sonrası otomatik login
      dispatch(login(res.data.token));
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-xl font-bold">Kayıt Ol</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input placeholder="Ad" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Nickname" value={form.nickname} onChange={(e) => setForm({ ...form, nickname: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Şifre" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Kayıt Ol</button>
      </form>
    </div>
  );
}
