"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/services";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setStatus(null);

    try {
      await forgotPassword({ email });
      setStatus({
        type: "success",
        message: "Ссылка для сброса пароля отправлена на вашу почту!"
      });
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Не удалось отправить письмо. Попробуйте позже."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <Box
    //   sx={{
    //     minHeight: "100vh",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     bgcolor: "grey.50",
    //     py: 4
    //   }}
    // >
      <Card
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 5,
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}
          >
            Забыли пароль?
          </Typography>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 4
            }}
          >
            Введите email, и мы отправим вам ссылку для сброса пароля
          </Typography>

          {status && (
            <Alert severity={status.type} sx={{ mb: 3 }}>
              {status.message}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              sx={{
                py: 1.6,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none"
              }}
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Отправить ссылку"
              )}
            </Button>

            <Typography variant="body2" align="center">
              <Link
                href="/login"
                style={{
                  color: "#2563eb",
                  textDecoration: "none",
                  fontWeight: 500
                }}
              >
                Вернуться ко входу
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    // </Box>
  );
}
