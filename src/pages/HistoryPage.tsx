import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';

const HistoryPage: React.FC = () => (
  <Container maxWidth="lg">
    <Box sx={{ py: 6, textAlign: 'center' }}>
      <HistoryIcon sx={{ fontSize: 64, color: 'rgba(108,99,255,0.3)', mb: 2 }} />
      <Typography variant="h4" gutterBottom sx={{fontWeight:700}}>Assessment History</Typography>
      <Typography variant="body1" color="text.secondary">Previous assessments will appear here once you run your first analysis.</Typography>
    </Box>
  </Container>
);

export default HistoryPage;

