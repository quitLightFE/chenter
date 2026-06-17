"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import { useThemeMode } from "@/hooks/useThemeMode";
import { useUser } from "@/hooks/useUser";
import pb from "@/lib/pocketbase";

import Header from "@/components/dashboard/Header";
import NavigationWrapper from "@/components/dashboard/NavigationWrapper";
import Loader from "@/components/Loader";
import { DRAWER_WIDTH } from "@/components/dashboard/navigation";

export default function DashboardLayoutClient({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { mode, toggleTheme } = useThemeMode();
  const user = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    pb.authStore.clear();
    redirect("/login");
  };

  if (!mounted) {
    return <Loader />;
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh", flexDirection: "column" }}>
      {/* Шапка */}
      <Header
        user={user}
        onLogout={handleLogout}
        buttonAction={handleDrawerToggle}
        navbar={true}
      />

      {/* Боковое меню */}
      <NavigationWrapper
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
        user={user}
      />

      {/* Основной контент */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          //py: { xs: 8, sm: 10, md: 11 },
          p: { xs: 2, sm: 3, md: 4 },
          ml: { md: `${DRAWER_WIDTH}px` },
          //minHeight: "100dvh",
          //background:
          //  mode === "dark"
          //    ? "linear-gradient(135deg, #0f172a 0%, #1e2937 100%)"
          //    : "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
          
          //bgcolor: "background.paper" 
          bgcolor: "education.decorBg" 
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
