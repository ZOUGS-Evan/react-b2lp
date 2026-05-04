"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import Post from "@/components/Post"; // ✅ AJOUT IMPORTANT

type Billet = {
  Date?: string;
  Titre?: string;
  Contenu?: string;
};

const API_URL = "https://evanzougs.fr/b2lp/api/billets";

export default function BilletPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [billet, setBillet] = useState<Billet | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      router.push("/login");
      return;
    }

    fetch(API_URL)
      .then((res) => res.json())
      .then((data: Billet[]) => {
        const index = Number(id) - 1;
        setBillet(data[index] || null);
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) return <p className="p-10">Chargement...</p>;

  if (!billet) return <p className="p-10 text-red-500">❌ Billet introuvable</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-cyan-600 mb-4">
        {billet.Titre}
      </h1>

      <p className="text-xs text-slate-400 mb-6">
        {billet.Date}
      </p>

      <div className="bg-white border rounded-lg p-6 shadow">
        <p className="text-slate-700 whitespace-pre-line">
          {billet.Contenu}
        </p>
      </div>

      {/* 💬 COMMENTAIRES */}
      <Post id={id} />

    </div>
  );
}