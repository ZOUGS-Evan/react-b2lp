export default function Login() {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Connexion</h2>

      <form className="space-y-4">
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

        <button className="w-full bg-purple-300 py-2 rounded">
          Se connecter
        </button>
      </form>
    </div>
  );
}