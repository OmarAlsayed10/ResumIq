import { Box, useMediaQuery, useTheme } from '@mui/material';
import Header from './header';
import { FormWorkspace } from './components/FormWorkspace';
import { LivePreviewPane } from './components/LivePreviewPane';
import { usePreview } from '../../hooks/usePreview';

const Builder = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const { goToPreview } = usePreview();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f4ef', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, display: 'flex', gap: 4, maxWidth: '1800px', mx: 'auto', width: '100%' }}>
        
        {/* LEFT PANE: Form Wizard */}
        <Box sx={{ 
          width: isMobile ? (goToPreview ? '0%' : '100%') : '50%', 
          display: goToPreview && isMobile ? 'none' : 'flex', 
          flexDirection: 'column',
          animation: 'fadeIn 0.5s',
          pb: 8 // padding bottom to allow scrolling past bottom cleanly
        }}>
           <FormWorkspace />
        </Box>

        {/* RIGHT PANE: Live Visualizer Preview */}
        {!isMobile && (
          <Box sx={{ display: 'none' /* ensure spacing when sticky breaks on mobile */ }} />
        )}
        <Box sx={{ 
          width: isMobile ? (goToPreview ? '100%' : '0%') : '50%', 
          display: !goToPreview && isMobile ? 'none' : 'flex', 
          flexGrow: 1, 
          bgcolor: 'white', 
          borderRadius: 4, 
          border: '1px solid rgba(42, 92, 69, 0.1)',
          animation: 'fadeIn 0.5s',
        }}>
           <LivePreviewPane />
        </Box>
      </Box>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default Builder;
