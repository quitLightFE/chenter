'use client';

import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Card,
  CardContent,
  CircularProgress,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Button,
  Badge,
  Menu,
  MenuItem
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { useThemeMode } from "../../hooks/useThemeMode"; // ← Подключаем нашу тему

import {useRouter} from 'next/navigation';
import pb from "../../lib/pocketbase"

const DRAWER_WIDTH = 280;

const navigationItems = [
  { label: "Обзор", icon: <DashboardIcon />, active: true },
  { label: "Курсы", icon: <SchoolIcon /> },
  { label: "Задания", icon: <AssignmentIcon /> },
  { label: "Студенты", icon: <PeopleIcon /> }
];

// ==================== SIDEBAR ====================
const Sidebar = ({ mobileOpen, onClose,user }) => {
  const { mode } = useThemeMode();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "1.45rem"
          }}
        >
          IT Academy
        </Typography>
      </Box>

      <Divider />

      {/* Навигация */}
      <List sx={{ px: 2, py: 3, flex: 1 }}>
        {navigationItems.map((item, idx) => (
          <ListItem key={idx} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={item.active}
              sx={{
                borderRadius: 2,
                py: 1.5,
                "&.Mui-selected": {
                  bgcolor: mode === 'dark' 
                    ? "rgba(102, 126, 234, 0.25)" 
                    : "rgba(102, 126, 234, 0.12)",
                  color: "#667eea",
                },
                "&:hover": {
                  bgcolor: mode === 'dark' 
                    ? "rgba(255,255,255,0.08)" 
                    : "rgba(0,0,0,0.04)"
                }
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                // primaryTypographyProps={{ fontWeight: item.active ? 600 : 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Пользователь */}
      {/*<Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: mode === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            cursor: "pointer",
            "&:hover": { bgcolor: mode === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)" }
          }}
        >
          <Avatar
            src="https://i.pravatar.cc/150?img=12"
            sx={{ width: 42, height: 42, border: "2px solid rgba(255,255,255,0.2)" }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography fontWeight={600}>Иван Петров</Typography>
            <Typography variant="body2" color="textSecondary">
              преподаватель
            </Typography>
          </Box>
        </Box>
      </Box> */}
      <Box sx={{ mt: "auto" }}>
      	<Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", mb: 2 }} />
      	<Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2
              }}
            >
              <Avatar sx={{ bgcolor: "#3b82f6" }} src={user?.avatar ?? ""} />
              <Box>
                <Typography fontWeight={600} sx={{color: "white"}}>
                  {user?.name ?? "username"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#94a3b8", textTransform: "capitalize" }}
                >
                  {user?.role ?? "role"}
                </Typography>
              </Box>
            </Box>
          </Box>
    </Box>
  );
};

// ==================== MAIN DASHBOARD ====================
const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { mode } = useThemeMode();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
  const currentUser = pb.authStore.model;
  	setUser(currentUser)
    if (!currentUser) {
      router.replace("/login");
    }
  }, [router]);


  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "100dvh",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f7fb",
          gap:3
        }}
      >
      	<CircularProgress/>
        <Typography>Проверка авторизации...</Typography>
      	
      </Box>
    );
   }
  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          bgcolor: mode === 'dark' ? '#1f2937' : 'white',
          color: mode === 'dark' ? 'white' : '#1f2937',
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <Typography variant="h6" fontWeight={700}>Обзор</Typography>
              <Typography variant="body2" color="textSecondary">
                Добро пожаловать, Иван Петров
              </Typography>
            </Box>
          </Box>

          <Box sx={{
          	display: 'flex',
          	alignItems: 'center',
          }}
          //direction="row" spacing={1} alignItems="center"
          >
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton color="inherit" onClick={handleMenuOpen}>
              <Avatar src="https://i.pravatar.cc/150?img=12" sx={{ width: 32, height: 32 }} />
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>
                <SettingsIcon sx={{ mr: 1 }} fontSize="small" /> Настройки
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <LogoutIcon sx={{ mr: 1 }} fontSize="small" /> Выход
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              bgcolor: "#1f2937",
              color: "white"
            }
          }}
        >
          <Sidebar user={user} mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              bgcolor: "#1f2937",
              color: "white",
              borderRight: "1px solid rgba(255,255,255,0.1)"
            }
          }}
        >
          <Sidebar  user={user}  />
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: 8,
          background: mode === 'dark' 
            ? "linear-gradient(135deg, #0f172a 0%, #1e2937 100%)" 
            : "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
          minHeight: "100vh"
        }}
      >
        {/* Stats Cards */}
        {/*<StatsCards />*/}
        {/* Content Grid */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            {/*<RecentActivity />*/}
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            {/*<StudentStats />*/}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;