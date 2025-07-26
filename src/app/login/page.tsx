'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', form.email)
      .single();

    if (error || !data) {
      setMessage('Invalid email or user not found.');
      setIsSubmitting(false);
      return;
    }

    const passwordMatch = await bcrypt.compare(form.password, data.password);

    if (!passwordMatch) {
      setMessage('Incorrect password.');
      setIsSubmitting(false);
      return;
    }

    setMessage('Login successful! Redirecting...');
    setTimeout(() => router.push('/dashboard'), 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-900 text-white">
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-800 backdrop-blur-sm">
        <h1 className="text-3xl font-bold tracking-tight">Login</h1>
        <nav>
          <Link
            href="/"
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl font-semibold transition"
          >
            Home
          </Link>
        </nav>
      </header>

      <section className="max-w-md mx-auto px-8 py-16">
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 bg-slate-800 p-10 rounded-2xl shadow-lg"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded bg-slate-700 text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded bg-slate-700 text-white"
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              isSubmitting
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500'
            }`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          {message && (
            <p
              className={`text-center text-sm mt-4 ${
                message.includes('successful') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-sm text-slate-300 text-center">
            Don’t have an account?{' '}
            <Link href="/register" className="text-indigo-400 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
