"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BilletService } from "../services/billetService";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await BilletService.register(name, mail, password);
      router.push("/login");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">

      {/* CARD SIMPLE */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-purple-100 space-y-4"
      >

        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">
          Créer un compte
        </h2>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-lg">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Nom"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? "Création..." : "Créer un compte"}
        </button>

      </form>
    </div>
  );
}