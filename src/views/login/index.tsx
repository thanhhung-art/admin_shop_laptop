"use client";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useIsMounted from "@/hooks/isMounted";
import { useMutation } from "@tanstack/react-query";
import { Fetch } from "@/utils/fetch";
import { useState } from "react";
import { red } from "@mui/material/colors";
import { useRouter } from "next/navigation";

const defaultTheme = createTheme();

export default function SignIn() {
  const { isMounted } = useIsMounted();
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();

  const signInMutation = useMutation({
    mutationFn: (data: any) => {
      return Fetch.post("/auth/login", data, { withCredentials: true });
    },
    onSuccess(data) {
      if (data.data.msg === "login success") router.push("/dashboard");
    },
    onError(res: { response: { data: { message: string } } }) {
      if (res.response.data.message === "Email not found")
        setErrors({ ...errors, email: "email not found" });
      else if (res.response.data.message === "Invalid password")
        setErrors({ ...errors, password: "invalid password" });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signInMutation.mutate({
      email: data.get("email"),
      password: data.get("password"),
    });
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onFocus={() => setErrors({ ...errors, email: "" })}
              onChange={() => setErrors({ ...errors, email: "" })}
            />
            {errors.email && (
              <Typography fontSize={12} color={red[900]}>
                {errors.email}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onFocus={() => setErrors({ ...errors, password: "" })}
              onChange={() => setErrors({ ...errors, password: "" })}
            />
            {errors.password && (
              <Typography fontSize={12} color={red[900]}>
                {errors.password}
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
