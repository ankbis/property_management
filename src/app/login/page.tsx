'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        router.replace('/');
      } else {
        setAuthLoading(false);
      }
    });
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setMessage(error.message || 'Login failed.');
      setIsSubmitting(false);
      return;
    }

    setMessage('Login successful! Redirecting...');
    setTimeout(() => router.push('/'), 1500);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) alert(error.message);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="text-slate-400 text-lg animate-pulse">Checking authentication...</span>
      </div>
    );
  }

  return (
    <section className="flex min-h-[80vh] items-center justify-center">
      <div className="bg-slate-800 rounded-2xl shadow-2xl px-8 py-12 w-full max-w-md">
        <h1 className="text-3xl font-bold tracking-tight text-center mb-8 text-white">Login</h1>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded bg-slate-700 text-white border border-slate-700 focus:outline-none focus:border-indigo-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded bg-slate-700 text-white border border-slate-700 focus:outline-none focus:border-indigo-400"
            required
          />

          <div className="flex justify-end mb-2">
            <Link href="/forgot-password" className="text-indigo-400 hover:underline text-sm">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 rounded-xl font-semibold transition mb-2 ${
              isSubmitting
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full px-6 py-3 rounded-xl font-semibold transition border-2 border-indigo-500 text-indigo-500 bg-transparent hover:bg-indigo-50 flex items-center justify-center gap-2"
          >
            <img
              src="/google.png"
              alt="Google"
              className="w-5 h-5 object-contain"
            />
            Login with Google
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

          <p className="text-sm text-slate-300 text-center mt-4">
            Don’t have an account?{' '}
            <Link href="/register" className="text-indigo-400 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
