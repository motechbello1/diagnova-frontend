import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';

const navItems = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { label: 'Assess', path: '/assess', icon: <BugReportIcon /> },
  { label: 'History', path: '/history', icon: <HistoryIcon /> },
  { label: 'About', path: '/about', icon: <InfoIcon /> },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <AppBar position="sticky" sx={{ background: 'rgba(15,14,23,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(108,99,255,0.2)' }} elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, #6C63FF, #FF6584)', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1.5, fontWeight: 800, fontSize: 18, color: '#fff' }}>D</Box>
              <Typography variant="h6" component={RouterLink} to="/" sx={{ fontWeight: 800, color: '#fff', textDecoration: 'none', letterSpacing: '-0.5px' }}>
                DiagNova
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            {isMobile ? (
              <IconButton color="inherit" onClick={() => setMobileOpen(true)}><MenuIcon /></IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {navItems.map((item) => (
                  <Button key={item.path} component={RouterLink} to={item.path} startIcon={item.icon}
                    sx={{ color: location.pathname === item.path ? '#6C63FF' : 'rgba(255,255,255,0.7)', fontWeight: location.pathname === item.path ? 700 : 500, '&:hover': { color: '#6C63FF', background: 'rgba(108,99,255,0.08)' } }}>
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)} PaperProps={{ sx: { background: '#1A1A2E', width: 260 } }}>
        <List sx={{ pt: 4 }}>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton component={RouterLink} to={item.path} onClick={() => setMobileOpen(false)}
                selected={location.pathname === item.path}
                sx={{ '&.Mui-selected': { background: 'rgba(108,99,255,0.15)' } }}>
                <ListItemIcon sx={{ color: location.pathname === item.path ? '#6C63FF' : 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
