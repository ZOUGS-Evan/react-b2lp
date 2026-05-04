import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL, API_ENDPOINTS } from "../../../lib/api-config";

function extractToken(data: any): string | null {
  if (!data) return null;

  // cas 1: string brute Laravel
  if (typeof data === "string") return data;

  // cas 2: auth_token
  if (data.auth_token) return data.auth_token;

  // cas 3: object weird
  if (typeof data === "object") {
    return data.token || data.access_token || null;
  }

  return null;
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

    const text = await res.text();

    let data: any;

    try {
      data = JSON.parse(text);
    } catch {
      data = text; // Laravel renvoie parfois string brute
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            data?.message ||
            (data?.errors &&
              Object.values(data.errors).flat()[0]) ||
            "Erreur de connexion",
        },
        { status: res.status }
      );
    }

    const token = extractToken(data);

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Token invalide reçu du serveur",
          debug: data, // utile pour debug
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      auth_token: token.trim(),
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur login",
      },
      { status: 500 }
    );
  }
}