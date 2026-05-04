import { API_BASE_URL, API_ENDPOINTS } from "../lib/api-config";

/**
 * 🔥 Mapping des erreurs Laravel → français propre
 */
const ERROR_MAP: Record<string, string> = {
  "The provided credentials are erroneous.": "Email ou mot de passe incorrect",
  "The password field must be at least 8 characters.": "Mot de passe trop court (8 caractères minimum)",
  "The email field is required.": "Email requis",
  "The password field is required.": "Mot de passe requis",
};

/**
 * 🔥 Nettoyage global des erreurs Laravel
 */
function cleanError(data: any): string {
  if (!data) return "Erreur inconnue";

  // message simple
  if (typeof data.message === "string") {
    return ERROR_MAP[data.message] || data.message;
  }

  // erreurs validation Laravel
  if (data.errors) {
    const first = Object.values(data.errors)[0];

    if (Array.isArray(first)) {
      return ERROR_MAP[first[0]] || first[0];
    }
  }

  return "Erreur inconnue";
}

export class BilletService {

  // 🔐 LOGIN CLEAN FINAL
static async login(email: string, password: string) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message);
    }

    localStorage.setItem("auth_token", data.auth_token);

    return data.auth_token;
  }

  // 🔐 REGISTER CLEAN
  static async register(name: string, email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.register}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(cleanError(data));
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
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.billets}`, {
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
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.billet(id)}`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });

    if (!res.ok) {
      throw new Error("Erreur billet");
    }

    return res.json();
  }
}