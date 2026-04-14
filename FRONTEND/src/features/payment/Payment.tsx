import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import { useTranslation } from "react-i18next";
import { usePayment } from './hooks/usePayment';
import { CreditCardForm } from './components/CreditCardForm';

import { PlanSummaryCards } from './components/PlanSummaryCards';

const ProPaymentForm = () => {
  const {
    form,
    errors,

    loading,
    dialogOpen,
    errorSnackbarOpen,
    errorMessage,
    setErrorMessage,
    setErrorSnackbarOpen,
    setDialogOpen,
    user,
    login,
    dispatch,
    handleChange,
    handleSubmit,
    handleDialogClose,
    handleErrorSnackbarClose,
  } = usePayment();

  const { t } = useTranslation();

  return (
    <Box sx={{ background: '#f5f5fa', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: "10px",
            border: "1px solid rgba(26,26,24,0.1)",
            overflow: 'hidden',
          }}
        >
          <Box sx={{ flex: 2, p: 4, backgroundColor: '#fff' }}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: '"DM Serif Display", serif', color: '#1a1a18' }}>
              {t("Upgrade to Pro")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }} color="text.secondary">
              {t("payment text")}
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <CreditCardForm form={form} errors={errors} handleChange={handleChange} loading={loading} />
              </Grid>
            </form>
          </Box>

          <PlanSummaryCards />
        </Paper>
      </Container>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>🎉 {t("Payment Successful")}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
           {t("payment success message")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleDialogClose} 
            color="secondary" 
            variant="contained"
            fullWidth
          >
            {t("Continue to Home")}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleErrorSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleErrorSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProPaymentForm;