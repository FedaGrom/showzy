// Ovo je komponenta koja se koristi kako bi se korisnik vratio na prethodnu stranicu.

// "use client" označava da se ova komponenta renderira na klijentskoj strani,
// jer koristi React hookove poput useState i useEffect.
"use client";

import { FaArrowLeft } from "react-icons/fa";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="text-sm bg-zinc-800 px-3 py-2 rounded hover:bg-zinc-700 flex items-center gap-2 text-white"
    >
      <FaArrowLeft />
      <span className="hidden sm:inline">Back</span>
    </button>
  );
}