"use client";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useIsMounted from "@/hooks/isMounted";
import { FormEvent, useState } from "react";
import { red } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { signin } from "@/actions/auth";

const defaultTheme = createTheme();

export default function SignIn() {
  const { isMounted } = useIsMounted();
  const [errors, setErrors] = useState<{ email: string[]; password: string[] }>(
    { email: [], password: [] }
  );
  const router = useRouter();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await signin(formData);
    console.log(res);
    if (res.message === "success") {
      router.push("/dashboard");
    }

    if (res.errors?.email) {
      setErrors({ ...errors, email: res.errors.email });
    } else if (res.errors?.password) {
      setErrors({ ...errors, password: res.errors.password });
    }
  };

  if (!isMounted) return <div></div>;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" sx={{ mt: 1 }} onSubmit={handleFormSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onFocus={() => setErrors({ ...errors, email: [] })}
              onChange={() => setErrors({ ...errors, email: [] })}
            />
            {errors.email &&
              errors.email.map((err) => (
                <Typography key={err} fontSize={12} color={red[900]}>
                  {err}
                </Typography>
              ))}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onFocus={() => setErrors({ ...errors, password: [] })}
              onChange={() => setErrors({ ...errors, password: [] })}
            />
            {errors.password &&
              errors.password.map((err) => (
                <Typography key={err} fontSize={12} color={red[900]}>
                  {err}
                </Typography>
              ))}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
              <Link href="#" variant="body2">
              Forgot password?
              </Link>
              </Grid>
              <Grid item>
              <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
              </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
