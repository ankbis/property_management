// src/app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-900 text-white">
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-800 backdrop-blur-sm">
        <h1 className="text-3xl font-bold tracking-tight">🏠 Home </h1>
        <nav>
          <Link
            href="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl font-semibold transition"
          >
            Dashboard
          </Link>
        </nav>
      </header>

      <section className="max-w-5xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Welcome to Your Property Management Portal</h2>
          <p className="text-xl text-slate-300">
            Manage properties, track tasks, view analytics, and stay organized—all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title="View Properties"
            description="Browse, add, or edit your listed properties with ease."
            icon="🏢"
            link="/properties"
          />
          <Card
            title="Task Tracker"
            description="Monitor open tasks, maintenance issues, and assignments."
            icon="🛠️"
            link="/tasks"
          />
          <Card
            title="Analytics"
            description="Gain insights on occupancy, revenue, and trends with detailed analytics."
            icon="📊"
            link="/analytics"
          />
        </div>
      </section>

      <footer className="text-center py-8 text-slate-500 text-sm border-t border-slate-800 mt-16">
        &copy; {new Date().getFullYear()} Property Dashboard by BVerse AI Solutions Pvt Ltd. All rights reserved.
      </footer>
    </main>
  );
}

function Card({
  title,
  description,
  icon,
  link,
}: {
  title: string;
  description: string;
  icon: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="block bg-slate-800 hover:bg-indigo-700 transition shadow-lg rounded-2xl p-8 h-full"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-slate-300 mb-4">{description}</p>
      <span className="text-indigo-400 font-semibold">Go to {title} &rarr;</span>
    </Link>
  );
}
