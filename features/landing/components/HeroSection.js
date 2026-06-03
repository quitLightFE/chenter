// "use client";

// import Link from "next/link";
// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   Typography,
//   alpha,
// } from "@mui/material";
// import CodePreview from './CodePreview';

// // ==================== ЦВЕТОВАЯ ПАЛИТРА ====================
// const colors = {
//   primary: "#0D3B66",
//   secondary: "#1E40AF",
//   accent: "#00F5D4",
//   highlight: "#E0F2FE",
//   button: "#A075F7",
//   gradientStart: "#0D3B66",
//   gradientEnd: "#1E40AF",
// };

// export default function HeroSection() {
//   return (
//     <Box
//       sx={{
//         background: `linear-gradient(135deg, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
//         color: "white",
//         py: { xs: 10, md: 16 },
//         position: "relative",
//         overflow: "hidden",
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           top: "-50%",
//           right: "-20%",
//           width: "500px",
//           height: "500px",
//           borderRadius: "50%",
//           backgroundColor: alpha("#fff", 0.08),
//           pointerEvents: "none",
//         },
//       }}
//     >
//       <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
//         <Grid
//           container
//           spacing={{ xs: 4, md: 8 }}
//           sx={{
//           	alignItems: 'center',
//           }}
//         >
//           <Grid size={{ xs: 12, md: 6 }}>
//             <Typography
//               variant="h1"
//               sx={{
//                 fontWeight: 900,
//                 mb: 2,
//                 lineHeight: 1.15,
//                 fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
//                 letterSpacing: "-0.5px",
//               }}
//             >
//               Добро пожаловать в{" "}
//               <Box
//                 component="span"
//                 sx={{
//                   background: `linear-gradient(120deg, ${colors.button} 0%, #ffffff 100%)`,
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontWeight: 950,
//                 }}
//               >
//                 EduHub
//               </Box>
//             </Typography>

//             <Typography
//               variant="h5"
//               sx={{
//                 mb: 5,
//                 opacity: 0.95,
//                 fontSize: { xs: "1rem", md: "1.25rem" },
//                 fontWeight: 300,
//                 lineHeight: 1.6,
//                 color: alpha("#fff", 0.9),
//               }}
//             >
//               Современная платформа для обучения, управления курсами, заданиями и студентами
//             </Typography>

//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 gap: 2,
//               }}
//             >
//               <Button
//                 component={Link}
//                 href="/register"
//                 variant="contained"
//                 size="large"
//                 sx={{
//                   px: 6,
//                   py: 2,
//                   borderRadius: 3,
//                   fontSize: "1.1rem",
//                   fontWeight: 600,
//                   textTransform: "none",
//                   background: `linear-gradient(135deg, ${colors.button} 0%, ${colors.button} 100%)`,
//                   color: colors.primary,
//                   boxShadow: "0 10px 30px rgba(234, 179, 8, 0.3)",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     transform: "translateY(-3px)",
//                     boxShadow: "0 15px 40px rgba(234, 179, 8, 0.4)",
//                   },
//                 }}
//               >
//                 Начать бесплатно
//               </Button>

//               <Button
//                 component={Link}
//                 href="/dashboard"
//                 variant="outlined"
//                 size="large"
//                 sx={{
//                   px: 6,
//                   py: 2,
//                   borderRadius: 3,
//                   fontSize: "1.1rem",
//                   fontWeight: 600,
//                   textTransform: "none",
//                   color: "white",
//                   borderColor: alpha("#fff", 0.7),
//                   borderWidth: 2,
//                   "&:hover": {
//                     borderColor: "white",
//                     backgroundColor: alpha("#fff", 0.1),
//                   },
//                 }}
//               >
//                 Войти
//               </Button>
//             </Box>
//           </Grid>

//           <Grid size={{ xs: 12, md: 6 }}>
//             {/*<Box
//               component="img"
//               src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200"
//               alt="Students"
//               sx={{
//                 width: "100%",
//                 height: { xs: 300, md: 500 },
//                 objectFit: "cover",
//                 borderRadius: 4,
//                 boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
//                 animation: "float 3s ease-in-out infinite",
//                 "@keyframes float": {
//                   "0%, 100%": { transform: "translateY(0px)" },
//                   "50%": { transform: "translateY(-12px)" },
//                 },
//               }}
//             />*/}
//             <CodePreview />
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

"use client"

import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
// import Grid from '@mui/material/Grid2'; // Используем современный Grid2
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
              {/*<Box
                component="span"
                sx={{
                  background: `linear-gradient(120deg, ${"gold"} 0%, #ffffff 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 950
                }}
              >
                EduHub
              </Box>*/}
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
