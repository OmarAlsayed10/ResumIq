import { Box, Typography, Chip } from "@mui/material";
import { HOW_IT_WORKS_STEPS } from "../../constants/homeData";
import { useTranslation } from "react-i18next";

function HowItWorksSection() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: "#f5f4ef",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          bottom: -60,
          right: -60,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(42,92,69,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <Box sx={{ textAlign: "center", mb: { xs: 7, md: 9 }, px: 2 }}>
        <Chip
          label={t("Simple & Fast")}
          size="small"
          sx={{
            mb: 2,
            backgroundColor: "#e8f2ec",
            color: "#2a5c45",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"DM Serif Display", serif',
            color: "#1a1a18",
            fontSize: { xs: "2rem", md: "2.8rem" },
            lineHeight: 1.15,
            mb: 2,
          }}
        >
          {t("How It Works")}
        </Typography>
        <Typography
          sx={{
            color: "#6b6b66",
            fontSize: "1.05rem",
            maxWidth: "520px",
            mx: "auto",
            lineHeight: 1.75,
          }}
        >
          {t("Three simple steps to a job-winning CV")}
        </Typography>
      </Box>

      {/* Steps */}
      <Box
        sx={{
          maxWidth: "1000px",
          mx: "auto",
          px: { xs: 2, sm: 4, md: 6 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 0 },
          position: "relative",
        }}
      >
        {/* Connecting line (desktop only) */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: 36,
            left: "calc(16.66% + 36px)",
            right: "calc(16.66% + 36px)",
            height: "1px",
            background:
              "linear-gradient(90deg, #2a5c45 0%, rgba(42,92,69,0.3) 50%, #2a5c45 100%)",
            zIndex: 0,
          }}
        />

        {HOW_IT_WORKS_STEPS.map((step, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", md: "center" },
              textAlign: { xs: "left", md: "center" },
              px: { md: 3 },
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Step number circle */}
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                border: "2px solid rgba(42,92,69,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
                position: "relative",
                boxShadow: "0 8px 24px -8px rgba(42,92,69,0.12)",
              }}
            >
              {step.icon}
              {/* Step number badge */}
              <Box
                sx={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: "#2a5c45",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.65rem",
                  fontWeight: 800,
                }}
              >
                {i + 1}
              </Box>
            </Box>

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#1a1a18",
                mb: 1,
              }}
            >
              {t(step.titleKey)}
            </Typography>
            <Typography
              sx={{
                color: "#6b6b66",
                fontSize: "0.9rem",
                lineHeight: 1.75,
                maxWidth: "260px",
              }}
            >
              {t(step.descriptionKey)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default HowItWorksSection;
