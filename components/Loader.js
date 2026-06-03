"use client";

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useThemeMode } from "@/hooks/useThemeMode";

const transformations = [
  { transform: "translateZ(55px)" },
  { transform: "translateZ(-55px) rotateY(180deg)" },
  { transform: "rotateY(90deg) translateZ(55px)", highlight: true },
  { transform: "rotateY(-90deg) translateZ(55px)" },
  { transform: "rotateX(90deg) translateZ(55px)" },
  { transform: "rotateX(-90deg) translateZ(55px)" }
];

const Loader = ({ text = "Loading..." }) => {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  // === Цветовая палитра в зависимости от темы ===
  const colors = {
    background: isDark
      ? "linear-gradient(135deg, #0f172a 0%, #1e2937 100%)"
      : "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",

    cubeBorder: isDark ? "#60a5fa" : "#3b82f6",
    cubeFace: isDark ? "rgba(96, 165, 250, 0.12)" : "rgba(96, 165, 250, 0.15)",
    cubeFaceHighlight: isDark
      ? "rgba(147, 197, 253, 0.18)"
      : "rgba(147, 197, 253, 0.25)",

    textPrimary: isDark ? "#e0f2fe" : "#0f172a",
    textSecondary: isDark
      ? "rgba(224, 242, 254, 0.7)"
      : "rgba(15, 23, 42, 0.7)",
    glow: isDark ? "rgba(147, 197, 253, 0.25)" : "rgba(147, 197, 253, 0.2)"
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 4,
        background: colors.background,
        zIndex: 9999,
        overflow: "hidden",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 40% 40%, ${colors.glow} 0%, transparent 60%)`,
          pointerEvents: "none"
        }
      }}
    >
      {/* Вращающийся куб */}
      <Box
        sx={{
          position: "relative",
          width: 110,
          height: 110,
          perspective: "1200px",
          zIndex: 1
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            animation: "rotateCube 4.2s infinite linear",
            "@keyframes rotateCube": {
              "0%": { transform: "rotateX(0deg) rotateY(0deg)" },
              "100%": { transform: "rotateX(360deg) rotateY(360deg)" }
            }
          }}
        >
          {/* 6 граней куба */}
          {transformations.map((face, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                border: `2.5px solid ${colors.cubeBorder}`,
                background: face.highlight
                  ? colors.cubeFaceHighlight
                  : colors.cubeFace,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 25px ${colors.glow}`,
                transform: face.transform
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Основной текст */}
      <Typography
        variant="h5"
        sx={{
          color: colors.textPrimary,
          fontWeight: 600,
          letterSpacing: 1.5,
          textAlign: "center",
          zIndex: 1,
          animation: "fadeInUp 0.8s ease-out",
          "@keyframes fadeInUp": {
            "0%": { opacity: 0, transform: "translateY(25px)" },
            "100%": { opacity: 1, transform: "translateY(0)" }
          }
        }}
      >
        {text}
      </Typography>

      {/* Подсказка */}
      <Typography
        variant="caption"
        sx={{
          color: colors.textSecondary,
          letterSpacing: 3,
          textTransform: "uppercase",
          fontSize: "12.5px",
          zIndex: 1,
          animation: "fadeInUp 0.9s ease-out 0.3s both",
          "@keyframes fadeInUp": {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" }
          }
        }}
      >
        Инициализация системы...
      </Typography>
    </Box>
  );
};

export default Loader;
