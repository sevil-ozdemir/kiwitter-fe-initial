import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../userSlice";
import { clearAuthToken } from "../utils/auth";

export default function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    clearAuthToken();
    history.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Sol: Logo */}
        <Link to="/" className="text-green-600 font-bold text-xl">
          kiwitter
        </Link>

        {/* Sağ: Butonlar */}
        <div className="flex gap-4 items-center">
          {!user?.token ? (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">
                Giriş Yap
              </Link>
              <Link to="/signup" className="text-green-600 hover:underline">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Çıkış Yap
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
