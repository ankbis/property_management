import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

type AuthButtonsProps = {
  user: User | null
}

export default function AuthButtons({ user }: AuthButtonsProps) {
  return user ? (
    <button onClick={() => supabase.auth.signOut()}>Logout</button>
  ) : (
    <>
      <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}>
        Login with Google
      </button>
      <button
        onClick={async () => {
          const email = window.prompt('Email:')
          if (email) {
            await supabase.auth.signInWithOtp({ email })
            alert('Check your email for a login link!')
          }
        }}
      >
        Login with Email
      </button>
    </>
  )
}
