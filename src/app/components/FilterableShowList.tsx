// Komponenta FilterableShowList dohvaća listu serija s TVmaze API-ja i omogućuje
// filtriranje po kriterijima: najbolje ocijenjene ili najnovije serije.
// Prikazuje prvih 20 rezultata, sortiranih prema odabranom kriteriju.

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
  const [shows, setShows] = useState<Show[]>([]);
  const [filter, setFilter] = useState<"rating" | "newest">("rating"); // Trenutno odabrani filter

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
            return new Date(a.premiered || "").getTime() - new Date(b.premiered || "").getTime();
          }
        })
        .slice(0, 20); // Prikaz samo prvih 20 rezultata

      setShows(sorted); // Ažuriraj stanje s filtriranim rezultatima
    }

    fetchShows();
  }, [filter]);

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
        {shows.map((show) => (
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
    </div>
  );
}