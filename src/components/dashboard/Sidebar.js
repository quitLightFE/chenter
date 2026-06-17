"use client";

import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar
} from "@mui/material";

import { useThemeMode } from "@/hooks/useThemeMode";
import { navigationItems } from "@/components/dashboard/navigation";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import {iconMap} from "@/components/dashboard/navigation";
import Link from "next/link";

const Sidebar = () => {
  const { mode } = useThemeMode();
  const pathName = usePathname();

  const user = useUser();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      {/* Logo */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Typography
        component={Link}
          variant="h6"
          href="/"
          fontWeight={700}
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "1.45rem",
            textDecoration:"none"
          }}
        >
          EduHub
        </Typography>
      </Box>

      <Divider />

      {/* Навигация */}
      <List sx={{ px: 2, py: 3, flexGrow: 1 }}>
        {navigationItems.map((item, idx) => (
          <ListItem key={idx} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={pathName.includes(item.href)}
              sx={{
                borderRadius: 2,
                py: 1.5,
                "&.Mui-selected": {
                  bgcolor:
                    mode === "dark"
                      ? "rgba(102, 126, 234, 0.25)"
                      : "rgba(102, 126, 234, 0.12)",
                  "& > a, & svg": {
                    color: "#667eea"
                  }
                },
                "&:hover": {
                  bgcolor:
                    mode === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.04)"
                }
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {iconMap[item.icon]}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                component={Link}
                href={item.href}
                sx={{
                  textDecoration: "none",
                  color: "#ffffff"
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Пользователь внизу
      <Box sx={{ mt: "auto", p: 2 }}>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", mb: 2 }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "#3b82f6" }} src={user?.avatar ?? ""} />
          <Box sx={{ minWidth: 0 }}>
            <Typography fontWeight={600} sx={{ color: "white" }}>
              {user?.name ?? "Пользователь"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#94a3b8", textTransform: "capitalize" }}
            >
              {user?.role ?? "role"}
            </Typography>
          </Box>
        </Box>
      </Box>*/}

      {/*<Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: "rgba(255,255,255,0.05)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              width: 40,
              height: 40,
              border: "2px solid rgba(255,255,255,0.2)"
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              fontWeight={600}
              sx={{ color: "white", fontSize: "0.9rem" }}
            >
              {user.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.6)",
                textTransform: "capitalize",
                fontSize: "0.8rem"
              }}
            >
              {user.role}
            </Typography>
          </Box>
        </Box>
      </Box> */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: "rgba(255,255,255,0.05)",
            cursor: "pointer",
            "&:hover": {
              bgcolor:
                mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"
            }
          }}
        >
          <Avatar
            // src="https://i.pravatar.cc/150?img=12"
            src={user?.thumb}
            sx={{
              width: 42,
              height: 42,
              border: "2px solid rgba(255,255,255,0.2)"
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography fontWeight={600}>{user?.name}</Typography>
            <Typography variant="body2" sx={{color: "grey"}}>{user?.role}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
