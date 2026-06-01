import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Assess', path: '/assess' },
  { label: 'History', path: '/history' },
  { label: 'About', path: '/about' },
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
            <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, #6C63FF, #FF6584)', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1.5, fontWeight: 800, fontSize: 18, color: '#fff' }}>D</Box>
            <Typography variant="h6" component={RouterLink} to="/" sx={{ fontWeight: 800, color: '#fff', textDecoration: 'none', flexGrow: 1 }}>DiagNova</Typography>
            {isMobile ? (
              <IconButton color="inherit" onClick={() => setMobileOpen(true)}><MenuIcon /></IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {navItems.map((item) => (
                  <Button key={item.path} component={RouterLink} to={item.path}
                    sx={{ color: location.pathname === item.path ? '#6C63FF' : 'rgba(255,255,255,0.7)', fontWeight: location.pathname === item.path ? 700 : 500 }}>
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)} slotProps={{ paper: { sx: { background: '#1A1A2E', width: 260 } } } as any}>
        <List sx={{ pt: 4 }}>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton component={RouterLink} to={item.path} onClick={() => setMobileOpen(false)} selected={location.pathname === item.path}>
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
