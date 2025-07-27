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

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    phone: '',
    gender: '',
    dob: '',
    address: '',
    password: '',
    confirm_password: '',
    terms: false,
  });

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prevForm) => ({ ...prevForm, [name]: checked }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!form.terms) return 'Please accept terms and conditions.';
    if (!form.first_name || !form.last_name || !form.email || !form.username || !form.password || !form.confirm_password) return 'All required fields must be filled.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Invalid email format.';
    if (form.password !== form.confirm_password) return 'Passwords do not match.';
    if (form.phone && !/^\d{10}$/.test(form.phone)) return 'Phone must be 10 digits.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const errorMsg = validateForm();
    if (errorMsg) {
      setMessage(errorMsg);
      return;
    }

    try {
      setIsSubmitting(true);
      const hashedPassword = await bcrypt.hash(form.password, 10);

      const { error } = await supabase.from('users').insert([
        {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          username: form.username,
          phone: form.phone,
          gender: form.gender,
          dob: form.dob,
          address: form.address,
          password: hashedPassword,
        },
      ]);

      if (error) {
        console.error(error);
        setMessage('Error: ' + error.message);
      } else {
        setMessage('Registration successful!');
        setForm({
          first_name: '',
          last_name: '',
          email: '',
          username: '',
          phone: '',
          gender: '',
          dob: '',
          address: '',
          password: '',
          confirm_password: '',
          terms: false,
        });

        setTimeout(() => router.push('/login'), 5000);
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-900 text-white">
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-800 backdrop-blur-sm">
        <h1 className="text-3xl font-bold tracking-tight">Register</h1>
        <nav>
          <Link href="/" className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl font-semibold transition">
            Home
          </Link>
        </nav>
      </header>

      <section className="max-w-3xl mx-auto px-8 py-16">
        <form onSubmit={handleSubmit} className="grid gap-6 bg-slate-800 p-10 rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} className="p-3 rounded bg-slate-700 text-white" required />
            <input type="text" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} className="p-3 rounded bg-slate-700 text-white" required />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="p-3 rounded bg-slate-700 text-white" required />
            <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} className="p-3 rounded bg-slate-700 text-white" required />
            <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="p-3 rounded bg-slate-700 text-white" />
            <select name="gender" value={form.gender} onChange={handleChange} className="p-3 rounded bg-slate-700 text-white">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input type="date" name="dob" value={form.dob} onChange={handleChange} className="p-3 rounded bg-slate-700 text-white" />
            <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} className="p-3 rounded bg-slate-700 text-white md:col-span-2" />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="p-3 rounded bg-slate-700 text-white" required />
            <input type="password" name="confirm_password" placeholder="Confirm Password" value={form.confirm_password} onChange={handleChange} className="p-3 rounded bg-slate-700 text-white" required />
          </div>

          <label className="flex items-center gap-3 text-slate-300">
            <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} className="w-5 h-5" />
            I agree to the terms and conditions
          </label>

          <button type="submit" disabled={isSubmitting} className={`px-6 py-3 rounded-xl font-semibold transition ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>

          {message && (
            <p className={`text-center text-sm mt-4 ${message.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
