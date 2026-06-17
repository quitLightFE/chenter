"use client";

import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Badge
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon
} from "@mui/icons-material";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import UserMenu from "@/components/dashboard/UserMenu";
import { DRAWER_WIDTH } from "@/components/dashboard/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useThemeMode } from "@/hooks/useThemeMode";

export default function Header({
  user,
  onLogout,
  buttonAction,
  position = "sticky",
  navbar = false
}) {
  const { mode, toggleTheme } = useThemeMode();
  return (
    <AppBar
      position={position}
      sx={{
        width: { md: navbar ? `calc(100% - ${DRAWER_WIDTH}px)` : "auto" },
        ml: { md: navbar ? `${DRAWER_WIDTH}px` : "0" },
        bgcolor: mode === "dark" ? "#1f2937" : "white",
        color: mode === "dark" ? "white" : "#1f2937",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={buttonAction}
            sx={{ display: { md: navbar ? "none" : "flex" } }}
          >
            {navbar ? <MenuIcon /> : <ArrowBackIcon />}
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
          <Box sx={{ display: {xs: "none", sm: "flex"}, alignItems: "center", gap: 1 }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>

            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>

          <UserMenu user={user} onLogout={onLogout} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
