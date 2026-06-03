"use client";

import Link from "next/link";

import { Box, Container, Typography, Button } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function CTASection() {
  return (
    <Box
      sx={{
        // bgcolor: "grey.900",
        background: theme =>
          `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: "white",
        py: 10
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          textAlign: "center"
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          //mb={2}
          sx={{ mb: 2 }}
        >
          Начните обучение уже сегодня
        </Typography>

        <Typography
          sx={{
            opacity: 0.8,
            mb: 4
          }}
        >
          Присоединяйтесь к платформе и получите доступ к курсам, заданиям и
          прогрессу обучения.
        </Typography>

        <Button
          disableElevation
          endIcon={<ChevronRightIcon />}
          component={Link}
          href="/register"
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            bgcolor: "#ffffff",
            color: "primary.main",
            fontSize: 18,
            letterSpacing: "unset"
          }}
        >
          Создать аккаунт
        </Button>
      </Container>
    </Box>
  );
}
