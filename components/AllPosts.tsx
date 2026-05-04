// Affiche tous les billets du blog depuis l'API
import Link from "next/link";

// Type pour un billet (adapte si besoin)
type Billet = {
  id: string | number;
  Titre?: string;
  Contenu?: string;
  title?: string;
  body?: string;
  [key: string]: unknown;
};

const API_URL = "https://evanzougs.fr/b2lp/api/billets";

async function fetchBillets(): Promise<Billet[]> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch billets (status ${res.status})`);
  }
  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error(`Unexpected API response (expected array, got ${typeof data})`);
  }
  return data as Billet[];
}

export default async function AllPosts() {
  let billets: Billet[] = [];
  let errorMessage: string | null = null;
  try {
    billets = await fetchBillets();
  } catch (error) {
    errorMessage = (error as Error).message;
  }

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-cyan-600">Tous les billets</h1>
          <p className="mt-2 text-sm text-slate-600 ">
            Données récupérées depuis <code>{API_URL}</code>.
          </p>
        </header>
        {errorMessage ? (
          <div className="rounded-lg border border-pink-200 bg-pink-50 p-4 text-pink-800">
            <p className="font-medium">Impossible de charger les billets</p>
            <p className="mt-1 text-sm">{errorMessage}</p>
          </div>
        ) : billets.length === 0 ? (
          <p className="text-slate-700">Aucun billet trouvé (ou en attente de chargement).</p>
        ) : (
          <ul className="space-y-4">
            {billets.map((billet, index) => {
              const title = (billet.Titre as string) ?? billet.title ?? `Billet ${index + 1}`;
              const body = (billet.Contenu as string) ?? billet.body;
              const id = String(billet.id ?? index + 1);
              return (
                <li key={id} className="rounded-lg border border-purple-200 bg-white p-4 shadow-sm">
                  <h2 className="text-xl font-semibold text-cyan-500">{title}</h2>
                  {body ? <p className="mt-2 text-slate-700">{body}</p> : null}
                  <div className="mt-4">
                    <Link href={`/billets/${id}`} className="inline-flex items-center rounded bg-purple-200 px-3 py-1.5 text-sm font-medium text-cyan-500 hover:bg-purple-300">
                      Voir le billet
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
