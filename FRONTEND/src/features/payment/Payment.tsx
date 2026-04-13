import {
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
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
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useTranslation } from "react-i18next";
import { usePayment } from './hooks/usePayment';
import { CreditCardForm } from './components/CreditCardForm';
import { PayPalCheckout } from './components/PayPalCheckout';
import { PlanSummaryCards } from './components/PlanSummaryCards';

const ProPaymentForm = () => {
  const {
    form,
    errors,
    paymentMethod,
    setPaymentMethod,
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
          elevation={4}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ flex: 2, p: 4, backgroundColor: '#fff' }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              {t("Upgrade to Pro")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }} color="text.secondary">
              {t("payment text")}
            </Typography>

            <Tabs
              value={paymentMethod}
              onChange={(_, newValue) => setPaymentMethod(newValue)}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
              sx={{ mb: 3 }}
            >
              <Tab
                value="card"
                label={t("Credit / Debit Card")}
                icon={<CreditCardIcon />}
                iconPosition="start"
              />
              <Tab
                value="paypal"
                label={t("PayPal")}
                icon={<AccountBalanceWalletIcon />}
                iconPosition="start"
              />
            </Tabs>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {paymentMethod === 'card' ? (
                  <CreditCardForm form={form} errors={errors} handleChange={handleChange} loading={loading} />
                ) : (
                  <PayPalCheckout 
                    user={user} 
                    dispatch={dispatch} 
                    login={login} 
                    setErrorMessage={setErrorMessage} 
                    setErrorSnackbarOpen={setErrorSnackbarOpen} 
                    setDialogOpen={setDialogOpen} 
                  />
                )}
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