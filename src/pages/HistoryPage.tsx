import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, Chip, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DiagnosticReport from '../components/DiagnosticReport';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('diagnova_history') || '[]');
    setHistory(saved);
  }, []);

  const getColor = (s: number) => s >= 80 ? '#00D9A6' : s >= 60 ? '#FFB347' : '#FF6584';
  const getLabel = (s: number) => s >= 80 ? 'Excellent' : s >= 60 ? 'Good' : s >= 40 ? 'Fair' : 'Poor';

  const deleteOne = (id: number) => {
    const updated = history.filter((h: any) => h.id !== id);
    setHistory(updated);
    localStorage.setItem('diagnova_history', JSON.stringify(updated));
  };

  const clearAll = () => {
    setHistory([]);
    localStorage.removeItem('diagnova_history');
  };

  const viewResult = (item: any) => {
    setSelectedResult(item);
    setDialogOpen(true);
  };

  if (history.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 6, textAlign: 'center' }}>
          <HistoryIcon sx={{ fontSize: 64, color: 'rgba(108,99,255,0.3)', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Assessment History</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>No assessments yet. Go to Assess to run your first analysis.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>Assessment History</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>{history.length} assessment{history.length !== 1 ? 's' : ''} recorded</Typography>
          </Box>
          <Button variant="outlined" color="error" startIcon={<DeleteSweepIcon />} onClick={clearAll} size="small">Clear All</Button>
        </Box>

        <Grid container spacing={2}>
          {history.map((item: any) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={item.id}>
              <Card sx={{ transition: 'all 0.2s', '&:hover': { transform: 'translateY(-4px)', borderColor: getColor(item.composite_score) } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.app_name}</Typography>
                      <Chip label={item.platform} size="small" sx={{ mt: 0.5, fontSize: 11, height: 22 }} />
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: getColor(item.composite_score), lineHeight: 1 }}>{item.composite_score}</Typography>
                      <Typography variant="caption" sx={{ color: getColor(item.composite_score), fontWeight: 600 }}>{getLabel(item.composite_score)}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    {Object.entries(item.dimensions || {}).map(([key, val]: [string, any]) => (
                      <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.3 }}>
                        <Typography variant="caption" sx={{ textTransform: 'capitalize', color: 'text.secondary' }}>{key.replace('_', ' ')}</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: getColor(val) }}>{val?.toFixed(1)}</Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', pt: 1.5 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {new Date(item.assessed_at).toLocaleDateString()} {new Date(item.assessed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                    <Box>
                      <IconButton size="small" onClick={() => viewResult(item)} sx={{ color: '#6C63FF' }}><VisibilityIcon fontSize="small" /></IconButton>
                      <IconButton size="small" onClick={() => deleteOne(item.id)} sx={{ color: '#FF6584' }}><DeleteIcon fontSize="small" /></IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="lg" fullWidth
        slotProps={{ paper: { sx: { background: '#0F0E17', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 3 } } } as any}>
        <DialogTitle sx={{ fontWeight: 700 }}>Assessment: {selectedResult?.app_name}</DialogTitle>
        <DialogContent>
          {selectedResult && <DiagnosticReport result={selectedResult} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default HistoryPage;
