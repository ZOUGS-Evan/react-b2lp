"use client";

import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ⛔ empêche le refresh

    // 👉 ici tu mets ton appel API pour créer le compte

    // ✅ redirection après inscription
    router.push("/login"); // ou "/dashboard"
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Inscription</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-purple-300 py-2 rounded"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}