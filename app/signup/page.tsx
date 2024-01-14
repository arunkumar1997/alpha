"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Stack, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Alert from "@mui/material/Alert";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import signup from "@/services/signup.service";

// import { LoginErrorResponse, LoginResponse } from "@/types";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (username.length < 1 || password.length < 4) {
      setError("Username or Password is invalid");
      setLoading(false);
      return;
    }

    setLoading(true);

    const data: any = await signup({
      username,
      password,
      flat_number: flatNumber,
    });

    if (data.statusCode != 200) {
      setError(data.detail);
      setLoading(false);
      return;
    }

    const { message } = data;
    setLoading(false);
    router.push(`/login?message=${message}. Please login using ${username}`);
  };

  return (
    <Box width={"100%"} bgcolor={"#f4f4f4"} height={"100%"}>
      {error ? (
        <Alert severity="error" onClose={() => setError("")}>
          <Box>{error}</Box>
        </Alert>
      ) : null}
      <Stack direction={"row"} justifyContent={"center"}>
        <Card
          sx={{
            paddingTop: "1rem",
            paddingBottom: "1rem",
            marginTop: "10rem",
            width: {
              md: "40%",
              sm: "100%",
              xs: "100%",
            },
          }}
        >
          <CardContent>
            <Box>
              <TextField
                sx={{
                  width: "100%",
                  marginBottom: "2.5rem",
                }}
                label="Username"
                variant="standard"
                size="small"
                onChange={(e) => {
                  setError("");
                  setUsername(e.target.value);
                }}
              />
            </Box>
            <Box>
              <TextField
                sx={{
                  width: "100%",
                  marginBottom: "2.5rem",
                }}
                type="text"
                size="small"
                label="Password"
                variant="standard"
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
              />
            </Box>
            <Box>
              <TextField
                sx={{
                  width: "100%",
                  marginBottom: "1rem",
                }}
                type="text"
                size="small"
                label="Flat Number"
                variant="standard"
                onChange={(e) => {
                  setError("");
                  setFlatNumber(e.target.value);
                }}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Box
              sx={{
                width: "100%",
                marginX: "5px",
              }}
            >
              <Button
                size="large"
                variant="contained"
                fullWidth
                onClick={handleLogin}
                disabled={loading}
              >
                Sign Up
              </Button>

              <Divider
                sx={{
                  borderBottom: "1px dashed rgba(0, 0, 0, 0.25)",
                  paddingTop: "1.5rem",
                }}
                variant="fullWidth"
              />
              <Stack
                sx={{
                  paddingTop: "1rem",
                }}
                direction="row"
                justifyContent="space-between"
              >
                {/* <Link href={"#"} underline="none">
                  Forgot password?
                </Link> */}
                <Link href={"/login"} underline="none">
                  Already have an account? Login
                </Link>
              </Stack>
            </Box>
          </CardActions>
        </Card>
      </Stack>
    </Box>
  );
}
