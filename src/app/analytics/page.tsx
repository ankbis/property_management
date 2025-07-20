import Link from "next/link";

const analytics = [
  {
    label: "Occupancy Rate",
    value: "87%",
    icon: "🏠",
  },
  {
    label: "Monthly Revenue",
    value: "₹1,80,000",
    icon: "💰",
  },
  {
    label: "Open Maintenance",
    value: "6",
    icon: "🛠️",
  },
];

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-900 text-white">
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-800 backdrop-blur-sm">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
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
        <h2 className="text-2xl font-bold mb-6">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {analytics.map((item) => (
            <div
              key={item.label}
              className="bg-slate-800 rounded-2xl p-8 flex flex-col items-center shadow-lg hover:bg-indigo-700 transition"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <div className="text-lg text-slate-400 font-semibold mb-1">{item.label}</div>
              <div className="text-3xl font-bold text-white">{item.value}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
