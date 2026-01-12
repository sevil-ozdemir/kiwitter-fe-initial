import { useDispatch, useSelector } from "react-redux";
import { logout } from "../userSlice";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <span className="font-bold">Kiwitter</span>
      {user && user.token ? (
        <div className="flex gap-4 items-center">
          <span>{user.name || user.username}</span>
          <button onClick={handleLogout} className="text-red-500">Çıkış Yap</button>
        </div>
      ) : (
        <span>Misafir</span>
      )}
    </div>
  );
}
