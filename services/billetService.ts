const ERROR_MAP: Record<string, string> = {
  "The provided credentials are erroneous.": "Email ou mot de passe incorrect",
  "The password field must be at least 8 characters.": "Mot de passe trop court (8 caractères minimum)",
  "The email field is required.": "Email requis",
  "The password field is required.": "Mot de passe requis",
};

function formatError(data: any): string {
  if (!data) return "Erreur inconnue";

  const message =
    data.message ||
    (data.errors && Object.values(data.errors).flat()[0]);

  return ERROR_MAP[message] || message || "Erreur inconnue";
}

export class BilletService {

  // 🔐 LOGIN PROPRE FINAL
  static async login(email: string, password: string) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    let data: any = null;

    try {
      data = await res.json();
    } catch {
      throw new Error("Erreur serveur");
    }

    // ❌ ERREUR LOGIN
    if (!res.ok) {
      throw new Error(formatError(data));
    }

    // ❌ TOKEN CHECK
    if (!data?.auth_token) {
      throw new Error("Token invalide reçu du serveur");
    }

    // ✅ SAVE TOKEN
    localStorage.setItem("auth_token", data.auth_token);

    return data.auth_token;
  }

  // 🔐 REGISTER
  static async register(name: string, email: string, password: string) {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(formatError(data));
    }

    return data;
  }

  // 🔐 LOGOUT
  static logout() {
    localStorage.removeItem("auth_token");
  }

  // 🔐 TOKEN
  static getToken() {
    return localStorage.getItem("auth_token");
  }

  // 📄 BILLETS
  static async fetchBillets() {
    const res = await fetch("https://evanzougs.fr/b2lp/api/billets", {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });

    if (!res.ok) {
      throw new Error("Erreur récupération billets");
    }

    return res.json();
  }

  // 📄 BILLET BY ID
  static async fetchBilletById(id: string | number) {
    const res = await fetch(
      `https://evanzougs.fr/b2lp/api/billets/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Erreur billet");
    }

    return res.json();
  }
}