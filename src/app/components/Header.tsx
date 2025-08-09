'use client';

import { User, createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/login');
  };

  const hideAuthLinks = pathname === "/login" || pathname === "/register";

  return (
    <header className="w-full z-50 bg-gradient-to-r from-gray-950/80 via-slate-900/80 to-indigo-900/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-end px-8 py-4">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-slate-200 text-sm">Hello, {user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold shadow transition"
            >
              Logout
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow transition"
            >
              Dashboard
            </Link>
          </div>
        ) : (
          !hideAuthLinks && (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold shadow transition"
              >
                Register
              </Link>
            </div>
          )
        )}
      </div>
    </header>
  );
}