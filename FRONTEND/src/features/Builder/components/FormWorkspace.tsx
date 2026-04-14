import { useState } from 'react';
import { Box, Paper, Stepper, Step, StepLabel, Button, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Personal from '../Edit/Personal';
import Experience from '../Edit/Experience';
import Education from '../Edit/Education';
import Skills from '../Edit/Skills';
import TemplatesSection from '../sidebar/TemplatesSection';

const steps = ['Personal', 'Experience', 'Education', 'Skills'];

export const FormWorkspace = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Template & AI Tools injected here vertically for mobile, horizontally for desktop */}
      <TemplatesSection />

      <Paper sx={{ p: isMobile ? 2 : 4, bgcolor: 'white', borderRadius: 4, border: '1px solid rgba(26,26,24,0.1)' }} elevation={0}>
        <Stepper activeStep={activeStep} alternativeLabel={!isMobile} orientation={isMobile ? 'vertical' : 'horizontal'}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{t(label)}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: isMobile ? 3 : 5,
          bgcolor: 'white',
          borderRadius: 4,
          border: '1px solid rgba(26,26,24,0.1)',
        }}
      >
        <Box sx={{ minHeight: '400px' }}>
          {activeStep === 0 && <Personal />}
          {activeStep === 1 && <Experience />}
          {activeStep === 2 && <Education />}
          {activeStep === 3 && <Skills />}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 3, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <Button 
            disabled={activeStep === 0} 
            onClick={handleBack}
            variant="outlined"
            sx={{ px: 4, borderRadius: 2, color: '#6b6b66', borderColor: '#dcdcdc' }}
          >
            {t('Back')}
          </Button>
          <Button 
            disabled={activeStep === steps.length - 1} 
            onClick={handleNext}
            variant="contained"
            sx={{ bgcolor: '#2a5c45', px: 5, borderRadius: 2, '&:hover': { bgcolor: '#1a3c2d' }, boxShadow: 'none' }}
          >
            {t('Next')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
