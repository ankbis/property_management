"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type Task = {
  id: string;
  title: string;
  property: string;
  status: string;
  due: string;
};

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
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from("tasks").select("*");
      if (error) {
        console.error("Error fetching tasks:", error.message);
      } else {
        setTasks(data);
      }
    };
    fetchTasks();
  }, []);

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
          {tasks.length === 0 && (
            <p className="text-slate-400">No tasks found.</p>
          )}
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
                <div className="text-xs text-slate-400">Due: {task.due}</div>
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
