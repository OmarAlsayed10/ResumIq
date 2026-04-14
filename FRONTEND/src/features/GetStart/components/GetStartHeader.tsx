import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const GetStartHeader = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ textAlign: "center", mb: 8, px: 2 }}>
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          color: "#1a1a18",
          fontFamily: '"DM Serif Display", serif',
          mb: 2,
          fontSize: { xs: "2.5rem", md: "3.5rem" },
        }}
      >
        {t("Let's Create Your Perfect CV!")}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#6b6b66",
          fontSize: "1.1rem",
          maxWidth: "600px",
          mx: "auto",
        }}
      >
        {t("getstarted.subtitle", "Choose an option below to start your journey towards a professional resume.")}
      </Typography>
    </Box>
  );
};
