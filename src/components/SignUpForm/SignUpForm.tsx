import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/src/utils/supabase/server"
import { SignUpFormView } from "@/src/components/SignUpForm/SignUpFormView"

export const SignUpForm = () => {
  const onSubmit = async (formData: FormData) => {
    "use server"
    const origin = headers().get("origin")
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect("/log-in?message=Could not authenticate user")
    }

    return redirect(
      "/log-in?message=Check email to continue sign in process",
    )
  }

  return <SignUpFormView onSubmit={onSubmit} />
}
