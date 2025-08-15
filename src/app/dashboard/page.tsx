'use client';
export const dynamic = "force-dynamic";

import { StatCard } from "../components/StatCard";
import { useAuthRedirect } from "@/hooks/userAuthRedirect";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  useAuthRedirect();
  const [session, setSession] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<string>("");

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setToken(data.session?.access_token || null);
      console.log("Supabase session:", data.session);
    };
    getSession();
  }, []);

  const testProtectedApi = async () => {
    if (!token) return;
    const res = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Test Item" }),
    });
    const data = await res.json();
    setApiResponse(JSON.stringify(data, null, 2));
  };

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
      <div className="mt-8">
        <h2 className="font-bold mb-2">Session Object (console):</h2>
        <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(session, null, 2) || "No session found (user not logged in)"}</pre>
        <h2 className="font-bold mb-2 mt-4">Access Token:</h2>
        <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{token || "No token found (user not logged in)"}</pre>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={testProtectedApi}
          disabled={!token}
        >
          Test Protected API
        </button>
        {apiResponse && (
          <div className="mt-4">
            <h3 className="font-bold">API Response:</h3>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{apiResponse}</pre>
          </div>
        )}
      </div>
    </section>
  );
}