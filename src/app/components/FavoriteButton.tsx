"use client";

import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

type Props = {
    showId: number;
};

export default function FavoriteButton({ showId }: Props) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // Provjera je li show već u favoritima
        fetch("/api/favorites")
            .then((res) => res.json())
            .then((data) => {
                setIsFavorite(data.includes(showId));
            });
    }, [showId]);

    const toggleFavorite = async () => {
        if (isFavorite) {
            await fetch("/api/favorites", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: showId }),
            });
        } else {
            await fetch("/api/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: showId }),
            });
        }

        setIsFavorite(!isFavorite);
    };

    return (
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