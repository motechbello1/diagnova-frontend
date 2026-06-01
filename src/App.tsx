import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AssessmentPage from './pages/AssessmentPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6C63FF' },
    secondary: { main: '#FF6584' },
    background: { default: '#0F0E17', paper: '#1A1A2E' },
  },
  typography: { fontFamily: '"Inter","Roboto",sans-serif' },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 10, textTransform: 'none' as const, fontWeight: 600, padding: '10px 24px' } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 16, backgroundImage: 'none', border: '1px solid rgba(108,99,255,0.15)' } } },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/assess" element={<AssessmentPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Box>
          <Box sx={{ py: 3, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', color: 'text.secondary', fontSize: 14 }}>
            DiagNova v1.0 — Sadiq Hayatu Abubakar — Skyline University Nigeria
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
export default App;
