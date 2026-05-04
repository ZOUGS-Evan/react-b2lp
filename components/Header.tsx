"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BilletService } from "@/services/billetService";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const checkAuth = () => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuth();

    window.addEventListener("storage", checkAuth);
    window.addEventListener("focus", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("focus", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    BilletService.logout();
    setIsLoggedIn(false);

    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-purple-100 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">

        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold text-purple-700">
            B2LP
          </h1>
          <span className="text-sm text-gray-500">
            Blog Lyon Palme
          </span>
        </div>

        <div className="flex items-center gap-3">

          {isLoggedIn ? (
            <>
              <div className="text-green-600 text-sm font-medium">
                Connecté
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-xl"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="px-4 py-2 border rounded-xl">
                Connexion
              </a>

              <a href="/register" className="px-4 py-2 bg-purple-600 text-white rounded-xl">
                Inscription
              </a>
            </>
          )}

        </div>
      </div>
    </header>
  );
}