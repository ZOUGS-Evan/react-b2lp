import { API_BASE_URL } from "../lib/api-config";

export class BilletService {

  // 🔑 LOGIN (token texte)
  static async login(email: string, password: string) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();

    if (!res.ok) {
      throw new Error(text || "Erreur login");
    }

    const token = text.trim();

    if (!token) {
      throw new Error("Token invalide");
    }

    localStorage.setItem("auth_token", token);

    return token;
  }

  // 📝 REGISTER
  static async register(name: string, email: string, password: string) {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }

    if (!res.ok) {
      throw new Error(data.message || "Erreur inscription");
    }

    return data;
  }

  // 🔐 TOKEN
  static getToken() {
    return localStorage.getItem("auth_token");
  }

  // 🚪 LOGOUT
  static logout() {
    localStorage.removeItem("auth_token");
  }

  // 📄 FETCH BILLETS
  static async fetchBillets() {
    const token = this.getToken();

    const res = await fetch(`${API_BASE_URL}/billets`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Erreur billets");
    }

    return await res.json();
  }

  // 📄 FETCH BILLET
  static async fetchBilletById(id: number | string) {
    const token = this.getToken();

    const res = await fetch(`${API_BASE_URL}/billets/${id}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Erreur billet");
    }

    return await res.json();
  }
}