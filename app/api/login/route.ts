import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL, API_ENDPOINTS } from "../../../lib/api-config";

/**
 * 🔥 Traduction erreurs Laravel → FR
 */
function translateError(message: string): string {
  const map: Record<string, string> = {
    "The provided credentials are erroneous.": "Email ou mot de passe incorrect",
    "The password field must be at least 8 characters.": "Mot de passe trop court (8 caractères minimum)",
    "The email field is required.": "Email requis",
    "The password field is required.": "Mot de passe requis",
  };

  return map[message] || "Erreur de connexion";
}

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

    const data = await res.json().catch(() => null);

    // ❌ ERREUR BACKEND
    if (!res.ok) {
      const rawMessage =
        data?.message ||
        (data?.errors &&
          Object.values(data.errors).flat()[0]) ||
        "Erreur inconnue";

      return NextResponse.json(
        {
          success: false,
          message: translateError(rawMessage),
        },
        { status: res.status }
      );
    }

    const token = data?.auth_token || data?.trim?.() || data;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Token invalide",
        },
        { status: 401 }
      );
    }

    // ✅ SUCCESS CLEAN
    return NextResponse.json({
      success: true,
      auth_token: token,
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur",
      },
      { status: 500 }
    );
  }
}