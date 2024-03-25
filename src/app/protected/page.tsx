import { redirect } from "next/navigation";
import Typography from "@mui/material/Typography";

import { createClient } from "@/src/utils/supabase/server";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/log-in");
  }

  return <Typography>Protected page</Typography>;
}
