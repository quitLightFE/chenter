import React from "react";

const DRAWER_WIDTH = 280;

export default function useLayout() {
  const layout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { mode } = useThemeMode();

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const handleMenuOpen = e => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            ml: { sm: `${DRAWER_WIDTH}px` },
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
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  Обзор
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Добро пожаловать, Иван Петров
                </Typography>
              </Box>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton color="inherit">
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <IconButton color="inherit" onClick={handleMenuOpen}>
                <Avatar
                  src="https://i.pravatar.cc/150?img=12"
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <SettingsIcon sx={{ mr: 1 }} fontSize="small" /> Настройки
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <LogoutIcon sx={{ mr: 1 }} fontSize="small" /> Выход
                </MenuItem>
              </Menu>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Box
          component="nav"
          sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        >
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
            <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
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
            <Sidebar />
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
            background:
              mode === "dark"
                ? "linear-gradient(135deg, #0f172a 0%, #1e2937 100%)"
                : "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
            minHeight: "100vh"
          }}
        >
          {/* Stats Cards */}
          {/*<StatsCards />*/}
          {/* Content Grid */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 7 }}>{/*<RecentActivity />*/}</Grid>
            <Grid size={{ xs: 12, md: 5 }}>{/*<StudentStats />*/}</Grid>
          </Grid>
        </Box>
      </Box>
    );
  };
  return layout;
}
