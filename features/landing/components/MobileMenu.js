"use client";

import Link from "next/link";
import {
	Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeMode } from "@/hooks/useThemeMode";
import { alpha } from "@mui/material/styles";

import { navigation } from "../data/navigation";

export default function MobileMenu({ open, onClose }) {
  const { toggleTheme,mode } = useThemeMode();
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      //PaperProps={{
      //     sx: {
      //       backgroundColor: (theme) => alpha(theme.palette.background.default, 0.6),
      //       backdropFilter: 'blur(15px)',
      //       WebkitBackdropFilter: 'blur(15px)',
      //     },
      //   }}
    >
      <List
        sx={{
          width: 260
          //bgcolor: theme => alpha(theme.palette.background.default, 0.15)
        }}
      >
        {navigation.map(item => (
          <ListItemButton
            key={item.href}
            component={Link}
            href={item.href}
            onClick={onClose}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}

        <Divider />

        <ListItemButton component={Link} href="/dashboard">
          <ListItemText primary="Войти" />
        </ListItemButton>

        <ListItemButton component={Link} href="/register">
          <ListItemText primary="Регистрация" />
        </ListItemButton>
      </List>
      <Box sx={{p:2}}>
      	
      <IconButton onClick={toggleTheme} color="inherit" sx={{width: 28}}>
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      </Box>
    </Drawer>
  );
}
