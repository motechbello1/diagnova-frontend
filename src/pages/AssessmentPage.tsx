import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import AssessmentForm from '../components/AssessmentForm';
import DiagnosticReport from '../components/DiagnosticReport';

const AssessmentPage: React.FC = () => {
  const [result, setResult] = useState<any>(null);

  const handleResult = (r: any) => {
    setResult(r);
    // Save to history
    const history = JSON.parse(localStorage.getItem('diagnova_history') || '[]');
    history.unshift({ ...r, id: Date.now(), assessed_at: new Date().toISOString() });
    localStorage.setItem('diagnova_history', JSON.stringify(history.slice(0, 50)));
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <AssessmentForm onResult={handleResult} />
        {result && <Box sx={{ mt: 4 }}><DiagnosticReport result={result} /></Box>}
      </Box>
    </Container>
  );
};
export default AssessmentPage;
