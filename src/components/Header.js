"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  const navLinks = [
    { label: "Startup", href: "/category/startup" },
    { label: "Cyber", href: "/category/cyber" },
    { label: "Crime", href: "/category/crime" },
  ];

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/" passHref legacyBehavior>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Rajdhani, sans-serif",
              fontWeight: "bold",
              color: "#fff",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Feed
            <Box component="span" sx={{ color: "red", display: "inline" }}>
              AV
            </Box>
            ana
          </Typography>
        </Link>

        {/* Desktop Nav */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {navLinks.map((link) => (
            <Button
              key={link.href}
              component={Link}
              href={link.href}
              sx={{ color: "#fff", fontFamily: "Rajdhani" }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Hamburger Menu */}
        <IconButton
          edge="end"
          onClick={toggleDrawer}
          sx={{ display: { md: "none" }, color: "#fff" }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            background: "#111",
            height: "100%",
            color: "#fff",
            fontFamily: "Rajdhani",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <IconButton onClick={toggleDrawer} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navLinks.map((link) => (
              <ListItemButton
                key={link.href}
                component={Link}
                href={link.href}
                onClick={toggleDrawer}
                sx={{ color: "#fff" }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
