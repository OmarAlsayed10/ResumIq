import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function PricingSection() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const isPro = user?.role === "pro user";
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("Quarterly");

  const handleClickPro = () => {
    navigate("/payment-check");
  };

  const handleClickFree = () => {
    navigate("/getStart");
  };

  const getProPrice = () => {
    switch (billingCycle) {
      case "Monthly":
        return { monthly: "$5", total: t("Billed monthly") };
      case "Quarterly":
        return {
          monthly: "$3.85",
          total: "$11.56 " + t("billed every 3 months"),
        };
      case "Semi-Annual":
        return {
          monthly: "$3.50",
          total: "$21.00 " + t("billed every 6 months"),
        };
      default:
        return {
          monthly: "$3.85",
          total: "$11.56 " + t("billed every 3 months"),
        };
    }
  };

  const proPriceInfo = getProPrice();

  return (
    <Box sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 6, px: 2 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: { xs: "2rem", md: "3rem" },
            color: "#1a1a18",
            mb: 2,
          }}
        >
          {t("Choose Your Plan")}
        </Typography>
        <Typography
          sx={{
            color: "#6b6b66",
            fontSize: "1.1rem",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          {t("Flexible options to match your CV needs")}
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center" sx={{ px: 2 }}>
        {/* Free Plan */}
        <Grid sx={{ width: { xs: "100%", md: "41.66%", lg: "33.33%" } }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "10px",
              border: "1px solid rgba(26,26,24,0.1)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#1a1a18",
                mb: 1,
              }}
            >
              {t("Free Plan")}
            </Typography>
            <Typography
              sx={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#1a1a18",
                mb: 1,
              }}
            >
              $0
            </Typography>
            <Typography sx={{ color: "#6b6b66", mb: 3 }}>
              {t("Valid for 7 days")}
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mb: 4,
              }}
            >
              {[
                "All resume templates",
                "Basic resume sections",
                "Resume-IQ branding",
                "Maximum 12 section items",
                "Access to all design tools",
              ].map((feature, i) => (
                <Box
                  key={i}
                  sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                >
                  <CheckCircleIcon
                    sx={{ color: "#e0e0e0", fontSize: "1.2rem" }}
                  />
                  <Typography sx={{ color: "#1a1a18" }}>
                    {t(feature)}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
              variant="outlined"
              fullWidth
              disabled={isPro}
              onClick={handleClickFree}
              sx={{
                py: 1.5,
                borderRadius: "6px",
                borderColor: "rgba(26,26,24,0.18)",
                color: "#1a1a18",
                "&:hover": { borderColor: "#2a5c45" },
              }}
            >
              {t("Get Started Free")}
            </Button>
          </Paper>
        </Grid>

        {/* Pro Plan */}
        <Grid sx={{ width: { xs: "100%", md: "50%", lg: "41.66%" } }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "10px",
              border: "2px solid #2a5c45",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -15,
                right: 20,
                bgcolor: "#2a5c45",
                color: "white",
                px: 2,
                py: 0.5,
                borderRadius: "4px",
                fontSize: "0.85rem",
                fontWeight: "bold",
              }}
            >
              {t("POPULAR")}
            </Box>

            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#1a1a18",
                mb: 1,
              }}
            >
              {t("Pro Plan")}
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1 }}
            >
              <Typography
                sx={{ fontSize: "3rem", fontWeight: "bold", color: "#2a5c45" }}
              >
                {proPriceInfo.monthly}
              </Typography>
              <Typography sx={{ color: "#6b6b66", fontWeight: 500 }}>
                /{t("mo")}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "#2a5c45",
                mb: 3,
                fontWeight: 500,
                fontSize: "0.9rem",
              }}
            >
              {proPriceInfo.total}
            </Typography>

            {/* Billing Cycle Toggle */}
            <Box
              sx={{
                display: "flex",
                bgcolor: "#f5f4ef",
                borderRadius: "8px",
                p: 0.5,
                mb: 4,
              }}
            >
              {["Monthly", "Quarterly", "Semi-Annual"].map((cycle) => (
                <Box
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    py: 1,
                    borderRadius: "6px",
                    cursor: "pointer",
                    bgcolor: billingCycle === cycle ? "white" : "transparent",
                    boxShadow:
                      billingCycle === cycle
                        ? "0 2px 4px rgba(0,0,0,0.05)"
                        : "none",
                    color: billingCycle === cycle ? "#1a1a18" : "#6b6b66",
                    fontWeight: billingCycle === cycle ? "bold" : "normal",
                    fontSize: "0.85rem",
                    transition: "all 0.2s",
                  }}
                >
                  {t(cycle)}
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mb: 4,
              }}
            >
              {[
                "150 resumes and cover letters",
                "All resume templates",
                "Real-time content suggestions",
                "ATS check (Applicant Tracking System)",
                "Pro resume sections",
                "No branding",
                "Unlimited section items",
                "Thousands of design options",
              ].map((feature, i) => (
                <Box
                  key={i}
                  sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                >
                  <CheckCircleIcon
                    sx={{ color: "#2a5c45", fontSize: "1.2rem" }}
                  />
                  <Typography sx={{ color: "#1a1a18", fontWeight: 500 }}>
                    {t(feature)}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
              variant="contained"
              fullWidth
              disabled={isPro}
              onClick={handleClickPro}
              sx={{
                py: 1.5,
                borderRadius: "6px",
                bgcolor: "#2a5c45",
                color: "white",
                boxShadow: "none",
                "&:hover": { bgcolor: "#1e4332", boxShadow: "none" },
              }}
            >
              {!isPro ? t("Upgrade to Pro") : t("already upgraded")}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PricingSection;
