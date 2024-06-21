import { redirect } from "next/navigation"
import Typography from "@mui/material/Typography"

import { createClient } from "@/src/utils/supabase/server"
import { Orders } from "@/src/components/Orders"

export default async function Page() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/log-in")
  }

  return (
    <>
      <Typography variant="h3" component="h1">
        Admin
      </Typography>

      <Orders />
    </>
  )
}
