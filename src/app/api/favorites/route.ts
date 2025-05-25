import { NextRequest, NextResponse } from "next/server";

// Lokalna varijabla koja se koristi kao memorija za id-eve serija koje su favorit
let favorites: number[] = [];

export async function GET() {
   // Vraća trenutni popis favorita kao JSON
  return NextResponse.json(favorites);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id } = body;

  if (!id || favorites.includes(id)) {
    // Provjera: mora postojati id i id ne smije već biti u favoritima
    return new NextResponse("Invalid or duplicate ID", { status: 400 });
  }

  // Dodaj ID u favorites array
  favorites.push(id);
  return NextResponse.json({ message: "Added to favorites", favorites });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;

  // Filtriraj sve favorite osim onog koji treba ukloniti
  favorites = favorites.filter((favId) => favId !== id);
  return NextResponse.json({ message: "Removed from favorites", favorites });
}

// NAPOMENA: Ova logika NE FUNKCIONIRA TRAJNO jer koristi memoriju servera!!!
// Za daljnu nadogradnju mogao bi se koristiti firebase ili sličan alat za
// trajnu pohranu.