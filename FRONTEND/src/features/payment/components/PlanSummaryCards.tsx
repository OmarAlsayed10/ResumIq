import { Box, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const PlanSummaryCards = () => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
              flex: 1,
              p: 4,
              backgroundColor: '#2a5c45',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontFamily: '"DM Serif Display", serif', fontSize: '2rem' }}>
              {t("Pro Plan")}
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", mb: 4 }}>
              {t("Feature packed resume builder for serious job seekers")}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  "150 resumes and cover letters",
                  "All resume templates",
                  "Real-time content suggestions",
                  "ATS check (Applicant Tracking System)",
                  "Pro resume sections",
                  "No branding",
                  "Unlimited section items",
                  "Thousands of design options"
                ].map((feature, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <CheckCircleIcon sx={{ color: "#ffffff", fontSize: "1.2rem" }} />
                    <Typography>{t(feature)}</Typography>
                  </Box>
                ))}
            </Box>
          </Box>
    );
};
