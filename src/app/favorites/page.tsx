"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Show = {
  id: number;
  name: string;
  image: { medium: string; original: string } | null;
  rating: { average: number | null };
  genres: string[];
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  // Dohvati ID-eve favorita i njihove podatke
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const idsRes = await fetch("/api/favorites");
        const ids: number[] = await idsRes.json();

        const showData: Show[] = await Promise.all(
          ids.map(async (id) => {
            const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
            return res.ok ? await res.json() : null;
          })
        ).then((arr) => arr.filter(Boolean) as Show[]);

        setFavorites(showData);
        localStorage.setItem("favorites", JSON.stringify(showData.map((s) => s.id)));
      } catch (err) {
        console.error("Failed to load favorites", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (id: number) => {
    const res = await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      const updatedIds: number[] = await res.json();
      setFavorites((prev) => prev.filter((s) => s.id !== id));
      localStorage.setItem("favorites", JSON.stringify(updatedIds));
    } else {
      console.error("Failed to remove favorite");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-400">Loading favorites...</p>;

if (favorites.length === 0) {
  return (
    <div className="relative mt-10 flex flex-col items-center">
      <p className="text-center text-gray-500 z-10 mb-4">No saved shows yet...</p>
      <div className="relative w-[700px] h-[300px]">
        <Image
          src="/slike/stars.png"
          alt="Flying popcorn"
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-amber-300">Your favorites</h1>
      <hr /><br />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((show) => (
          <div
            key={show.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden relative"
          >
            <Link
              key={show.id}
              href={`/show/${show.id}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
            >
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
            <button
              onClick={() => removeFavorite(show.id)}
              className="absolute top-2 right-2 bg-white hover:bg-red-100 text-red-500 w-8 h-8 rounded-full shadow-md flex items-center justify-center text-lg transition"
              title="Remove from favorites"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}