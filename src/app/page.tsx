// Ova stranica je početna (Home) stranica aplikacije i prikazuje popis svih serija.
// Služi kao ulazna točka za pregledavanje dostupnih TV emisija.

import FilterableShowList from "@/app/components/FilterableShowList";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">TV shows</h1>
      <FilterableShowList />
    </main>
  );
}