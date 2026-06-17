"use client";

import { useState } from "react";
import {
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from "@mui/icons-material";

import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";

import Notifications from "@mui/icons-material/Notifications";

import { useThemeMode } from "@/hooks/useThemeMode";

export default function UserMenu({ user, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { mode, toggleTheme } = useThemeMode();
  const handleMenuOpen = e => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
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

        <MenuItem
          onClick={() => {
            handleMenuClose();
            onLogout();
          }}
        >
          <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
          Выход
        </MenuItem>
        {isMobile && (
          <>
            <MenuItem onClick={toggleTheme}>
              {mode === "dark" ? (
                <LightMode sx={{ mr: 1 }} fontSize="small" />
              ) : (
                <DarkMode sx={{ mr: 1 }} fontSize="small" />
              )}
              Смена темы
            </MenuItem>
            <MenuItem>
              <Badge badgeContent={3} color="error">
                <Notifications sx={{ mr: 1 }} fontSize="small" />
              {/*<Notifications sx={{ mr: 1 }} fontSize="small" />*/}
              Уведомления
              </Badge>
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
}
