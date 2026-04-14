import { Typography, Box, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const FooterNewsletter = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        variant="overline"
        sx={{
          color: "#ffffff",
          fontWeight: 700,
          letterSpacing: "1.2px",
          fontSize: "0.72rem",
          display: "block",
          mb: 2.5,
        }}
      >
        {t("Stay Updated")}
      </Typography>
      <Typography
        sx={{ color: "#7a9e8e", fontSize: "0.88rem", mb: 2, lineHeight: 1.7 }}
      >
        {t("Get CV tips and product updates in your inbox.")}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, maxWidth: "100%" }}>
        <TextField
          size="small"
          placeholder={t("Your email")}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: "8px",
              color: "#c8d9ce",
              "& fieldset": {
                borderColor: "rgba(42,92,69,0.4)",
              },
              "&:hover fieldset": {
                borderColor: "#2a5c45",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2a5c45",
              },
            },
            "& input::placeholder": {
              color: "#4d7a62",
              opacity: 1,
            },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#2a5c45",
            color: "#fff",
            borderRadius: "8px",
            py: 1,
            boxShadow: "none",
            fontSize: "0.82rem",
            "&:hover": {
              backgroundColor: "#1e4332",
              boxShadow: "none",
            },
          }}
        >
          {t("Subscribe")}
        </Button>
      </Box>
    </>
  );
};

export default FooterNewsletter;
