import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Grid, Typography, Box, FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress, Chip, Stepper, Step, StepLabel } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { assessApp } from '../services/api';

interface Props { onResult: (result: any) => void; }

const steps = ['App Info', 'Performance', 'Stability', 'Usability', 'Fault Tolerance'];

const AssessmentForm: React.FC<Props> = ({ onResult }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    app_name: '', platform: 'Android', startup_time: '', memory_used: '', memory_available: '4096',
    frame_rate: '', crashes: '', sessions: '', screens: '', interactions_per_task: '', completion_rate: '', recovery_times: ''
  });

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true); setError(null);
    try {
      const result = await assessApp({
        app_name: formData.app_name, platform: formData.platform,
        performance: { startup_time: parseFloat(formData.startup_time), memory_used: parseFloat(formData.memory_used), memory_available: parseFloat(formData.memory_available), frame_rate: parseFloat(formData.frame_rate) },
        stability: { crashes: parseInt(formData.crashes), sessions: parseInt(formData.sessions) },
        usability: { screens: parseInt(formData.screens), interactions_per_task: parseFloat(formData.interactions_per_task), completion_rate: parseFloat(formData.completion_rate) },
        fault_tolerance: { recovery_times: formData.recovery_times.split(',').map(t => parseFloat(t.trim())).filter(t => !isNaN(t)) }
      });
      onResult(result);
    } catch (err: any) { setError(err.message || 'Assessment failed'); }
    finally { setLoading(false); }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0: return (
        <Grid container spacing={3}>
          <Grid size={{xs:12, md:6}}><TextField fullWidth required label="Application Name" name="app_name" value={formData.app_name} onChange={handleChange} placeholder="e.g., WhatsApp" /></Grid>
          <Grid size={{xs:12, md:6}}>
            <FormControl fullWidth><InputLabel>Platform</InputLabel>
              <Select name="platform" value={formData.platform} onChange={handleChange} label="Platform">
                <MenuItem value="Android">Android</MenuItem><MenuItem value="iOS">iOS</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      );
      case 1: return (
        <Grid container spacing={3}>
          <Grid size={{xs:12, md:6}}><TextField fullWidth required type="number" label="Startup Time (ms)" name="startup_time" value={formData.startup_time} onChange={handleChange} helperText="Time from launch to interactive state" /></Grid>
          <Grid size={{xs:12, md:6}}><TextField fullWidth required type="number" label="Frame Rate (FPS)" name="frame_rate" value={formData.frame_rate} onChange={handleChange} helperText="Average FPS (target: 60)" /></Grid>
          <Grid size={{xs:12, md:6}}><TextField fullWidth required type="number" label="Memory Used (MB)" name="memory_used" value={formData.memory_used} onChange={handleChange} helperText="Peak memory consumption" /></Grid>
          <Grid size={{xs:12, md:6}}><TextField fullWidth required type="number" label="Device Memory (MB)" name="memory_available" value={formData.memory_available} onChange={handleChange} helperText="Total device RAM" /></Grid>
        </Grid>
      );
      case 2: return (
        <Grid container spacing={3}>
          <Grid size={{xs:12, md:6}}><TextField fullWidth required type="number" label="Number of Crashes" name="crashes" value={formData.crashes} onChange={handleChange} helperText="Total crashes recorded" /></Grid>
          <Grid size={{xs:12, md:6}}><TextField fullWidth required type="number" label="Total Sessions" name="sessions" value={formData.sessions} onChange={handleChange} helperText="Total user sessions" /></Grid>
        </Grid>
      );
      case 3: return (
        <Grid container spacing={3}>
          <Grid size={{xs:12, md:4}}><TextField fullWidth required type="number" label="Number of Screens" name="screens" value={formData.screens} onChange={handleChange} /></Grid>
          <Grid size={{xs:12, md:4}}><TextField fullWidth required type="number" label="Interactions per Task" name="interactions_per_task" value={formData.interactions_per_task} onChange={handleChange} /></Grid>
          <Grid size={{xs:12, md:4}}><TextField fullWidth required type="number" label="Completion Rate (0-1)" name="completion_rate" value={formData.completion_rate} onChange={handleChange} inputProps={{step:0.01,min:0,max:1}} /></Grid>
        </Grid>
      );
      case 4: return (
        <Grid container spacing={3}>
          <Grid size={{xs:12}}><TextField fullWidth required label="Recovery Times (comma-separated seconds)" name="recovery_times" value={formData.recovery_times} onChange={handleChange} placeholder="1.2, 0.8, 1.5, 2.0" helperText="Time to recover from each error incident" /></Grid>
        </Grid>
      );
      default: return null;
    }
  };

  return (
    <Card sx={{ background: 'linear-gradient(180deg, rgba(26,26,46,1) 0%, rgba(15,14,23,1) 100%)' }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight={700}>New Reliability Assessment</Typography>
          <Chip label="247 Rules" size="small" sx={{ ml: 2, background: 'rgba(108,99,255,0.2)', color: '#6C63FF', fontWeight: 600 }} />
        </Box>
        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
          {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
        </Stepper>
        <Box sx={{ minHeight: 180 }}>{renderStep()}</Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button disabled={activeStep === 0} onClick={() => setActiveStep(s => s - 1)} variant="outlined">Back</Button>
          {activeStep < steps.length - 1 ? (
            <Button onClick={() => setActiveStep(s => s + 1)} variant="contained" sx={{ background: 'linear-gradient(135deg, #6C63FF, #5A52D5)' }}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} variant="contained" disabled={loading} startIcon={loading ? <CircularProgress size={20} /> : <RocketLaunchIcon />}
              sx={{ background: 'linear-gradient(135deg, #6C63FF, #FF6584)', px: 4 }}>
              {loading ? 'Analyzing...' : 'Run Assessment'}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AssessmentForm;
