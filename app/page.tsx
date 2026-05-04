// Import de Link depuis Next.js pour créer des liens de navigation internes
import { Footer} from "./layout";
import Header from "@/components/Header";
import AllPosts from "@/components/AllPosts";


export default function Page() {
  return(
    <main className="min-h-screen px-4 py-10">
      <Header />
      <div className="mx-auto max-w-4xl">
        <AllPosts />
      </div>
      <Footer />
    </main>
  );
}