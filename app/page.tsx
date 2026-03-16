// Import de Link depuis Next.js pour créer des liens de navigation internes
import { Header, Footer} from "./layout";
import BilletsPage from "./components/billets";

export default function Page() {
  return(
    <main className="min-h-screen px-4 py-10">
      <Header />
      <div className="mx-auto max-w-4xl">
        <BilletsPage />
      </div>
      <Footer />
    </main>
  );
}