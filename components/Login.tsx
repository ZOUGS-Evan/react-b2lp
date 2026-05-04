"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BilletService } from "@/services/billetService";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await BilletService.login(email, password);

      // 🔥 refresh global état auth
      window.location.href = "/";
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">

      <form onSubmit={handleLogin} className="w-full max-w-md p-8 border rounded-xl">

        <h1 className="text-2xl font-bold mb-4">Connexion</h1>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-3 border mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-purple-600 text-white p-3 rounded-xl"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

      </form>

    </div>
  );
}