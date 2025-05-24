import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";

type Person = {
  id: number;
  name: string;
  image: { medium: string; original: string } | null;
  birthday: string | null;
  country: { name: string } | null;
  gender: string | null;
};

type CastCredit = {
  _embedded: {
    show: {
      id: number;
      name: string;
      image: { medium: string; original: string } | null;
    };
  };
};

export default async function CastPage({ params }: { params: { id: string } }) {
  // Dohvati podatke o glumcu
  const personRes = await fetch(`https://api.tvmaze.com/people/${params.id}`);
  if (!personRes.ok) return notFound();
  const person: Person = await personRes.json();

  // Dohvati serije u kojima glumac glumi (cast credits)
  const creditsRes = await fetch(
    `https://api.tvmaze.com/people/${params.id}/castcredits?embed=show`
  );
  if (!creditsRes.ok) return notFound();
  const credits: CastCredit[] = await creditsRes.json();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <BackButton />
      <br />
      <h1 className="text-3xl font-bold mb-4">{person.name}</h1>
      {person.image && (
        <img
          src={person.image.original}
          alt={person.name}
          className="mb-4 rounded shadow-md w-full max-h-[600px] object-cover"
        />
      )}
      <p className="mb-2">
        <strong>Birthday:</strong> {person.birthday ?? "uknown"}
      </p>
      <p className="mb-2">
        <strong>Country:</strong> {person.country?.name ?? "uknown"}
      </p>
      <p className="mb-2">
        <strong>Gender:</strong> {person.gender ?? "uknow"}
      </p>

      <h2 className="mt-8 text-2xl font-semibold mb-4">TV shows they appeared in:</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {credits.map(({ _embedded }) => (
          <Link
            key={_embedded.show.id}
            href={`/show/${_embedded.show.id}`}
            className="block text-center cursor-pointer"
          >
            <img
              src={_embedded.show.image?.medium || "/slike/placeholder.png"}
              alt={_embedded.show.name}
              className="mx-auto rounded-lg shadow-md"
            />
            <p className="mt-2 font-semibold">{_embedded.show.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}