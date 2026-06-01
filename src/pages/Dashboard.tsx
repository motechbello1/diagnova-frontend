import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ShieldIcon from '@mui/icons-material/Shield';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const dims = [
  { icon: <SpeedIcon sx={{ fontSize: 40 }} />, title: 'Performance', desc: 'Startup, memory, FPS, battery', color: '#6C63FF', count: 89 },
  { icon: <SecurityIcon sx={{ fontSize: 40 }} />, title: 'Stability', desc: 'Crashes, ANR, error handling', color: '#00D9A6', count: 72 },
  { icon: <TouchAppIcon sx={{ fontSize: 40 }} />, title: 'Usability', desc: 'Complexity, navigation, a11y', color: '#FFB347', count: 51 },
  { icon: <ShieldIcon sx={{ fontSize: 40 }} />, title: 'Fault Tolerance', desc: 'Recovery, offline, state', color: '#FF6584', count: 35 },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box sx={{ background: 'linear-gradient(180deg, rgba(108,99,255,0.08) 0%, transparent 100%)', py: 10 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Chip label="v1.0 — Rule-Based Expert System" sx={{ mb: 3, background: 'rgba(108,99,255,0.15)', color: '#6C63FF', fontWeight: 600 }} />
          <Typography variant="h2" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #6C63FF, #FF6584)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>DiagNova</Typography>
          <Typography variant="h5" sx={{ color: 'text.secondary', mb: 3, fontWeight: 400 }}>Intelligent Mobile App Reliability Assessment</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', mb: 4, lineHeight: 1.8 }}>
            Powered by 247 production rules across Performance, Stability, Usability, and Fault Tolerance — based on 50 peer-reviewed papers (2020-2025).
          </Typography>
          <Button variant="contained" size="large" startIcon={<RocketLaunchIcon />} onClick={() => navigate('/assess')} sx={{ background: 'linear-gradient(135deg, #6C63FF, #FF6584)', px: 5, py: 1.5, fontSize: 16 }}>Start Assessment</Button>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 5 }}>Four Reliability Dimensions</Typography>
        <Grid container spacing={3}>
          {dims.map((d, i) => (
            <Grid size={{xs:12, sm:6, md:3}} key={i}>
              <Card sx={{ textAlign: 'center', py: 4, px: 2, transition: 'all 0.3s', '&:hover': { transform: 'translateY(-8px)', borderColor: d.color } }}>
                <Box sx={{ color: d.color, mb: 2 }}>{d.icon}</Box>
                <CardContent sx={{ p: '0 !important' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{d.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, mb: 2 }}>{d.desc}</Typography>
                  <Chip label={d.count + ' rules'} size="small" sx={{ background: d.color + '22', color: d.color, fontWeight: 600 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
export default Dashboard;
