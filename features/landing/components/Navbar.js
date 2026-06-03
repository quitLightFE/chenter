"use client";

import { useState } from "react";

import Link from "next/link";

import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  IconButton
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import MobileMenu from "./MobileMenu";
import { navigation } from "../data/navigation";
import { useThemeMode } from "@/hooks/useThemeMode";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { toggleTheme, mode } = useThemeMode();

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: theme => alpha(theme.palette.background.paper, 0.15),
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(15px)"
        }}
      >
        <Toolbar>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              {/* Лого */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <SchoolIcon color="primary" />
                <Typography variant="h6" fontWeight={700}>
                  EduHub
                </Typography>
              </Box>

              {/* Навигация (десктоп) */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 4
                }}
              >
                {navigation.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      textDecoration: "none",
                      color: "inherit"
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Box>

              {/* Правая часть: кнопки + переключатель темы */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  gap: 2
                }}
              >
                <IconButton onClick={toggleTheme} color="inherit">
                  {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>

                <Button
                  component={Link}
                  href="/dashboard"
                  variant="text"
                  sx={{ color: "text.primary" }}
                >
                  Войти
                </Button>

                <Button
                  disableElevation
                  component={Link}
                  href="/register"
                  variant="contained"
                >
                  Регистрация
                </Button>
              </Box>

              {/* Мобильное меню */}
              <IconButton
                sx={{
                  display: { xs: "flex", md: "none" }
                }}
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
