// "use client";

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// export const ThemeContext = createContext(undefined);
// import { useThemeMode } from "../hooks/useThemeMode";
// export default function ThemeRegistry({ children }) {
//   const [mode, setMode] = useState("light");

//   // Загрузка сохранённой темы + системные настройки
//   useEffect(() => {
//     const savedMode = localStorage.getItem("theme-mode");
//     const prefersDark = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;

//     if (savedMode) {
//       setMode(savedMode);
//     } else {
//       setMode(prefersDark ? "dark" : "light");
//     }
//   }, []);

//   // Сохранение в localStorage
//   useEffect(() => {
//     localStorage.setItem("theme-mode", mode);
//   }, [mode]);

//   const toggleTheme = () => {
//     setMode(prev => (prev === "light" ? "dark" : "light"));
//   };

//   const theme = createTheme({
//     palette: {
//       mode,
//       primary: {
//         // main: '#1976d2',
//         // main: '#1d4ed8',
//         main: "#1E75FF"
//       },
//       secondary: {
//         main: "#9c27b0"
//       },
//       background: {
//         default: mode === "dark" ? "#0a0a0a" : "#f5f5f5"
//       }
//     },
//     typography: {
//       fontFamily: "Inter, system-ui, Arial, sans-serif"
//     },
//     components: {
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             textTransform: "none",
//             borderRadius: 8
//           }
//         }
//       }
//     }
//   });

//   return (
//     <ThemeContext.Provider value={{ mode, toggleTheme, setMode }}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         {children}
//       </ThemeProvider>
//     </ThemeContext.Provider>
//   );
// }

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

  // Этот useEffect срабатывает только один раз после монтирования
  //useEffect(() => {
  //  const savedMode = localStorage.getItem("theme-mode");

  //  const initialMode = savedMode;

  //  setMode(initialMode);
  //}, []);

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
