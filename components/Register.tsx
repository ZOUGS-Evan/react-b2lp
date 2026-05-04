"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BilletService } from "@/services/billetService";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await BilletService.register(name, email, password);

      router.push("/login");

    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 border rounded-xl">

        <h1 className="text-2xl mb-4">Inscription</h1>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Nom"
          className="w-full p-3 border mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-3 border mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-purple-600 text-white p-3 rounded-xl">
          Créer un compte
        </button>

      </form>

    </div>
  );
}