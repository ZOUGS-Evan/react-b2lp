export default function Header() {
  return (
    <header className="bg-purple-200 py-4 px-6 shadow-md text-center">
      <h1 className="text-purple-900 font-semibold text-xl md:text-2xl">
        B2LP - le blog de Lyon Palme
      </h1>
      <a href="/login">Se connecter</a> |{" "}
      <a href="/register">S'inscrire</a>
    </header>
  );
}