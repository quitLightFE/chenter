import React from "react";
import { Box, CssBaseline } from "@mui/material";

const colors = {
  gradientStart: "#1e3a8a",
  gradientEnd: "#3b82f6"
};
export default function layout({ children }) {
  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          background: `linear-gradient(135deg, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
          p: 2
        }}
      >
        {children}
      </Box>
    </>
  );
}
