import { notFound } from "next/navigation";
import BackButton from "@/app/components/BackButton";

type Episode = {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  summary: string;
  image: { medium: string; original: string } | null;
};

export default async function EpisodePage({ params }: { params: { id: string } }) {
  const res = await fetch(`https://api.tvmaze.com/episodes/${params.id}`);
  if (!res.ok) return notFound();

  const episode: Episode = await res.json();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <BackButton />
      <br />
      <h1 className="text-3xl font-bold mb-4">{episode.name}</h1>

      {episode.image && (
        <img
          src={episode.image?.original || "/placeholder.png"}
          alt={episode.name}
          className="mb-4 rounded shadow-md w-full max-h-[500px] object-cover"
        />
      )}

      <p className="text-gray-500 mb-2">Season {episode.season}, Episode {episode.number}</p>
      <p className="text-sm text-gray-400 mb-2">Aired on: {episode.airdate}</p>

      <div
        className="prose prose-invert mt-4"
        dangerouslySetInnerHTML={{ __html: episode.summary }}
      />
    </div>
  );
}