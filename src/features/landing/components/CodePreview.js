// "use client";
// import { Box, Typography } from "@mui/material";

// export default function CodePreview(props) {
//   return (
//     <Box {...props}>
//     	<Box
//       sx={{
//         width: "100%",
//         maxWidth: 550,
//         borderRadius: 4,
//         overflow: "hidden",
//         // bgcolor: "#0f172a",
//         bgcolor: "background.light",
//         border: "1px solid rgba(255,255,255,0.08)",
//         boxShadow: "0 5px 20px rgba(0,0,0,0.4)"
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: 1,
//           px: 2,
//           py: 1.5,
//           //bgcolor: "rgba(255,255,255,0.04)",
//           bgcolor: "background.paper",
//           borderBottom: "1px solid rgba(255,255,255,0.05)"
//         }}
//       >
//         <Box
//           sx={{
//             width: 12,
//             height: 12,
//             borderRadius: "50%",
//             bgcolor: "#ff5f56"
//           }}
//         />
//         <Box
//           sx={{
//             width: 12,
//             height: 12,
//             borderRadius: "50%",
//             bgcolor: "#ffbd2e"
//           }}
//         />
//         <Box
//           sx={{
//             width: 12,
//             height: 12,
//             borderRadius: "50%",
//             bgcolor: "#27c93f"
//           }}
//         />

//         <Typography
//           sx={{
//             ml: 2,
//             color: "#94a3b8",
//             fontSize: 13,
//             fontFamily: "monospace"
//           }}
//         >
//           app.jsx
//         </Typography>
//       </Box>

//       {/* Code */}
//       <Box
//         component="pre"
//         sx={{
//           p: 3,
//           m: 0,
//           overflow: "auto",
//           fontSize: 14,
//           lineHeight: 1.8,
//           fontFamily: "monospace",
//           color: "#e2e8f0"
//         }}
//       >
//         <Typography component="span" sx={{ color: "#c084fc" }}>
//           const
//         </Typography>{" "}
//         <Typography component="span" sx={{ color: "#60a5fa" }}>
//           student
//         </Typography>{" "}
//         = {"{"}
//         {"\n"}
//         &nbsp;&nbsp;name:{" "}
//         <Typography component="span" sx={{ color: "#34d399" }}>
//           "Alex"
//         </Typography>
//         ,{"\n"}
//         &nbsp;&nbsp;course:{" "}
//         <Typography component="span" sx={{ color: "#34d399" }}>
//           "Frontend"
//         </Typography>
//         ,{"\n"}
//         &nbsp;&nbsp;level:{" "}
//         <Typography component="span" sx={{ color: "#fbbf24" }}>
//           85
//         </Typography>
//         ,{"\n"}
//         {"};"}
//         {"\n\n"}
//         <Typography component="span" sx={{ color: "#c084fc" }}>
//           export default
//         </Typography>{" "}
//         <Typography component="span" sx={{ color: "#60a5fa" }}>
//           function
//         </Typography>{" "}
//         <Typography component="span" sx={{ color: "#38bdf8" }}>
//           App
//         </Typography>
//         () {"{"}
//         {"\n"}
//         &nbsp;&nbsp;
//         <Typography component="span" sx={{ color: "#c084fc" }}>
//           return
//         </Typography>{" "}
//         ({"\n"}
//         &nbsp;&nbsp;&nbsp;&nbsp;&lt;
//         <Typography component="span" sx={{ color: "#f472b6" }}>
//           Dashboard
//         </Typography>{" "}
//         user={"{"}student{"}"}/&gt;
//         {"\n"}
//         &nbsp;&nbsp;);
//         {"\n"}
//         {"}"}
//       </Box>
//     </Box>
//     </Box>
//   );
// }

"use client";
import { Box, Typography, useTheme } from "@mui/material";
import { useThemeMode } from "@/hooks/useThemeMode";

export default function CodePreview({sx,...props}) {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  // Динамическая палитра для подсветки синтаксиса в зависимости от темы
  const syntaxColors = {
    keyword: isDark ? "#c084fc" : "#d73a49", // const, export, default, return
    variable: isDark ? "#60a5fa" : "#005cc5", // student, function
    string: isDark ? "#34d399" : "#22863a", // "Alex", "Frontend"
    number: isDark ? "#fbbf24" : "#e36209", // 85
    func: isDark ? "#38bdf8" : "#6f42c1", // App
    component: isDark ? "#f472b6" : "#e36209", // Dashboard
    punctuation: isDark ? "#94a3b8" : "#24292e" // Скобки и обычный текст
  };

  return (
    <Box
      {...props}
      sx={{
        width: "100%",
        maxWidth: 550,
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: isDark ? "background.paper" : "#f6f8fa", // Чистый фон редактора
        border: theme => `1px solid ${theme.palette.divider}`,
        boxShadow: isDark
          ? "0 10px 30px rgba(0,0,0,0.5)"
          : "0 10px 30px rgba(0,0,0,0.08)",
        ...sx // Позволяет переопределять стили извне
      }}
    >
      {/* Шапка окна редактора */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1.5,
          bgcolor: isDark ? "rgba(255,255,255,0.02)" : "#eaeef2",
          borderBottom: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        {/* Кнопки управления macOS */}
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            bgcolor: "#ff5f56"
          }}
        />
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            bgcolor: "#ffbd2e"
          }}
        />
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            bgcolor: "#27c93f"
          }}
        />

        <Typography
          sx={{
            ml: 2,
            color: "text.secondary",
            fontSize: 13,
            fontFamily: "monospace",
            fontWeight: 500
          }}
        >
          app.jsx
        </Typography>
      </Box>

      {/* Окно вывода кода */}
      <Box
        component="pre"
        sx={{
          p: 3,
          m: 0,
          overflow: "auto",
          fontSize: 14,
          lineHeight: 1.8,
          fontFamily: "monospace",
          color: syntaxColors.punctuation
        }}
      >
        <Typography
          component="span"
          sx={{ color: syntaxColors.keyword, fontFamily: "inherit" }}
        >
          const
        </Typography>{" "}
        <Typography
          component="span"
          sx={{ color: syntaxColors.variable, fontFamily: "inherit" }}
        >
          student
        </Typography>{" "}
        = {"{"}
        {"\n"}
        &nbsp;&nbsp;name:{" "}
        <Typography
          component="span"
          sx={{ color: syntaxColors.string, fontFamily: "inherit" }}
        >
          "Alex"
        </Typography>
        ,{"\n"}
        &nbsp;&nbsp;course:{" "}
        <Typography
          component="span"
          sx={{ color: syntaxColors.string, fontFamily: "inherit" }}
        >
          "Frontend"
        </Typography>
        ,{"\n"}
        &nbsp;&nbsp;level:{" "}
        <Typography
          component="span"
          sx={{ color: syntaxColors.number, fontFamily: "inherit" }}
        >
          85
        </Typography>
        ,{"\n"}
        {"};"}
        {"\n\n"}
        <Typography
          component="span"
          sx={{ color: syntaxColors.keyword, fontFamily: "inherit" }}
        >
          export default
        </Typography>{" "}
        <Typography
          component="span"
          sx={{ color: syntaxColors.variable, fontFamily: "inherit" }}
        >
          function
        </Typography>{" "}
        <Typography
          component="span"
          sx={{ color: syntaxColors.func, fontFamily: "inherit" }}
        >
          App
        </Typography>
        () {"{"}
        {"\n"}
        &nbsp;&nbsp;
        <Typography
          component="span"
          sx={{ color: syntaxColors.keyword, fontFamily: "inherit" }}
        >
          return
        </Typography>{" "}
        ({"\n"}
        &nbsp;&nbsp;&nbsp;&nbsp;&lt;
        <Typography
          component="span"
          sx={{ color: syntaxColors.component, fontFamily: "inherit" }}
        >
          Dashboard
        </Typography>{" "}
        user={"{"}student{"}"}/&gt;
        {"\n"}
        &nbsp;&nbsp;);
        {"\n"}
        {"}"}
      </Box>
    </Box>
  );
}
