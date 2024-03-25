import Typography from "@mui/material/Typography";

import { LogInForm } from "@/src/components/LogInForm";

export default function LogIn({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <>
      <Typography>Log in</Typography>

      <LogInForm />

      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </>
  );
}
