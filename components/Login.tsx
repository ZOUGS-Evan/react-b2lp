"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BilletService } from "@/services/billetService";


export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await BilletService.login(email, password); 

      localStorage.setItem("auth_token", email);

      router.push("/");
      router.refresh();

    } catch (err) {
      alert("Erreur login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">

      {/* CARD SIMPLE */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-purple-100">

        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          B2LP
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </form>

      </div>
    </div>
  );
}