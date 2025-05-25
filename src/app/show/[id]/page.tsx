// Ovo je stranica za prikaz serija sa određenim id-om.
// Serija se prikazuje u tri dijela:
// - sa lijeve strane - poster serije i osnovne informacije (ocjena, žanr...)
// - sa desne strane - popis epizoda s linkovima na te epizode
// - ispod svega - popis glumaca s linkovima na te glumce

import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";
import FavoriteButton from "@/app/components/FavoriteButton";
import Image from "next/image";

type Show = {
    id: number;
    name: string;
    genres: string[];
    rating: { average: number | null };
    image: { medium: string; original: string } | null;
    summary: string;
    status: string;
};

type CastMember = {
    person: {
        id: number;
        name: string;
        image: { medium: string; original: string } | null;
    };
    character: {
        id: number;
        name: string;
    };
};

type Episode = {
    id: number;
    name: string;
    season: number;
    number: number;
    airdate: string;
};

export default async function ShowDetails({ params }: { params: { id: string } }) {
    const res = await fetch(`https://api.tvmaze.com/shows/${params.id}`);
    if (!res.ok) return notFound();
    const show: Show = await res.json();

    const castRes = await fetch(`https://api.tvmaze.com/shows/${params.id}/cast`);
    const cast: CastMember[] = await castRes.json();

    const episodesRes = await fetch(`https://api.tvmaze.com/shows/${params.id}/episodes`);
    const episodes: Episode[] = await episodesRes.json();

    return (
        <div className="max-w-7xl mx-auto p-6">
            <BackButton />

            <br />
            <h1 className="text-4xl font-bold mb-8 text-center">{show.name}</h1>
            <FavoriteButton showId={show.id} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* LEFT: poster serije i osnovne informacije (ocjena, žanr...) */}
                <div>
                    {show.image && (
                        <Image
                            src={show.image.original}
                            alt={show.name}
                            width={800}
                            height={450}
                            sizes="(max-width: 768px) 100vw, 800px"
                            className="rounded-lg shadow-md w-full object-cover mb-4"
                        />
                    )}

                    <p className="text-gray-500 mb-2">Status: {show.status}</p>
                    <p className="mb-2">Rating: {show.rating.average ?? "N/A"}</p>
                    <p className="mb-2">Genres: {show.genres.join(", ")}</p>

                    <div
                        className="prose prose-invert max-w-none mt-4"
                        dangerouslySetInnerHTML={{ __html: show.summary }}
                    />
                </div>

                {/* RIGHT: popis epizoda s linkovima na te epizode */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
                    <ul className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                        {episodes.map((ep) => (
                            <li key={ep.id} className="border-b pb-2">
                                <Link href={`/episode/${ep.id}`} className="hover:underline text-lime-600">
                                    <strong>Season {ep.season}, Ep {ep.number}:</strong> {ep.name}
                                </Link>
                                <span className="text-gray-500 text-sm ml-2">({ep.airdate})</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* CAST CAROUSEL - popis glumaca s linkovima na te glumce */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Cast</h2>
            <div className="overflow-x-auto">
                <div className="flex gap-6">
                    {cast.map((member) => (
                        <Link
                            key={`${member.person.id}-${member.character.id}`}
                            href={`/cast/${member.person.id}`}
                            className="min-w-[150px] text-center hover:bg-zinc-900 p-3 rounded transition"
                        >
                            <Image
                                src={member.person.image?.medium || "/slike/placeholder.png"}
                                alt={member.person.name}
                                width={210}
                                height={295}
                                sizes="(max-width: 768px) 100vw, 210px"
                                className="rounded-lg shadow-md w-full h-auto mb-2 object-cover"
                            />
                            <p className="font-semibold">{member.person.name}</p>
                            <p className="text-sm text-gray-400">as {member.character.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}