import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const GrammarCheckHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 4 }}>
      <Button
        variant="text"
        onClick={() => navigate("/getStart")}
        startIcon={<ArrowBackIcon />}
        sx={{
          color: "#6b6b66",
          mb: 2,
          textTransform: "none",
          fontWeight: "bold",
          p: 0,
          "&:hover": { color: "#2a5c45", bgcolor: "transparent" },
        }}
      >
        {t("backToStart")}
      </Button>

      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          color: "#1a1a18",
          fontFamily: '"DM Serif Display", serif',
          fontWeight: "bold",
          mb: 1,
        }}
      >
        {t("grammarCheckerTitle")}
      </Typography>
      
      <Typography sx={{ fontSize: "1.1rem", color: "#6b6b66", maxWidth: 600 }}>
        {t("grammarCheckerSubtitle")}
      </Typography>
    </Box>
  );
};
