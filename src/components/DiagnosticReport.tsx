import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Chip, LinearProgress, Divider, Paper } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

interface Props { result: any; }

const COLORS = ['#6C63FF', '#00D9A6', '#FFB347', '#FF6584'];

const DiagnosticReport: React.FC<Props> = ({ result }) => {
  const score = result.composite_score || 0;
  const getScoreColor = (s: number) => s >= 80 ? '#00D9A6' : s >= 60 ? '#FFB347' : '#FF6584';
  const getScoreLabel = (s: number) => s >= 80 ? 'Excellent' : s >= 60 ? 'Good' : s >= 40 ? 'Fair' : 'Poor';
  const getSeverityIcon = (sev: string) => {
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

  const radarData = pieData.map(d => ({ ...d, fullMark: 100 }));

  return (
    <Box>
      {/* Header Score */}
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(255,101,132,0.1))', textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>{result.app_name} ({result.platform})</Typography>
        <Box sx={{ position: 'relative', display: 'inline-flex', my: 2 }}>
          <Box sx={{ width: 160, height: 160, borderRadius: '50%', border: `6px solid ${getScoreColor(score)}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h2" sx={{ color: getScoreColor(score), fontWeight: 800, lineHeight: 1 }}>{score}</Typography>
            <Typography variant="caption" sx={{ color: getScoreColor(score), fontWeight: 600, fontSize: 14 }}>{getScoreLabel(score)}</Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">Composite Reliability Score</Typography>
        <Typography variant="caption" color="text.secondary">{result.rules_fired} rules evaluated • {result.timestamp}</Typography>
      </Card>

      <Grid container spacing={3}>
        {/* Radar Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Reliability Radar</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#aaa', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#666' }} />
                  <Radar name="Score" dataKey="value" stroke="#6C63FF" fill="#6C63FF" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Dimension Breakdown</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={4} label={({ name, value }) => `${value.toFixed(0)}`}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Dimension Bars */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Dimension Scores</Typography>
              {Object.entries(result.dimensions || {}).map(([key, value]: [string, any], i: number) => (
                <Box key={key} sx={{ mb: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: COLORS[i] }} />
                      <Typography variant="body2" fontWeight={600} sx={{ textTransform: 'capitalize' }}>{key.replace('_', ' ')}</Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={700} sx={{ color: getScoreColor(value) }}>{value?.toFixed(1)}/100</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={Math.min(value, 100)} sx={{ height: 10, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.05)', '& .MuiLinearProgress-bar': { borderRadius: 5, background: `linear-gradient(90deg, ${COLORS[i]}, ${COLORS[(i+1)%COLORS.length]})` } }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Issues */}
        {result.issues?.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>Issues Found ({result.issues.length})</Typography>
                {result.issues.map((issue: any, i: number) => (
                  <Paper key={i} sx={{ p: 2, mb: 1.5, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {getSeverityIcon(issue.severity)}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" fontWeight={600}>{issue.issue}</Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Chip label={issue.dimension} size="small" sx={{ fontSize: 11, height: 22 }} />
                          <Chip label={issue.severity} size="small" color={issue.severity === 'critical' ? 'error' : issue.severity === 'high' ? 'warning' : 'info'} sx={{ fontSize: 11, height: 22 }} />
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Recommendations */}
        {result.recommendations?.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>Recommendations</Typography>
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
