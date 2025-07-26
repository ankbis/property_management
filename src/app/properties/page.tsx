'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type Property = {
  id: number;
  name: string;
  address: string;
  status: string;
  type: string;
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase.from("properties").select("*");
      if (error) {
        console.error("Error fetching properties:", error.message);
      } else {
        setProperties(data as Property[]);
      }
    };

    fetchProperties();
  }, []);

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
        {properties.length === 0 ? (
          <p className="text-slate-400">No properties found.</p>
        ) : (
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
        )}
      </section>
    </main>
  );
}
