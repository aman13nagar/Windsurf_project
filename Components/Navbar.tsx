// Components/Navbar.tsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" color="primary">
          Resume Skill Extractor
        </Typography>
        <Box>
          <Button component={RouterLink} to="/" color="inherit">
            Home
          </Button>
          <Button component={RouterLink} to="/dashboard" color="inherit">
            Dashboard
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
