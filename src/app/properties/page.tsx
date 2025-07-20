import Link from "next/link";

const properties = [
  {
    id: 1,
    name: "Skyline Apartments",
    address: "45 Main St, New City",
    status: "Occupied",
    type: "Apartment",
  },
  {
    id: 2,
    name: "Sunset Villa",
    address: "200 Lakeview Ave",
    status: "Vacant",
    type: "Villa",
  },
  {
    id: 3,
    name: "Oakwood Rowhouse",
    address: "32 Park Lane",
    status: "Occupied",
    type: "Row House",
  },
];

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-900 text-white">
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-800 backdrop-blur-sm">
        <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
        <nav>
          <Link
            href="/"
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl font-semibold transition"
          >
            Home
          </Link>
        </nav>
      </header>
      <section className="max-w-5xl mx-auto px-8 py-20">
        <h2 className="text-2xl font-bold mb-6">Your Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="bg-slate-800 rounded-2xl p-8 shadow-lg hover:bg-indigo-700 transition"
            >
              <div className="mb-2 text-xl font-bold">{prop.name}</div>
              <div className="mb-1 text-slate-300">{prop.address}</div>
              <div className="mb-1">
                <span className="text-sm bg-gray-700 px-2 py-1 rounded">
                  {prop.type}
                </span>
              </div>
              <div>
                <span
                  className={`text-sm font-semibold ${
                    prop.status === "Occupied"
                      ? "text-green-400"
                      : "text-yellow-300"
                  }`}
                >
                  {prop.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
