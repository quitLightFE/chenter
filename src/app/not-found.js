"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import SchoolIcon from "@mui/icons-material/School";

export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 4,
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #0f172a 0%, #1e2937 100%)"
            : "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
        textAlign: "center",
        px: 3,
      }}
    >
      {/* Куб (меньше размером) */}
      <Box
        sx={{
          position: "relative",
          width: 90,
          height: 90,
          perspective: "1000px",
          mb: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            animation: "rotateCube 5s infinite linear",
            "@keyframes rotateCube": {
              "0%": { transform: "rotateX(15deg) rotateY(0deg)" },
              "100%": { transform: "rotateX(375deg) rotateY(360deg)" },
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              border: "2px solid #60a5fa",
              background: "rgba(96, 165, 250, 0.15)",
              boxShadow: "0 0 20px rgba(147, 197, 253, 0.3)",
              transform: "translateZ(45px)",
            }}
          />
        </Box>
      </Box>

      <SchoolIcon sx={{ fontSize: 80, color: "primary.main", opacity: 0.9 }} />

      <Typography variant="h2" fontWeight={700} gutterBottom>
        404
      </Typography>

      <Typography variant="h5" sx={{ mb: 1, maxWidth: 420 }}>
        Страница не найдена
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 480, mb: 4 }}
      >
        К сожалению, страница, которую вы ищете, не существует или была
        перемещена.
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => router.push("/")}
        sx={{ px: 5, py: 1.5, borderRadius: 2 }}
      >
        Вернуться на главную
      </Button>
    </Box>
  );
}
