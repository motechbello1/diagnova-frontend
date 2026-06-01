import React from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, Chip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const AboutPage: React.FC = () => (
  <Container maxWidth="lg">
    <Box sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>About DiagNova</Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}><SchoolIcon sx={{ color: '#6C63FF' }} /><Typography variant="h6" fontWeight={600}>Research Project</Typography></Box>
              <Typography variant="body2" paragraph>DiagNova is a rule-based expert system for assessing mobile application reliability, developed as a BSc Software Engineering final year project at Skyline University Nigeria.</Typography>
              <Typography variant="body2"><strong>Student:</strong> Sadiq Hayatu Abubakar (ID: 2042)</Typography>
              <Typography variant="body2"><strong>Supervisor:</strong> Dr. A. O. Adeleke</Typography>
              <Typography variant="body2"><strong>Program:</strong> BSc Software Engineering</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Technical Stack</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {['Python 3.11', 'Flask', 'React 18', 'TypeScript', 'Material-UI', 'Recharts', 'PostgreSQL', 'Docker', 'Vercel', 'Render'].map(t => (
                  <Chip key={t} label={t} variant="outlined" size="small" sx={{ borderColor: 'rgba(108,99,255,0.3)' }} />
                ))}
              </Box>
              <Typography variant="body2" sx={{ mt: 2 }}>247 production rules based on 50 peer-reviewed papers (2020-2025) including Wimalasooriya et al. (2022), Berihun et al. (2023), Khoshniat et al. (2024), and Weichbroth (2024).</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export default AboutPage;
