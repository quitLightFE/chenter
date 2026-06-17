"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid"; // Используем новый Grid v2
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import SchoolIcon from "@mui/icons-material/School"; // Иконка академии для декора

import { useCourses } from "@/hooks/useCourses";

import Link from "next/link";

export default function CoursesPage() {
  const { courses } = useCourses();

  // Функция для красивого отображения сложности
  const getDifficultyColor = (difficulty) => {
    const diff = difficulty;
    if (diff <= 4) return "#10b981"; // Зеленый
    if (diff < 8) return "#f59e0b"; // Оранжевый
    return "#ef4444"; // Красный для hard
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <Box
      sx={
        {
          // p: { xs: 2, md: 4 },
          // bgcolor: "education.decorBg",
          // minHeight: "100vh"
        }
      }
    >
      {/* Декоративный Хедер Академии */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "between",
          p: 3,
          mb: 4,
          borderRadius: 4,
          //background: "linear-gradient(90deg, #1e3a8a 0%, #0f172a 100%)",
          background: (theme) => theme.palette.education.gradient,
          color: "#fff",
          boxShadow: "0px 10px 30px rgba(30, 58, 138, 0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Фоновый декор (водяной знак академии) */}
        {/*<SchoolIcon
          sx={{
            sx: {
              opacity: 0.05,
              position: "absolute",
              right: -20,
              bottom: -20,
              fontSize: 180,
              color: "#fff"
            }
          }}
        />*/}

        <Box sx={{ zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            {<SchoolIcon sx={{ sx: { color: "education.accent" } }} />}
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Образовательный портал
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 800,
              m: 0,
            }}
          >
            Доступные курсы и дисциплины
          </Typography>
        </Box>
      </Box>

      {/* Сетка курсов. Идеально встанет в Dashboard благодаря size={{ xs: 12, sm: 6, lg: 4 }} */}
      <Grid container spacing={3}>
        {courses?.map((course) => (
          <Grid key={course.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 4,
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(0,0,0,0.04)",
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0px 12px 30px rgba(30, 58, 138, 0.12)",
                },
              }}
            >
              {/* Контейнер для картинки + абсолютный декор */}
              <Box
                sx={{ position: "relative", overflow: "hidden" }}
                component={Link}
                href={`/courses/${course.id}`}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 180,
                    objectFit: "cover",
                    filter: "brightness(0.95)",
                  }}
                  image={
                    course.image ??
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
                  } // фоллбек если нет картинки
                  alt={course.title}
                />
                {/* Бейдж сложности сверху картинки */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(4px)",
                    borderRadius: 2,
                    px: 1.5,
                    py: 0.5,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: getDifficultyColor(course.difficulty),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#1e293b",
                        textTransform: "capitalize",
                      }}
                    >
                      {course.difficulty}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Контент карточки */}
              <CardContent
                sx={{
                  p: 3,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "education.textMain",
                    mb: 1.5,
                    lineHeight: 1.3,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    height: "3.12rem", // Фиксированная высота для выравнивания
                  }}
                >
                  {course.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: "education.textSub",
                    mb: 3,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: 1.5,
                    flexGrow: 1,
                  }}
                >
                  {course.description}
                </Typography>

                {/* Нижняя декоративная плашка в стиле зачетки / ID курса or course.created*/}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pt: 2,
                    borderTop: "1px dashed #e2e8f0",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "#94a3b8",
                    }}
                  >
                    {/*ID: {course.id.toString().substring(0, 6)}*/}
                    {formatDate(course.created)}
                  </Typography>
                  <Typography
                    component={Link}
                    href={`/courses/${course.id}`}
                    sx={{
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "primary.main",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      "&:hover": { color: "secondary.main" },
                    }}
                  >
                    Подробнее →
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
