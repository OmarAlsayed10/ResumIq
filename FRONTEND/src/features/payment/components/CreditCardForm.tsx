import { Grid, TextField, InputAdornment, Button, CircularProgress } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useTranslation } from "react-i18next";

interface CreditCardFormProps {
  form: any;
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

export const CreditCardForm = ({ form, errors, handleChange, loading }: CreditCardFormProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid size={12}>
        <TextField
          required
          label={t("Cardholder Name")}
          name="name"
          fullWidth
          value={form.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          required
          label={t("Card Number")}
          name="cardNumber"
          fullWidth
          inputProps={{ maxLength: 16 }}
          value={form.cardNumber}
          onChange={handleChange}
          error={!!errors.cardNumber}
          helperText={errors.cardNumber}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          required
          label={t("Expiry Date (MM/YY)")}
          name="expiry"
          fullWidth
          placeholder="08/29"
          value={form.expiry}
          onChange={handleChange}
          error={!!errors.expiry}
          helperText={errors.expiry}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          required
          label="CVV"
          name="cvv"
          fullWidth
          inputProps={{ maxLength: 4 }}
          value={form.cvv}
          onChange={handleChange}
          error={!!errors.cvv}
          helperText={errors.cvv}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          required
          label={t("Billing Address")}
          name="address"
          fullWidth
          value={form.address}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
          error={!!errors.address}
          helperText={errors.address}
        />
      </Grid>
      <Grid size={12}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            py: 1.5,
            fontWeight: 'bold',
            borderRadius: 2,
            bgcolor: "#2a5c45",
            color: "white",
            transition: '0.3s',
            boxShadow: 'none',
            ':hover': {
              bgcolor: "#1e4332",
              boxShadow: 'none',
            },
          }}
        >
          {loading ? (
            <CircularProgress size={26} color="inherit" />
          ) : (
            t('Pay $9.99 and Upgrade')
          )}
        </Button>
      </Grid>
    </>
  );
};
