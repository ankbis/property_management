'use client';
export const dynamic = "force-dynamic";

import { StatCard } from "../components/StatCard";
import { useAuthRedirect } from "@/hooks/userAuthRedirect";

export default function DashboardPage() {
  useAuthRedirect();
  return (
    <section className="max-w-5xl mx-auto px-8 py-20">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8 text-center">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard title="Active Users" value={125} icon="👥" />
        <StatCard title="Revenue" value="$2,300" icon="💰" />
        <StatCard title="Tickets" value={43} icon="🎟️" />
      </div>
    </section>
  );
}