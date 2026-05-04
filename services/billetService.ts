import { API_BASE_URL, API_ENDPOINTS } from "../lib/api-config";

export class BilletService {

  static async login(email: string, password: string) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login incorrect");
    }

    localStorage.setItem("auth_token", data.auth_token);

    return data.auth_token;
  }

  static async register(name: string, email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.register}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Erreur inscription");
    }

    return data;
  }

  static logout() {
    localStorage.removeItem("auth_token");
  }

  static getToken() {
    return localStorage.getItem("auth_token");
  }

  static async fetchBillets() {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.billets}`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Erreur billets");
    }

    return data;
  }

  static async fetchBilletById(id: string | number) {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.billet(id)}`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Erreur billet");
    }

    return data;
  }
}