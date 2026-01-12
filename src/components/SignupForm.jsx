import { useContext, useState } from "react";
import axios from "../utils/axios";
import { AuthContext } from "../contexts/AuthContext";

export default function SignupForm() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", nickname: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/signup", form).then((res) => {
      login(res.data); // signup sonrası otomatik login
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input placeholder="Ad" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Nickname" value={form.nickname} onChange={(e) => setForm({ ...form, nickname: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Şifre" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Kayıt Ol</button>
    </form>
  );
}
