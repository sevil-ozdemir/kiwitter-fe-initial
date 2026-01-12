import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
      <span className="font-bold text-xl">Kiwitter</span>
      <div className="flex gap-4 items-center">
        {!user || !user.token ? (
          <>
            <Link to="/login" className="text-blue-500 hover:underline">
              Giriş
            </Link>
            <Link to="/signup" className="text-green-500 hover:underline">
              Signup
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="text-red-500 hover:underline">
            Çıkış
          </button>
        )}
      </div>
    </div>
  );
}
