import { API_BASE_URL } from "../lib/api-config";

export class BilletService {
  static async fetchBillets() {
    const res = await fetch(API_BASE_URL, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch billets (status ${res.status})`);
    }
    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error(`Unexpected API response (expected array, got ${typeof data})`);
    }
    return data;
  }

  static async fetchBilletById(id: number | string) {
    const res = await fetch(`${API_BASE_URL}/${id}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch billet (status ${res.status})`);
    }
    return await res.json();
  }

  static async login(email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      throw new Error(`Failed to login (status ${res.status})`);
    }
    return await res.json();
  }

  static async logout() {
    const res = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
    });
    if (!res.ok) {
      throw new Error(`Failed to logout (status ${res.status})`);
    }
    return await res.json();
  }

  static async register(nom: string, email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nom, email, password }),
    });
    if (!res.ok) {
      throw new Error(`Failed to register (status ${res.status})`);
    }
    return await res.json();
  }
}