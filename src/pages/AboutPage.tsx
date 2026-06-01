import React from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, Chip } from '@mui/material';

const AboutPage: React.FC = () => (
  <Container maxWidth="lg">
    <Box sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>About DiagNova</Typography>
      <Grid container spacing={3}>
        <Grid size={{xs:12, md:6}}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Research Project</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>DiagNova is a rule-based expert system for assessing mobile application reliability, developed as a BSc Software Engineering final year project at Skyline University Nigeria.</Typography>
              <Typography variant="body2"><strong>Student:</strong> Sadiq Hayatu Abubakar (ID: 2042)</Typography>
              <Typography variant="body2"><strong>Supervisor:</strong> Dr. A. O. Adeleke</Typography>
              <Typography variant="body2"><strong>Program:</strong> BSc Software Engineering</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Technical Stack</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {['Python 3.11', 'Flask', 'React 18', 'TypeScript', 'Material-UI', 'Recharts', 'Vercel', 'Render'].map((t: string) => (
                  <Chip key={t} label={t} variant="outlined" size="small" sx={{ borderColor: 'rgba(108,99,255,0.3)' }} />
                ))}
              </Box>
              <Typography variant="body2" sx={{ mt: 2 }}>247 production rules based on 50 peer-reviewed papers (2020-2025).</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </Container>
);
export default AboutPage;
