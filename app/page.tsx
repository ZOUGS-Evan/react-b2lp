// Import de Link depuis Next.js pour créer des liens de navigation internes
import Link from "next/link";

// Définition du type TypeScript pour un billet
// Utilise un objet flexible avec des champs optionnels pour s'adapter à la structure de l'API
type Billet = {
  id: string | number; // Identifiant du billet (peut être string ou number)
  title?: string; // Titre optionnel (pour compatibilité avec d'autres APIs)
  body?: string; // Corps optionnel (pour compatibilité avec d'autres APIs)
  [key: string]: unknown; // Permet d'autres propriétés dynamiques (comme Titre, Contenu, Date)
};

// URL de l'API pour récupérer les billets
// Note : pas de slash final pour éviter une redirection 301
const API_URL = "https://evanzougs.fr/b2lp/api/billets/";

// Fonction asynchrone pour récupérer les billets depuis l'API
// Utilise fetch avec cache désactivé pour toujours obtenir les données fraîches
async function fetchBillets(): Promise<Billet[]> {
  // Effectue la requête HTTP vers l'API
  const res = await fetch(API_URL, { cache: "no-store" });

  // Vérifie si la réponse est OK (status 200-299)
  if (!res.ok) {
    // Lance une erreur si la requête échoue
    throw new Error(`Failed to fetch billets (status ${res.status})`);
  }

  // Parse le JSON de la réponse
  const data = await res.json();

  // Vérifie que la réponse est bien un tableau (structure attendue)
  if (!Array.isArray(data)) {
    // Lance une erreur si ce n'est pas un tableau
    throw new Error(`Unexpected API response (expected array, got ${typeof data})`);
  }

  // Retourne les données typées comme Billet[]
  return data as Billet[];
}

// Composant principal de la page (export par défaut pour Next.js App Router)
// Fonction asynchrone car elle utilise await pour fetchBillets
export default async function BilletsPage() {
  // Variables pour stocker les données et les erreurs
  let billets: Billet[] = []; // Tableau des billets récupérés
  let errorMessage: string | null = null; // Message d'erreur si la récupération échoue

  // Bloc try-catch pour gérer les erreurs de récupération
  try {
    // Appelle la fonction pour récupérer les billets
    billets = await fetchBillets();
  } catch (error) {
    // En cas d'erreur, stocke le message d'erreur
    errorMessage = (error as Error).message;
  }

  
  // Retourne le JSX de la page
  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-4xl">

        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-cyan-600">
            Liste des billets
          </h1>

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

          <p className="text-slate-700">
            Aucun billet trouvé (ou en attente de chargement).
          </p>

        ) : (

          <ul className="space-y-4">

            {billets.map((billet, index) => {

              const title = (billet.Titre as string) ?? billet.title ?? `Billet ${index + 1}`;
              const body = (billet.Contenu as string) ?? billet.body;
              const id = String(billet.id ?? index + 1);

              return (
                <li
                  key={id}
                  className="rounded-lg border border-purple-200 bg-white p-4 shadow-sm"
                >

                  <h2 className="text-xl font-semibold text-cyan-500">
                    {title}
                  </h2>

                  {body ? (
                    <p className="mt-2 text-slate-700">{body}</p>
                  ) : null}

                  <div className="mt-4">
                    <Link
                      href={`/billets/${id}`}
                      className="inline-flex items-center rounded bg-purple-200 px-3 py-1.5 text-sm font-medium text-cyan-500 hover:bg-purple-300"
                    >
                      Voir le billet
                    </Link>
                  </div>

                </li>
              );
            })}

          </ul>

        )}

      </div>
    </main>
  );
}
