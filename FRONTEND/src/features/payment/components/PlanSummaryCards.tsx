import { Box, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";

export const PlanSummaryCards = () => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
              flex: 1,
              p: 4,
              background: 'linear-gradient(135deg, #a64bf4 0%, #c972f5 100%)',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {t("Pro Plan")}
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              ${t("9.99")}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, mb: 3, color: "white", fontWeight: "bold" }}>
              /{t("month")}
            </Typography>
            <Typography variant="body1" color='white'>
              ✔️ {t("Unlimited Access")}
              <br />
              ✔️ {t("Priority Support")}
              <br />
              ✔️ {t("AI Features Unlocked")}
            </Typography>
          </Box>
    );
};
