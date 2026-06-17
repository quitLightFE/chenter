"use client";


import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useState } from "react";

import Link from "next/link";
import { useLoginForm } from "@/hooks/useLoginForm";

export default function LoginForm() {
  const {
    register,
    onSubmit,
    errors,
    isSubmitting,
    serverError,
    rememberMe,
    setRememberMe,
  } = useLoginForm();

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 450,
        borderRadius: 5,
        boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}
        >
          Вход
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 4,
          }}
        >
          Войдите в свой аккаунт
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {serverError}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email", {
              required: "Email обязателен",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Введите корректный email",
              },
            })}
          />

          <TextField
            fullWidth
            label="Пароль"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Пароль обязателен",
              minLength: { value: 8, message: "Минимум 8 символов" },
            })}
          />

          {/* Запомнить меня + Забыли пароль */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: -1,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Запомнить меня"
            />

            <Link
              href="/forgot-password"
              style={{
                color: "#2563eb",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              Забыли пароль?
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
            sx={{
              py: 1.6,
              borderRadius: 3,
              fontWeight: 600,
              mt: 1,
              textTransform: "none",
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Войти"
            )}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Нет аккаунта?{" "}
            <Link
              href="/register"
              style={{
                color: "#2563eb",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Зарегистрироваться
            </Link>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}