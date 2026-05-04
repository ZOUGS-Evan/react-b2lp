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

    const text = await res.text();

    return new NextResponse(text, {
      status: res.status,
    });

  } catch (error) {
    console.error("LOGIN PROXY ERROR:", error);

    return NextResponse.json(
      { message: "Erreur proxy login" },
      { status: 500 }
    );
  }
}