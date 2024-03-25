import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

type Props = {
  action(formData: FormData): any;
  inputComponents: React.ReactElement[];
  actionComponents: React.ReactElement[];
};

export const Form: React.FC<Props> = ({
  action,
  inputComponents,
  actionComponents,
}) => {
  return (
    <Box component="form" action={action}>
      <Grid container spacing={2}>
        {inputComponents.map((component) => (
          <Grid item key={component.key} xs={12}>
            {component}
          </Grid>
        ))}

        {actionComponents.map((component) => (
          <Grid item key={component.key} xs={12}>
            {component}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
