import { notFound } from "next/navigation";
import Link from "next/link";

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
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{show.name}</h1>

            {show.image && (
                <img
                    src={show.image.original}
                    alt={show.name}
                    className="mb-4 rounded shadow-md w-full max-h-[600px] object-cover"
                />
            )}

            <p className="mb-2 text-gray-500">Status: {show.status}</p>
            <p className="mb-2">Rating: {show.rating.average ?? "N/A"}</p>
            <p className="mb-2">Genres: {show.genres.join(", ")}</p>

            <div
                className="prose prose-invert max-w-none mt-4"
                dangerouslySetInnerHTML={{ __html: show.summary }}
            />

            <h2 className="text-2xl font-semibold mt-8 mb-4">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {cast.map((member) => (
                    <div key={`${member.person.id}-${member.character.id}`} className="text-center">
                        <Link href={`/cast/${member.person.id}`} className="cursor-pointer">
                            <img
                                src={member.person.image?.medium || "/placeholder.png"}
                                alt={member.person.name}
                                className="mx-auto rounded-lg shadow-md"
                            />
                            <p className="mt-2 font-semibold">{member.person.name}</p>
                            <p className="text-sm text-gray-400">as {member.character.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
            {episodes.length > 0 && (
                <>
                    <h2 className="text-2xl font-semibold mt-10 mb-4">Episodes</h2>
                    <ul className="space-y-2">
                        {episodes.map((ep) => (
                            <li key={ep.id} className="border-b pb-2">
                                <Link href={`/episode/${ep.id}`} className="hover:underline text-blue-500">
                                    <strong>Season {ep.season}, Episode {ep.number}:</strong> {ep.name}
                                </Link>
                                <span className="text-gray-500 text-sm ml-2">({ep.airdate})</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}