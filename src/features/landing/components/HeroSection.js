"use client"

import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CodePreview from "./CodePreview";
import Link from "next/link";

export default function HeroSection() {
  return (
    <Box
      sx={{
        // backgroundColor: "#0d1117", // Темный фон как на макете
        backgroundColor: "background.main",
        // minHeight: '100vh',
        py: { xs: 10, md: 16 },
        display: "flex",
        alignItems: "center",
        color: "#ffffff",
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{
            alignItems: "center"
          }}
        >
          {/* Левая колонка: Текстовый контент */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "4rem" },
                lineHeight: 1.2,
                color: "#6366f1", // Фиолетово-синий градиент/цвет
                background:theme => `linear-gradient(120deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                mb: 3
              }}
            >
              Добро пожаловать в{" "}
              EduHub{" "}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#9ca3af",
                fontSize: { xs: "1rem", md: "1.25rem" },
                lineHeight: 1.6,
                mb: 4,
                maxWidth: "480px"
              }}
            >
              {/*Интерактивные курсы со встроенным редактором кода, мгновенной обратной связью 
              и совместной работой в реальном времени. Идеально подходит как для начинающих, 
              так и для опытных разработчиков.*/}
              Современная платформа для обучения, управления курсами, заданиями
              и студентами
            </Typography>

            {/* Кнопки действий */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                endIcon={<ChevronRightIcon />}
                component={Link}
                href={"/register"}
                sx={{
                  backgroundColor: "primary.main",
                  "&:hover": { backgroundColor: "#1e40af" },
                  textTransform: "none",
                  textDecoration: "none",
                  px: 2,
                  py: 1.5,
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  width: { xs: "100%", sm: "auto" }
                }}
              >
                Начать учиться бесплатно
              </Button>

              <Button
                variant="outlined"
                component={Link}
                href={"/courses"}
                sx={{
                  color: "text.primary",
                  borderColor: "#374151",
                  "&:hover": {
                    borderColor: "#4b5563",
                    backgroundColor: "rgba(255,255,255,0.05)"
                  },
                  textTransform: "none",
                  textDecoration: "none",
                  px: 4,
                  py: 1.5,
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  width: { xs: "100%", sm: "auto" }
                }}
              >
                Посмотреть курсы
              </Button>
            </Box>
          </Grid>

          {/* Правая колонка: Компонент с кодом */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CodePreview sx={{ display: { md: "block", xs: "none" } }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
