// 'use client';

// import React, { useState, useEffect } from "react";

// import {
//   Box,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Badge,
//   Menu,
//   MenuItem,
//   CircularProgress,
//   Avatar,
//   Drawer,
// } from "@mui/material";

// import {
//   Menu as MenuIcon,
//   Notifications as NotificationsIcon,
//   Settings as SettingsIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";

// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";

// import { useThemeMode } from "@/hooks/useThemeMode";
// import { useRouter } from "next/navigation";

// import pb from "@/lib/pocketbase";

// import Sidebar from "@/components/dashboard/Sidebar";
// import { DRAWER_WIDTH } from "@/components/dashboard/navigation";

// import { getCurrentUser } from "@/services"

// import Loader from '@/components/Loader';

// export default function DashboardLayout({ children }) {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false)

//   const { mode, toggleTheme } = useThemeMode();
//   const router = useRouter();

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleMenuOpen = (e) => {
//     setAnchorEl(e.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   useEffect(() => {
//   	setLoading(true)
//     const currentUser = getCurrentUser();

//     if (!currentUser) {
//       router.replace("/login");
//       return;
//     }

//     setUser(currentUser);
//     setLoading(false)
//   }, [router]);

//   const handleLogout = () => {
//     pb.authStore.clear();
//     router.replace("/login");
//   };

//   if (loading) {
//     return (
//       <Loader text="Проверка авторизации..."/>
//     );
//   }

//   return (
//     <Box sx={{ display: "flex", minHeight: "100dvh" }}>
//       {/* AppBar */}
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
//           ml: { md: `${DRAWER_WIDTH}px` },
//           bgcolor: mode === "dark" ? "#1f2937" : "white",
//           color: mode === "dark" ? "white" : "#1f2937",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         }}
//       >
//         <Toolbar sx={{ justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <IconButton
//               color="inherit"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ display: { md: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>

//             <Box>
//               <Typography variant="h6" fontWeight={700}>
//                 Dashboard
//               </Typography>

//               <Typography variant="body2" color="text.secondary">
//                 Добро пожаловать, {user.name}
//               </Typography>
//             </Box>
//           </Box>

//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           	<IconButton onClick={toggleTheme} color="inherit">
//   {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
// </IconButton>
//             <IconButton color="inherit">
//               <Badge badgeContent={3} color="error">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>

//             <IconButton onClick={handleMenuOpen}>
//               <Avatar src={user.thumb} />
//             </IconButton>

//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//             >
//               <MenuItem onClick={handleMenuClose}>
//                 <SettingsIcon sx={{ mr: 1 }} fontSize="small" />
//                 Настройки
//               </MenuItem>

//               <MenuItem onClick={handleLogout}>
//                 <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
//                 Выход
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar */}
//       <Box
//         component="nav"
//         sx={{
//           width: { md: DRAWER_WIDTH },
//           flexShrink: { md: 0 },
//         }}
//       >
//         {/* Mobile */}
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           sx={{
//             display: { xs: "block", md: "none" },
//             "& .MuiDrawer-paper": {
//               width: DRAWER_WIDTH,
//               boxSizing: "border-box",
//               bgcolor: "#1f2937",
//               color: "white",
//             },
//           }}
//         >
//           <Sidebar
//             user={user}
//             onClose={() => setMobileOpen(false)}
//           />
//         </Drawer>

//         {/* Desktop */}
//         <Drawer
//           variant="permanent"
//           open
//           sx={{
//             display: { xs: "none", md: "block" },
//             "& .MuiDrawer-paper": {
//               width: DRAWER_WIDTH,
//               boxSizing: "border-box",
//               bgcolor: "#1f2937",
//               color: "white",
//               borderRight: "1px solid rgba(255,255,255,0.1)",
//             },
//           }}
//         >
//           <Sidebar user={user} />
//         </Drawer>
//       </Box>

//       {/* Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
//           py: { xs: 8, sm: 10, md: 11 },
//           px: { xs: 2, sm: 4, md: 5 },
//           //pt: 8,
//           minHeight: "100dvh",
//           background:
//             mode === "dark"
//               ? "linear-gradient(135deg, #0f172a 0%, #1e2937 100%)"
//               : "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// }

import { redirect } from "next/navigation";
import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";

export default async function DashboardLayout({ children }) {
  //if (!user) {
  //  redirect("/login");
  //}

  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
