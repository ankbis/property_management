import Link from "next/link";
import { StatCard } from "../components/StatCard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-900 text-white">
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-800 backdrop-blur-sm">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <StatCard title="Active Users" value={125} icon="👥" />
          <StatCard title="Revenue" value="$2,300" icon="💰" />
          <StatCard title="Tickets" value={43} icon="🎟️" />
        </div>
      </section>
      <footer className="text-center py-8 text-slate-500 text-sm border-t border-slate-800 mt-16">
        &copy; {new Date().getFullYear()} Property Dashboard by BVerse AI Solutions Pvt Ltd. All rights reserved.
      </footer>
    </main>
  );
}
