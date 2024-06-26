import { redirect } from "next/navigation"

import { createClient } from "@/src/utils/supabase/server"
import { SignUpFormView } from "@/src/components/SignUpForm/SignUpFormView"

export const LogInForm = () => {
  const onSubmit = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect("/login?message=Could not authenticate user")
    }

    return redirect("/protected")
  }

  return <SignUpFormView onSubmit={onSubmit} />
}
