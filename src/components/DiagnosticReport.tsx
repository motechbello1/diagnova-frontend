import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Chip, LinearProgress, Paper } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

interface Props { result: any; }
const COLORS = ['#6C63FF', '#00D9A6', '#FFB347', '#FF6584'];

const DiagnosticReport: React.FC<Props> = ({ result }) => {
  const score = result.composite_score || 0;
  const getColor = (s: number) => s >= 80 ? '#00D9A6' : s >= 60 ? '#FFB347' : '#FF6584';
  const getLabel = (s: number) => s >= 80 ? 'Excellent' : s >= 60 ? 'Good' : s >= 40 ? 'Fair' : 'Poor';
  const getSevIcon = (sev: string) => {
    if (sev === 'critical') return <ErrorIcon sx={{ color: '#FF6584' }} />;
    if (sev === 'high') return <WarningIcon sx={{ color: '#FFB347' }} />;
    if (sev === 'medium') return <InfoIcon sx={{ color: '#6C63FF' }} />;
    return <CheckCircleIcon sx={{ color: '#00D9A6' }} />;
  };
  const pieData = [
    { name: 'Performance', value: result.dimensions?.performance || 0 },
    { name: 'Stability', value: result.dimensions?.stability || 0 },
    { name: 'Usability', value: result.dimensions?.usability || 0 },
    { name: 'Fault Tolerance', value: result.dimensions?.fault_tolerance || 0 },
  ];
  return (
    <Box>
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(255,101,132,0.1))', textAlign: 'center', py: 4 }}>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>{result.app_name} ({result.platform})</Typography>
        <Box sx={{ my: 2 }}>
          <Box sx={{ width: 160, height: 160, borderRadius: '50%', border: `6px solid ${getColor(score)}`, display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h2" sx={{ color: getColor(score), fontWeight: 800, lineHeight: 1 }}>{score}</Typography>
            <Typography variant="caption" sx={{ color: getColor(score), fontWeight: 600, fontSize: 14 }}>{getLabel(score)}</Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Composite Reliability Score</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{result.rules_fired} rules evaluated</Typography>
      </Card>
      <Grid container spacing={3}>
        <Grid size={{xs:12, md:6}}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Dimension Breakdown</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={4} label={({ value }: any) => `${value.toFixed(0)}`}>
                    {pieData.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Dimension Scores</Typography>
              {Object.entries(result.dimensions || {}).map(([key, value]: [string, any], i: number) => (
                <Box key={key} sx={{ mb: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: COLORS[i] }} />
                      <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>{key.replace('_', ' ')}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: getColor(value) }}>{value?.toFixed(1)}/100</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={Math.min(value, 100)} sx={{ height: 10, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.05)', '& .MuiLinearProgress-bar': { borderRadius: 5, background: `linear-gradient(90deg, ${COLORS[i]}, ${COLORS[(i+1)%COLORS.length]})` } }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        {result.issues?.length > 0 && (
          <Grid size={{xs:12}}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Issues Found ({result.issues.length})</Typography>
                {result.issues.map((issue: any, i: number) => (
                  <Paper key={i} sx={{ p: 2, mb: 1.5, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {getSevIcon(issue.severity)}
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{issue.issue}</Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Chip label={issue.dimension} size="small" sx={{ fontSize: 11, height: 22 }} />
                          <Chip label={issue.severity} size="small" color={issue.severity === 'critical' ? 'error' : 'warning'} sx={{ fontSize: 11, height: 22 }} />
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>
        )}
        {result.recommendations?.length > 0 && (
          <Grid size={{xs:12}}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Recommendations</Typography>
                {result.recommendations.slice(0, 8).map((rec: string, i: number) => (
                  <Box key={i} sx={{ display: 'flex', gap: 2, py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <Chip label={i + 1} size="small" sx={{ background: 'rgba(108,99,255,0.2)', color: '#6C63FF', fontWeight: 700, minWidth: 28 }} />
                    <Typography variant="body2">{rec}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
export default DiagnosticReport;
