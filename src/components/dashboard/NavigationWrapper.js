'use client';

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import Sidebar from "@/components/dashboard/Sidebar";
import { DRAWER_WIDTH } from "@/components/dashboard/navigation";

export default function NavigationWrapper({ mobileOpen, onDrawerToggle, user }) {
  return (
    <Box
      component="nav"
      sx={{
        width: { md: DRAWER_WIDTH },
        flexShrink: { md: 0 },
      }}
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Улучшает производительность на мобильных
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
        <Sidebar user={user} onClose={onDrawerToggle} />
      </Drawer>

      {/* Desktop Drawer */}
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
  );
}
