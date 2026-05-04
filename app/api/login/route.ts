import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL, API_ENDPOINTS } from "../../../lib/api-config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    // ❌ login refusé backend
    if (!res.ok) {
      return NextResponse.json(
        { message: text || "Email ou mot de passe incorrect" },
        { status: res.status }
      );
    }

    const token = text.trim();

    // ❌ validation token Laravel Sanctum
    if (!token || !token.includes("|")) {
      return NextResponse.json(
        { message: "Token invalide reçu du serveur" },
        { status: 401 }
      );
    }

    // ✅ réponse propre frontend
    return NextResponse.json(
      { auth_token: token },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur login" },
      { status: 500 }
    );
  }
}