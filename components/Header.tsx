"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");
  }, []);

 const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");

  // 🔄 recharge + redirection propre
    window.location.href = "/";
};

  return (
    <header className="bg-purple-200 py-4 px-6 shadow-md text-center">
      <h1 className="text-purple-900 font-semibold text-xl md:text-2xl">
        B2LP - le blog de Lyon Palme
      </h1>

      {isLoggedIn ? (
        <>
          <span className="mr-2">✅ Connecté</span>
          <button onClick={handleLogout} className="underline">
            Se déconnecter
          </button>
        </>
      ) : (
        <>
          <a href="/login">Se connecter</a> |{" "}
          <a href="/register">S'inscrire</a>
        </>
      )}
    </header>
  );
}