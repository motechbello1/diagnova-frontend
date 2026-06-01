import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import AssessmentForm from '../components/AssessmentForm';
import DiagnosticReport from '../components/DiagnosticReport';

const AssessmentPage: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <AssessmentForm onResult={(r: any) => { setResult(r); window.scrollTo({ top: 600, behavior: 'smooth' }); }} />
        {result && <Box sx={{ mt: 4 }}><DiagnosticReport result={result} /></Box>}
      </Box>
    </Container>
  );
};
export default AssessmentPage;
