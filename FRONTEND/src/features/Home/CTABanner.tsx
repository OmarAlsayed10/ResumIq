import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function CTABanner() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 2, md: 4 },
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
          borderRadius: "20px",
          backgroundColor: "#0f1f17",
          px: { xs: 4, md: 8 },
          py: { xs: 6, md: 8 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(42,92,69,0.35) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Icon */}
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "14px",
            backgroundColor: "rgba(42,92,69,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
            border: "1px solid rgba(42,92,69,0.4)",
          }}
        >
          <AutoAwesomeIcon sx={{ color: "#3d8b65", fontSize: "1.6rem" }} />
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontFamily: '"DM Serif Display", serif',
            color: "#ffffff",
            fontSize: { xs: "1.8rem", md: "2.6rem" },
            lineHeight: 1.2,
            mb: 2,
            position: "relative",
            zIndex: 1,
          }}
        >
          {t("Ready to land your")}
          <Box component="span" sx={{ color: "#3d8b65" }}>
            {" "}{t("dream job")}?
          </Box>
        </Typography>

        <Typography
          sx={{
            color: "#7a9e8e",
            fontSize: "1.05rem",
            lineHeight: 1.75,
            maxWidth: "560px",
            mx: "auto",
            mb: 5,
            position: "relative",
            zIndex: 1,
          }}
        >
          {t(
            "Join over 50,000 professionals who've accelerated their careers with Resume-IQ. Start building your perfect CV today — it's free."
          )}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/getStart")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              backgroundColor: "#2a5c45",
              color: "#fff",
              fontWeight: 600,
              boxShadow: "0 8px 24px rgba(42,92,69,0.4)",
              "&:hover": {
                backgroundColor: "#1e4332",
                boxShadow: "0 12px 28px rgba(42,92,69,0.5)",
              },
              transition: "all 0.25s ease",
            }}
          >
            {t("Get Started Free")}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/payment-check")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              borderColor: "rgba(42,92,69,0.5)",
              color: "#7a9e8e",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#2a5c45",
                backgroundColor: "rgba(42,92,69,0.08)",
                color: "#3d8b65",
              },
              transition: "all 0.25s ease",
            }}
          >
            {t("View Pricing")}
          </Button>
        </Box>

        {/* Bottom trust text */}
        <Typography
          sx={{
            color: "#4d7a62",
            fontSize: "0.8rem",
            mt: 4,
            position: "relative",
            zIndex: 1,
          }}
        >
          {t("No credit card required · Free forever plan · Cancel anytime")}
        </Typography>
      </Box>
    </Box>
  );
}

export default CTABanner;
