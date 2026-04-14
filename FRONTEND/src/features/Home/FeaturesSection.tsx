import { Box, Typography, Chip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CV_TOOLS } from "../../constants/homeData";

function FeaturesSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: "#f5f4ef",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blob */}
      <Box
        sx={{
          position: "absolute",
          top: -80,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(42,92,69,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Section header */}
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 7, md: 9 },
          px: 2,
        }}
      >
        <Chip
          label={t("Everything you need")}
          size="small"
          sx={{
            mb: 2,
            backgroundColor: "#e8f2ec",
            color: "#2a5c45",
            fontWeight: 600,
            letterSpacing: "0.5px",
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
          {t("Powerful CV Tools")}
        </Typography>
        <Typography
          sx={{
            color: "#6b6b66",
            fontSize: "1.05rem",
            maxWidth: "560px",
            mx: "auto",
            lineHeight: 1.75,
          }}
        >
          {t("home2.subtitle")}
        </Typography>
      </Box>

      {/* Feature cards grid */}
      <Box
        sx={{
          px: { xs: 2, sm: 4, md: 8 },
          maxWidth: "1200px",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {CV_TOOLS.map((tool, index) => (
          <Box key={index}>
            <Box
              onClick={() => navigate(tool.to)}
              sx={{
                height: "100%",
                p: 3.5,
                borderRadius: "14px",
                backgroundColor: "#ffffff",
                border: "1px solid rgba(26,26,24,0.07)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 20px 40px -12px rgba(42,92,69,0.15)",
                  borderColor: "rgba(42,92,69,0.25)",
                  "& .arrow-icon": { opacity: 1, transform: "translateX(4px)" },
                },
              }}
            >
              {/* Icon + badge row */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    backgroundColor: "#e8f2ec",
                    borderRadius: "10px",
                    display: "inline-flex",
                  }}
                >
                  {tool.icon}
                </Box>
                <Chip
                  label={tool.badge}
                  size="small"
                  sx={{
                    backgroundColor: "#f5f4ef",
                    color: "#6b6b66",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    height: 24,
                  }}
                />
              </Box>

              {/* Text */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1a1a18",
                    mb: 0.75,
                    fontSize: "1rem",
                  }}
                >
                  {t(tool.titleKey)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#6b6b66", lineHeight: 1.7, fontSize: "0.9rem" }}
                >
                  {t(tool.descriptionKey)}
                </Typography>
              </Box>

              {/* Arrow */}
              <Box
                className="arrow-icon"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "#2a5c45",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  opacity: 0,
                  transition: "all 0.25s ease",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#2a5c45",
                  }}
                >
                  {t("Learn more")}
                </Typography>
                <ArrowForwardIcon sx={{ fontSize: "0.95rem" }} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default FeaturesSection;
