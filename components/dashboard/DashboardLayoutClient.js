'use client';

import { useState, useEffect } from "react";
import {
  Box, AppBar, Toolbar, IconButton, Typography, Badge, Menu, MenuItem, Avatar, Drawer
} from "@mui/material";

import { Menu as MenuIcon, Notifications as NotificationsIcon, Settings as SettingsIcon, Logout as LogoutIcon } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useThemeMode } from "@/hooks/useThemeMode";
import { redirect } from "next/navigation";
import pb from "@/lib/pocketbase";
import Sidebar from "@/components/dashboard/Sidebar";
import { DRAWER_WIDTH } from "@/components/dashboard/navigation";
import { useUser } from "@/hooks/useUser";
import Loader from '@/components/Loader';


export default function DashboardLayoutClient({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mounted, setMounted] = useState(false); // Флаг для предотвращения гидратации

  const { mode, toggleTheme } = useThemeMode();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  
  const user = useUser(); 

  // Запускается только на клиенте после первого рендера
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    pb.authStore.clear();
    redirect("/login");
  };

  // Пока клиент не смонтирован, возвращаем пустой контейнер или скелетон,
  // чтобы серверная разметка совпала с первоначальной клиентской
  if (!mounted) {
    return <Loader />;
  }
  if (!user) {
    redirect("/login")
  }
  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          bgcolor: mode === "dark" ? "#1f2937" : "white",
          color: mode === "dark" ? "white" : "#1f2937",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Box>
              <Typography variant="h6" fontWeight={700}>
                Dashboard
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Добро пожаловать, {user?.name}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          	<IconButton onClick={toggleTheme} color="inherit">
  {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
</IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton onClick={handleMenuOpen}>
              <Avatar src={user?.thumb ?? ""} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <SettingsIcon sx={{ mr: 1 }} fontSize="small" />
                Настройки
              </MenuItem>

              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
                Выход
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { md: DRAWER_WIDTH },
          flexShrink: { md: 0 },
        }}
      >
        {/* Mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              bgcolor: "#1f2937",
              color: "white",
            },
          }}
        >
          <Sidebar
            user={user}
            onClose={() => setMobileOpen(false)}
          />
        </Drawer>

        {/* Desktop */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              bgcolor: "#1f2937",
              color: "white",
              borderRight: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        >
          <Sidebar user={user} />
        </Drawer>
      </Box>

      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          py: { xs: 8, sm: 10, md: 11 },
          px: { xs: 2, sm: 4, md: 5 },
          //pt: 8,
          minHeight: "100dvh",
          background:
            mode === "dark"
              ? "linear-gradient(135deg, #0f172a 0%, #1e2937 100%)"
              : "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}