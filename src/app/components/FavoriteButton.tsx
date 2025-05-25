// "use client" označava da se ova komponenta renderira na klijentskoj strani,
// jer koristi React hookove poput useState i useEffect.
"use client";

import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

type Props = {
    showId: number;
};

export default function FavoriteButton({ showId }: Props) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // Provjera je li serija već u favoritima
        fetch("/api/favorites")
            .then((res) => res.json())
            .then((data) => {
                // Provjeri je li ID serije među favoritima i postavi stanje
                setIsFavorite(data.includes(showId));
            });
    }, [showId]);

    // Funkcija koja se poziva kada korisnik klikne na gumb
    const toggleFavorite = async () => {
        if (isFavorite) {
            // Ako je već favorit, pošalji DELETE zahtjev da se ukloni
            await fetch("/api/favorites", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: showId }),
            });
        } else {
            // Ako nije favorit, pošalji POST zahtjev da se doda
            await fetch("/api/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: showId }),
            });
        }

        // Ažuriraj stanje lokalno da se odmah promijeni izgled ikone zvijezde
        setIsFavorite(!isFavorite);
    };

    return (
        // Botun koji prikazuje punu ili praznu zvjezdicu ovisno o statusu favorita
        <button
            onClick={toggleFavorite}
            className="text-3xl focus:outline-none"
            aria-label="Toggle Favorite"
        >
            {isFavorite ? (
                <FaStar className="text-yellow-400 transition-colors duration-200" />
            ) : (
                <FaRegStar className="text-gray-400 hover:text-yellow-400 transition-colors duration-200" />
            )}
        </button>
    );
}