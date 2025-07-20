import Link from "next/link";

const tasks = [
  {
    id: 1,
    title: "Fix leaky faucet",
    property: "Skyline Apartments",
    status: "Pending",
    due: "2025-07-20",
  },
  {
    id: 2,
    title: "Annual HVAC servicing",
    property: "Sunset Villa",
    status: "In Progress",
    due: "2025-07-22",
  },
  {
    id: 3,
    title: "Tenant agreement renewal",
    property: "Oakwood Rowhouse",
    status: "Completed",
    due: "2025-07-10",
  },
];

function statusColor(status: string) {
  switch (status) {
    case "Completed":
      return "text-green-400";
    case "In Progress":
      return "text-blue-400";
    default:
      return "text-yellow-300";
  }
}

export default function TasksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-900 text-white">
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-800 backdrop-blur-sm">
        <h1 className="text-3xl font-bold tracking-tight">Task Tracker</h1>
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
        <h2 className="text-2xl font-bold mb-6">Open Tasks</h2>
        <div className="space-y-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-slate-800 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-indigo-700 transition"
            >
              <div>
                <div className="text-lg font-bold mb-1">{task.title}</div>
                <div className="text-sm text-slate-300 mb-1">
                  {task.property}
                </div>
                <div className="text-xs text-slate-400">
                  Due: {task.due}
                </div>
              </div>
              <div className={`mt-3 md:mt-0 font-semibold ${statusColor(task.status)}`}>
                {task.status}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
