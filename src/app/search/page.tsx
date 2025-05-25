// Komponenta SearchPage omogućuje korisniku pretraživanje serija prema nazivu.
// Koristi debouncing kako bi se smanjio broj API poziva tijekom tipkanja.

// "use client" označava da se ova komponenta renderira na klijentskoj strani,
// jer koristi React hookove poput useState i useEffect.
"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
// Debouncing korisničkog unosa – koristimo lodash.debounce, popularnu biblioteku za kontrolu učestalosti poziva funkcija
import debounce from "lodash/debounce";
import Image from "next/image";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Funkcija koja dohvaća podatke s TVmaze API-ja na temelju unesenog pojma
    const searchShows = async (searchTerm: string) => {
        if (!searchTerm.trim()) {
            setResults([]);
            return;
        }
        setIsSearching(true);
        const res = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
        const data = await res.json();
        setResults(data);
        setIsSearching(false);
    };

    // Debounce funkcija odgađa poziv searchShows dok korisnik ne prestane tipkati (500ms).
    // Koristi se useMemo kako bi se izbjeglo ponovno stvaranje debounce funkcije pri svakom renderu.
    const debouncedSearch = useMemo(
        () =>
            debounce((val: string) => {
                searchShows(val);
            }, 500),
        []
    );

    // useEffect pokreće debouncedSearch svaki put kad se promijeni unos korisnika.
    // Povratna funkcija čisti prethodni debounce poziv.
    useEffect(() => {
        debouncedSearch(query);
        return debouncedSearch.cancel;
    }, [query]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Search TV Shows</h1>

            {/* Input polje koje bilježi unos korisnika za pretraživanje */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none"
                placeholder="Start typing to search..."
            />

            {/* Poruka za vrijeme dok se rezultati učitavaju */}
            {isSearching && <p className="text-gray-500 mt-2">Searching...</p>}

            {/* Prikaz rezultata pretraživanja u gridu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {results.map((item: any) => (
                    <Link
                        key={item.show.id}
                        href={`/show/${item.show.id}`}
                        className="block bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
                    >
                        <div className="relative w-full h-[295px]">
                            <Image
                                src={item.show.image?.medium || "/slike/placeholder.png"}
                                alt={item.show.name}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                        <div className="p-2">
                            <h3 className="text-lg font-semibold text-black">{item.show.name}</h3>
                            <p className="text-sm text-gray-600">
                                Genres: {item.show.genres?.join(", ") || "Unknown"}
                            </p>
                        </div>
                    </Link>

                ))}
            </div>

            {/* Ako nije pronađen nijedan rezultat */}
            {!isSearching && query.length > 0 && results.length === 0 && (
                <p className="text-gray-500 mt-4">No results found.</p>
            )}

            {/* Ako korisnik još nije počeo tipkat, odnosno input je prazan - stranica prikazuje sliku kokica kao placeholder */}
            {!isSearching && query.length === 0 && results.length === 0 && (
                <div className="relative w-full h-64">
                    <Image
                        src="/slike/flying_popcorn.jpg"
                        alt="Flying popcorn"
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            )}
        </div>
    );
}