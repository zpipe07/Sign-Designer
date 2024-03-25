"use client";
import { useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { createClient } from "@/src/utils/supabase/client";

export const SignOut = () => {
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();

    return router.push("/log-in");
  };

  return (
    <MenuItem onClick={signOut}>
      <Typography textAlign="center">Log out</Typography>
    </MenuItem>
  );
};
