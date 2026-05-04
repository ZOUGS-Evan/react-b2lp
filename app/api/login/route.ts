import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch("https://evanzougs.fr/b2lp/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // 🔥 on récupère en texte (évite crash si pas JSON)
    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text }; // 👈 backend renvoie HTML ou autre
    }

    return NextResponse.json(data, { status: res.status });

  } catch (error) {
    console.error("LOGIN PROXY ERROR:", error);

    return NextResponse.json(
      { error: "Erreur proxy login" },
      { status: 500 }
    );
  }
}