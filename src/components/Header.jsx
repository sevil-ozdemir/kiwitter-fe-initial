import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <span className="font-bold">Kiwitter</span>
      {user ? (
        <div className="flex gap-4 items-center">
          <span>{user.name || user.username}</span>
          <button onClick={logout} className="text-red-500">Çıkış Yap</button>
        </div>
      ) : (
        <span>Misafir</span>
      )}
    </div>
  );
}
