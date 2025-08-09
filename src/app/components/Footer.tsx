'use client';

export default function Footer() {
  return (
    <footer className="w-full text-center py-8 text-slate-500 text-sm border-t border-slate-800 mt-16">
      &copy; {new Date().getFullYear()} Property Management Application by BVerse AI Solutions Pvt Ltd. All rights reserved.
    </footer>
  );
}
