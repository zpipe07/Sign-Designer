"use client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type Props = { onSubmit(formData: FormData): any };

export type FormValues = {
  email: string;
  password: string;
};

export const SignUpFormView: React.FC<Props> = ({ onSubmit }) => {
  return (
    <form action={onSubmit}>
      <TextField type="email" name="email" />

      <TextField type="password" name="password" />

      <Button type="submit">Sign up</Button>
    </form>
  );
};
