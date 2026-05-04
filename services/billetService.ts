import { API_BASE_URL } from "../lib/api-config";

export class BilletService {

  static async fetchBillets() {
    const res = await fetch(`${API_BASE_URL}/billets`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch billets (status ${res.status})`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error(
        `Unexpected API response (expected array, got ${typeof data})`
      );
    }

    return data;
  }

  static async fetchBilletById(id: number | string) {
    const res = await fetch(`${API_BASE_URL}/billets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch billet (status ${res.status})`);
    }

    return await res.json();
  }

  // 🔥 LOGIN corrigé
  static async login(email: string, password: string) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to login (${res.status}) : ${text}`);
    }

    const data = await res.json();

    // ✅ AJOUT IMPORTANT
    localStorage.setItem("isLoggedIn", "true");

    return data;
  }

  // 🔥 LOGOUT corrigé
  static async logout() {
    const res = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    // même si erreur backend → on logout côté front
    localStorage.removeItem("isLoggedIn");

    if (!res.ok) {
      throw new Error(`Failed to logout (status ${res.status})`);
    }

    return await res.json();
  }

  // 🔥 REGISTER corrigé
  static async register(nom: string, email: string, password: string) {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nom, email, password }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to register (${res.status}) : ${text}`);
    }

    return await res.json();
  }
}