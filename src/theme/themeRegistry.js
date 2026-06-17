"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Создаем контекст с понятным дефолтным значением для автокомплита
export const ThemeContext = createContext({
  mode: "light",
  toggleTheme: () => {},
});

export default function ThemeRegistry({ children, initialMode }) {
  // Инициализируем состоянием из кук или дефолтным light
  const [mode, setMode] = useState(initialMode || "light");

  // Слушаем системные предпочтения, если кука еще не установлена
  useEffect(() => {
    if (!initialMode) {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, [initialMode]);

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      // Устанавливаем куку для SSR (Next.js)
      document.cookie = `theme-mode=${newMode}; path=/; max-age=31536000; SameSite=Lax`;
      return newMode;
    });
  };

  // Оптимизируем создание темы через useMemo, чтобы не пересоздавать объект при каждом рендере
  const theme = useMemo(() => {
    const isDark = mode === "dark";

    return createTheme({
      palette: {
        mode,
        // Оставляем ваши primary и secondary как основу
        primary: {
          main: "#1E75FF",
          light: "#5294FF",
          dark: "#0056C6",
        },
        secondary: {
          main: "#9c27b0",
        },

        // primary: {
        //   main: !isDark ? "#1e3a8a" : "#3b82f6" // Университетский синий / Яркий синий в темной теме
        // },
        // secondary: {
        //   main: !isDark ? "#b45309" : "#f59e0b" // Янтарный декор
        // },
        // Наш кастомный объект, который адаптируется под тему
        education: {
          gradient: !isDark
            ? "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)"
            : "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
          accent: !isDark ? "#f59e0b" : "#fbbf24",
          decorBg: !isDark ? "#f8fafc" : "#0f172a", // Светлый серый фон / Глубокий темный фон
          cardBg: !isDark ? "#ffffff" : "#1e293b", // Белая карточка / Темно-серая карточка
          textMain: !isDark ? "#0f172a" : "#f8fafc",
          textSub: !isDark ? "#64748b" : "#94a3b8",
          border: !isDark ? "#e2e8f0" : "#334155",
        },
        // Премиальные фоны и подложки
        /*
        background: {
          //default: isDark ? "#0B0F19" : "#f8f9fa", // Полночный синий / Благородный молочный
          default: isDark ? "#0B0F19" : "#FCFBF9", // Полночный синий / Благородный молочный
          paper: isDark ? "#161B26" : "#FFFFFF" // Глубокий графит / Чистый белый
        }, */
        background: {
          // Базовые цвета (оставляем ваши оригинальные)
          //default: isDark ? "#0B0F19" : "#FCFBF9", // Полночный синий / Благородный молочный
          default: isDark ? "#0B0F19" : "#FFFDFB", // Полночный синий / Благородный молочный
          paper: isDark ? "#161B26" : "#FFFFFF", // Глубокий графит / Чистый белый

          // Главный акцентный фон для контента (часто совпадает с default или paper)
          main: isDark ? "#111622" : "#F5F3EF",

          // Светлый оттенок фона (в светлой теме — почти белый, в темной — мягкий графит)
          //light: isDark ? "#1D2433" : "#FFFDFB",
          light: isDark ? "#1D2433" : "#f8f9fa",

          // Темный оттенок фона (в светлой теме — глубокий молочно-серый, в темной — глубокий полночный)
          dark: isDark ? "#070A10" : "#f8f9fa",
        },
        // Элегантная типографика (уходим от чисто черного #000)
        text: {
          primary: isDark ? "#E2E8F0" : "#1E293B", // Мягкий белый / Глубокий чернильный
          secondary: isDark ? "#94A3B8" : "#64748B", // Приглушенные тона для подзаголовков
        },
        // Кастомные премиальные границы
        divider: isDark
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(30, 41, 59, 0.06)",
      },
      typography: {
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        button: { fontWeight: 600 },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              transition: "background-color 0.3s ease, color 0.3s ease", // Плавный переход при смене темы
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
              borderRadius: 10, // Чуть мягче углы — тренд премиального UI
              padding: "8px 18px",
              fontWeight: 500,
              boxShadow: "none",
              "&:hover": {
                boxShadow: isDark
                  ? "0 4px 20px rgba(30, 117, 255, 0.2)"
                  : "0 4px 15px rgba(30, 117, 255, 0.15)",
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              //borderRadius: 14,
              backgroundImage: "none", // Убираем дефолтный оверлей MUI в темной теме
              boxShadow: isDark
                ? "0px 4px 30px rgba(0, 0, 0, 0.4)"
                : "0px 4px 30px rgba(30, 41, 59, 0.04)", // Едва заметная дорогая тень
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

// Хук для удобного использования в компонентах
// export const useAppTheme = () => useContext(ThemeContext);

/*
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  //useMediaQuery
} from "@mui/material";

export const ThemeContext = createContext(undefined);

export default function ThemeRegistry({ children, initialMode }) {
  // const systemPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  //const [mode, setMode] = useState("light");
  const [mode, setMode] = useState(initialMode);

  const toggleTheme = () => {
    setMode(prev => {
      const newMode = prev === "light" ? "dark" : "light";
      //localStorage.setItem("theme-mode", newMode);
      document.cookie =
      `theme-mode=${newMode}; path=/; max-age=31536000`;
      return newMode;
    });
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#1E75FF"
      },
      secondary: {
        main: "#9c27b0"
      },
      background: {
        default: mode === "dark" ? "#0a0a0a" : "#f5f5f5"
      }
    },
    typography: {
      fontFamily: "Inter, system-ui, Arial, sans-serif"
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8
          }
        }
      }
    }
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

*/
