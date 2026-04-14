import { Box, Typography, Button, Container, Grid, Paper, Switch } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import EditSquareIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";

const PricingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("Quarterly"); // Monthly, Quarterly, Semi-Annual

  const getProPrice = () => {
    switch (billingCycle) {
      case "Monthly": return { monthly: "$5", total: "Billed monthly" };
      case "Quarterly": return { monthly: "$3.85", total: "$11.56 billed every 3 months" };
      case "Semi-Annual": return { monthly: "$3.50", total: "$21.00 billed every 6 months" };
      default: return { monthly: "$3.85", total: "$11.56 billed every 3 months" };
    }
  };

  const proPriceInfo = getProPrice();

  return (
    <Box sx={{ bgcolor: "#f5f4ef", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        {/* Pricing Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h1" sx={{ fontFamily: '"DM Serif Display", serif', fontSize: { xs: "2.5rem", md: "3.5rem" }, color: "#1a1a18", mb: 2 }}>
            A feature-packed resume builder that makes resume creation a breeze
          </Typography>
          <Typography sx={{ color: "#6b6b66", fontSize: "1.1rem", maxWidth: "800px", mx: "auto", mb: 4 }}>
            Create a visually stunning resume with ease. Our resume builder will guide you through the process. We help with content suggestions and choosing the right design and layout, while you focus on presenting yourself.
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 10 }}>
          {/* Free Plan */}
          <Grid item xs={12} md={5} lg={4}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: "10px", border: "1px solid rgba(26,26,24,0.1)", height: "100%", display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1a1a18", mb: 1 }}>{t("Free Plan")}</Typography>
              <Typography sx={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1a1a18", mb: 1 }}>$0</Typography>
              <Typography sx={{ color: "#6b6b66", mb: 3 }}>{t("Valid for 7 days")}</Typography>
              
              <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
                {[
                  "All resume templates",
                  "Basic resume sections",
                  "ResumIq branding",
                  "Maximum 12 section items",
                  "Access to all design tools"
                ].map((feature, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <CheckCircleIcon sx={{ color: "#e0e0e0", fontSize: "1.2rem" }} />
                    <Typography sx={{ color: "#1a1a18" }}>{t(feature)}</Typography>
                  </Box>
                ))}
              </Box>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/getStart")}
                sx={{ py: 1.5, borderRadius: "6px", borderColor: "rgba(26,26,24,0.18)", color: "#1a1a18", "&:hover": { borderColor: "#2a5c45" } }}
              >
                {t("Build My Resume")}
              </Button>
            </Paper>
          </Grid>

          {/* Pro Plan */}
          <Grid item xs={12} md={6} lg={5}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: "10px", border: "2px solid #2a5c45", height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
              <Box sx={{ position: "absolute", top: -15, right: 20, bgcolor: "#2a5c45", color: "white", px: 2, py: 0.5, borderRadius: "4px", fontSize: "0.85rem", fontWeight: "bold" }}>
                {t("POPULAR")}
              </Box>
              
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1a1a18", mb: 1 }}>{t("Pro Plan")}</Typography>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1 }}>
                <Typography sx={{ fontSize: "3rem", fontWeight: "bold", color: "#2a5c45" }}>{proPriceInfo.monthly}</Typography>
                <Typography sx={{ color: "#6b6b66", fontWeight: 500 }}>/{t("mo")}</Typography>
              </Box>
              <Typography sx={{ color: "#2a5c45", mb: 3, fontWeight: 500, fontSize: "0.9rem" }}>{proPriceInfo.total}</Typography>

              {/* Billing Cycle Toggle */}
              <Box sx={{ display: "flex", bgcolor: "#f5f4ef", borderRadius: "8px", p: 0.5, mb: 4 }}>
                {["Monthly", "Quarterly", "Semi-Annual"].map(cycle => (
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
                      boxShadow: billingCycle === cycle ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
                      color: billingCycle === cycle ? "#1a1a18" : "#6b6b66",
                      fontWeight: billingCycle === cycle ? "bold" : "normal",
                      fontSize: "0.85rem",
                      transition: "all 0.2s"
                    }}
                  >
                    {t(cycle)}
                  </Box>
                ))}
              </Box>

              <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
                {[
                  "150 resumes and cover letters",
                  "All resume templates",
                  "Real-time content suggestions",
                  "ATS check (Applicant Tracking System)",
                  "Pro resume sections",
                  "No branding",
                  "Unlimited section items",
                  "Thousands of design options"
                ].map((feature, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <CheckCircleIcon sx={{ color: "#2a5c45", fontSize: "1.2rem" }} />
                    <Typography sx={{ color: "#1a1a18", fontWeight: 500 }}>{t(feature)}</Typography>
                  </Box>
                ))}
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/payment-check")}
                sx={{ py: 1.5, borderRadius: "6px", bgcolor: "#2a5c45", color: "white", boxShadow: "none", "&:hover": { bgcolor: "#1e4332", boxShadow: "none" } }}
              >
                {t("Build My Resume")}
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Feature Highlights section */}
        <Grid container spacing={8} sx={{ mb: 10 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Box sx={{ width: 64, height: 64, borderRadius: "50%", bgcolor: "#e8f2ec", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2 }}>
                <DescriptionIcon sx={{ color: "#2a5c45", fontSize: "2rem" }} />
              </Box>
              <Typography variant="h3" sx={{ fontFamily: '"DM Serif Display", serif', fontSize: "1.5rem", color: "#1a1a18", mb: 2 }}>{t("One builder, hundreds of templates")}</Typography>
              <Typography sx={{ color: "#6b6b66" }}>
                {t("Choose from hundreds of professionally designed and ATS-friendly resume templates, tens of resume sections, and thousands of combinations made to make you stand out.")}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Box sx={{ width: 64, height: 64, borderRadius: "50%", bgcolor: "#e8f2ec", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2 }}>
                <AutoFixHighIcon sx={{ color: "#2a5c45", fontSize: "2rem" }} />
              </Box>
              <Typography variant="h3" sx={{ fontFamily: '"DM Serif Display", serif', fontSize: "1.5rem", color: "#1a1a18", mb: 2 }}>{t("AI Grammar & Content Checks")}</Typography>
              <Typography sx={{ color: "#6b6b66" }}>
                {t("Get a powerful AI-powered content analyzing tool. Don't let mistakes and typos cost a potential job. Cut out clichés, repetition, and vague wording.")}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Box sx={{ width: 64, height: 64, borderRadius: "50%", bgcolor: "#e8f2ec", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2 }}>
                <EditSquareIcon sx={{ color: "#2a5c45", fontSize: "2rem" }} />
              </Box>
              <Typography variant="h3" sx={{ fontFamily: '"DM Serif Display", serif', fontSize: "1.5rem", color: "#1a1a18", mb: 2 }}>{t("Tailor your resume with a single click")}</Typography>
              <Typography sx={{ color: "#6b6b66" }}>
                {t("With our resume tailoring feature you can ensure your resume is relevant to the job you're applying for.")}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Testimonial Section */}
        <Box sx={{ bgcolor: "#ffffff", borderRadius: "10px", border: "1px solid rgba(26,26,24,0.1)", p: { xs: 4, md: 6 }, textAlign: "center", maxWidth: "800px", mx: "auto" }}>
          <Typography sx={{ color: "#2a5c45", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", mb: 2, fontSize: "0.85rem" }}>
            What do people say about us?
          </Typography>
          <Typography sx={{ fontFamily: '"DM Serif Display", serif', fontSize: { xs: "1.2rem", md: "1.5rem" }, color: "#1a1a18", fontStyle: "italic", mb: 4 }}>
            "It's the only tool online that gives a 'millennial-worthy' resume without the cheap, non-applicable 'templates.' The balance between style, content, and function is just stunning. I've been on many hiring committees and a ResumIq resume will always catch my eye. It's clean and minimal."
          </Typography>
          <Typography sx={{ fontWeight: "bold", color: "#1a1a18" }}>Joshua Perk</Typography>
          <Typography sx={{ color: "#6b6b66" }}>Account Manager, OpenNest</Typography>
        </Box>

      </Container>
    </Box>
  );
};

export default PricingPage;
