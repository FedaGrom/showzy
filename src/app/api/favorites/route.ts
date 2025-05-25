import { NextRequest, NextResponse } from "next/server";

let favorites: number[] = [];

export async function GET() {
  return NextResponse.json(favorites);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id } = body;

  if (!id || favorites.includes(id)) {
    return new NextResponse("Invalid or duplicate ID", { status: 400 });
  }

  favorites.push(id);
  return NextResponse.json({ message: "Added to favorites", favorites });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;

  favorites = favorites.filter((favId) => favId !== id);
  return NextResponse.json({ message: "Removed from favorites", favorites });
}