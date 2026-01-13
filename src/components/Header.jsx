import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from '../userSlice.js';

export default function Header() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = !!user;

  let links;

  const handleLogout = () => {
    dispatch(logout());
  }

  if (isLoggedIn) {
    links = <>
      <a href="#" onClick={handleLogout}>Çıkış Yap</a>
    </>;
  } else {
    links = <>
      <Link to="/login">Giriş Yap</Link>
      <Link to="/signup">Kayıt Ol</Link>
    </>;
  }

  return <header className="container mx-auto p-6 text-primary flex flex-row justify-between items-center">
    <Link to="/"><h1 className="text-2xl font-bold">kiwitter</h1></Link>
    <nav className="font-bold text-sm flex flex-row gap-4">
      {links}
    </nav>
  </header>
}