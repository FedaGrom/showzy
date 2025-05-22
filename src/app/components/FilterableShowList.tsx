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
        <option value="rating">Best rating</option>
        <option value="newest">Newest</option>
      </select>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-10">
        {shows.map((show) => (
          <Link
            key={show.id}
            href={`/show/${show.id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <div className="relative w-full h-[295px]">
              <Image
                src={show.image?.medium || "/placeholder.png"}
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