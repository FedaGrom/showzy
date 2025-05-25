// Komponenta FilterableShowList dohvaća listu serija s TVmaze API-ja i omogućuje
// filtriranje po kriterijima: najbolje ocijenjene ili najnovije serije.
// Prikazuje prvih 20 rezultata, a korisnik može klikom na gumb učitati još serija.

// "use client" označava da se ova komponenta renderira na klijentskoj strani,
// jer koristi React hookove poput useState i useEffect.
'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Show = {
  id: number;
  name: string;
  premiered?: string;
  image?: { medium: string };
  rating: { average: number | null };
};

export default function FilterableShowList() {
  const [allShows, setAllShows] = useState<Show[]>([]); // Sve dohvaćene serije
  const [filter, setFilter] = useState<"rating" | "newest">("rating"); // Trenutno odabrani filter
  const [visibleCount, setVisibleCount] = useState(20); // Koliko serija trenutno prikazati

  // useEffect se poziva kad se promijeni vrijednost filtera (ovisnost u [filter])
  useEffect(() => {
    async function fetchShows() {
      // Dohvati sve serije s TVmaze API-ja
      const res = await fetch("https://api.tvmaze.com/shows");
      const data: Show[] = await res.json();

      // Filtriranje i sortiranje rezultata prema kriteriju filtera
      const sorted = [...data]
        .filter((show) => show.rating.average !== null || show.premiered) // Ukloni one bez ocjene i bez datuma premijere
        .sort((a, b) => {
          // Sortiraj po prosječnoj ocjeni (najviša prva)
          if (filter === "rating") {
            return (b.rating.average || 0) - (a.rating.average || 0);
          } else {
            // Sortiraj po datumu premijere (najnovija prva)
            return new Date(b.premiered || "").getTime() - new Date(a.premiered || "").getTime();
          }
        });

      setAllShows(sorted); // Spremi sve sortirane serije
      setVisibleCount(20); // Resetiraj broj prikazanih serija na 20 pri promjeni filtera
    }

    fetchShows();
  }, [filter]);

  // Izreži listu da prikazuje samo prvih 'visibleCount' serija
  const visibleShows = allShows.slice(0, visibleCount);

  return (
    <div>
      {/* Dropdown za biranje filtera (ocjena ili datum premijere) */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as "rating" | "newest")}
        className="mb-4 p-2 border rounded bg-black text-white"
      >
        <option value="rating">Best rating</option>
        <option value="newest">Newest</option>
      </select>

      {/* Prikaz serija u gridu */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-10">
        {visibleShows.map((show) => (
          <Link
            key={show.id}
            href={`/show/${show.id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
          >
            {/* Slika serije ili placeholder ako slika ne postoji */}
            <div className="relative w-full h-[295px]">
              <Image
                src={show.image?.medium || "/slike/placeholder.png"}
                alt={show.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="p-2">
              <h3 className="text-lg font-semibold text-black">{show.name}</h3>
              <p className="text-sm text-gray-600">
                Rating: {show.rating.average ?? "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </ul>

      {/* Gumb za učitavanje više showova – prikazuje se samo ako ima još za učitati */}
      {visibleCount < allShows.length && allShows.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 20)}
            className="px-6 py-2 bg-amber-400 text-black font-semibold rounded hover:bg-amber-500 transition"
          >
            Show more
          </button>
        </div>
      )}

    </div>
  );
}