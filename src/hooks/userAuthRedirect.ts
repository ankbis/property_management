'use client';

import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function useAuthRedirect() {
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login');
      }
    });
  }, [router]);
}
