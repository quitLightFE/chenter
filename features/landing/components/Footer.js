"use client";

import Link from "next/link";

import { Box, Button, Container, Grid, Typography } from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "background.main",
        pt: 8,
        pb: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid
            size={{
              xs: 12,
              md: 4
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2
              }}
            >
              <SchoolIcon color="primary" />

              <Typography variant="h6" fontWeight={700}>
                EduHub
              </Typography>
            </Box>

            <Typography
              color="text.secondary"
              sx={{
                color: "text.secondary"
              }}
            >
              Современная образовательная платформа для студентов,
              преподавателей и учебных центров.
            </Typography>
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 2
            }}
          >
            <Typography
              //fontWeight={600}
              //mb={2}
              sx={{
                fontWeight: " bold",
                mb: 2
              }}
            >
              Платформа
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 1
              }}
            >
              <Button
                variant="text"
                component={Link}
                sx={{ textDecoration: "none", color: "text.secondary" }}
                href="/courses"
              >
                Курсы
              </Button>

              <Button
                variant="text"
                component={Link}
                sx={{ textDecoration: "none", color: "text.secondary" }}
                href="/"
              >
                Расписание
              </Button>

              <Button
                variant="text"
                component={Link}
                sx={{ textDecoration: "none", color: "text.secondary" }}
                href="/"
              >
                Библиотека
              </Button>
            </Box>
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 2
            }}
          >
            <Typography
              //fontWeight={600}
              //mb={2}
              sx={{
                fontWeight: " bold",
                mb: 2
              }}
            >
              Сообщество
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 1
              }}
            >
              <Button
                variant="text"
                component={Link}
                sx={{ textDecoration: "none", color: "text.secondary" }}
                href="/"
              >
                Форум
              </Button>

              <Button
                variant="text"
                component={Link}
                sx={{ textDecoration: "none", color: "text.secondary" }}
                href="/"
              >
                Мероприятия
              </Button>

              <Button
                variant="text"
                component={Link}
                sx={{ textDecoration: "none", color: "text.secondary" }}
                href="/"
              >
                Отзывы
              </Button>
            </Box>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4
            }}
          >
            <Typography
              //fontWeight={600}
              //mb={2}
              sx={{
                fontWeight: " bold",
                mb: 2
              }}
            >
              Контакты
            </Typography>

            <Typography
              // color="text.secondary"
              sx={{
                color: "text.secondary"
              }}
            >
              Tashkent, Uzbekistan
              <br />
              info@eduhub.uz
              <br />
              +998 99 123 45 67
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: "1px solid",
            borderColor: "divider",
            textAlign: "center"
          }}
        >
          <Typography
            // color="text.secondary"
            sx={{
              color: "text.secondary"
            }}
          >
            © 2026 EduHub. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
