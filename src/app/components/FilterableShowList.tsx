'use client';

import { useEffect, useState } from "react";

type Show = {
  id: number;
  name: string;
  premiered?: string;
  image?: { medium: string };
  rating: { average: number | null };
};

export default function FilterableShowList() {
  const [shows, setShows] = useState<Show[]>([]);
  const [filter, setFilter] = useState<"rating" | "newest">("rating");

  useEffect(() => {
    async function fetchShows() {
      const res = await fetch("https://api.tvmaze.com/shows");
      const data: Show[] = await res.json();

      const sorted = [...data]
        .filter((show) => show.rating.average !== null || show.premiered)
        .sort((a, b) => {
          if (filter === "rating") {
            return (b.rating.average || 0) - (a.rating.average || 0);
          } else {
            return new Date(b.premiered || "").getTime() - new Date(a.premiered || "").getTime();
          }
        })
        .slice(0, 20);

      setShows(sorted);
    }

    fetchShows();
  }, [filter]);

  return (
    <div>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as "rating" | "newest")}
        className="mb-4 p-2 border rounded bg-black text-white"
      >
        <option value="rating">Najbolje ocijenjene</option>
        <option value="newest">Najnovije</option>
      </select>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-10">
        {shows.map((show) => (
          <li key={show.id} className="border rounded p-2">
            <h2 className="font-semibold">{show.name}</h2>
            {show.image && (
              <img
                src={show.image.medium}
                alt={show.name}
                className="w-full h-auto"
              />
            )}
            {filter === "rating" && <p>Ocjena: {show.rating.average ?? "N/A"}</p>}
            {filter === "newest" && <p>Premijera: {show.premiered ?? "Nepoznato"}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}