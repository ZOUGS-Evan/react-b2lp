"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BilletService } from "@/services/billetService";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("auth_token");
      setIsLoggedIn(!!token);
    };

    checkLogin();

    // 🔥 écoute les changements (multi-tab)
    window.addEventListener("storage", checkLogin);

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    BilletService.logout(); // 🔥 supprime le token
    setIsLoggedIn(false);

    // 🔥 reload propre
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-purple-100 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">

        {/* LOGO */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 tracking-tight">
            B2LP
          </h1>

          <span className="text-sm md:text-base text-gray-500 font-medium">
            Blog Lyon Palme
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">

          {isLoggedIn ? (
            <>
              <div className="hidden sm:flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Connecté
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-200"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="px-4 py-2 rounded-xl border border-purple-300 text-purple-700 font-medium hover:bg-purple-50 hover:scale-105 transition-all duration-200"
              >
                Connexion
              </a>

              <a
                href="/register"
                className="px-4 py-2 rounded-xl bg-purple-600 text-white font-medium shadow-md hover:bg-purple-700 hover:scale-105 transition-all duration-200"
              >
                Inscription
              </a>
            </>
          )}

        </div>
      </div>
    </header>
  );
}