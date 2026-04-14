import { Box, Typography, Grid, Chip, Avatar } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import StarIcon from "@mui/icons-material/Star";
import { useTranslation } from "react-i18next";
import { TESTIMONIALS_DATA, STATS_DATA } from "../../constants/homeData";

function TestimonialsSection() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Stats Row */}
      <Box
        sx={{
          maxWidth: "1100px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          mb: { xs: 10, md: 12 },
        }}
      >
        <Grid container justifyContent="center" spacing={0}>
          {STATS_DATA.map((stat, i) => (
            <Grid
              key={i}
              sx={{
                width: { xs: "50%", sm: "25%" },
                textAlign: "center",
                borderRight: {
                  sm: i < 3 ? "1px solid rgba(26,26,24,0.08)" : "none",
                },
                py: { xs: 3, md: 4 },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "2.2rem", md: "3rem" },
                  fontWeight: 800,
                  color: "#2a5c45",
                  fontFamily: '"DM Serif Display", serif',
                  lineHeight: 1,
                  mb: 0.75,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{ color: "#6b6b66", fontSize: "0.9rem", fontWeight: 500 }}
              >
                {t(stat.labelKey)}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Testimonials */}
      <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 }, px: 2 }}>
        <Chip
          label={t("What users say")}
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
          }}
        >
          {t("Loved by job seekers")}
        </Typography>
      </Box>

      <Grid
        container
        spacing={0}
        sx={{
          maxWidth: "1100px",
          mx: "auto",
          px: { xs: 2, sm: 4, md: 6 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {TESTIMONIALS_DATA.map((item, i) => (
          <Grid key={i} sx={{ width: "100%" }}>
            <Box
              sx={{
                p: 3.5,
                borderRadius: "14px",
                border: "1px solid rgba(26,26,24,0.08)",
                backgroundColor: "#fafaf8",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                transition: "box-shadow 0.25s ease",
                "&:hover": {
                  boxShadow: "0 16px 40px -10px rgba(42,92,69,0.1)",
                },
              }}
            >
              {/* Quote icon */}
              <FormatQuoteIcon
                sx={{
                  color: "#e8f2ec",
                  fontSize: "2.5rem",
                  alignSelf: "flex-start",
                }}
              />

              {/* Stars */}
              <Box sx={{ display: "flex", gap: 0.3 }}>
                {Array.from({ length: item.rating }).map((_, j) => (
                  <StarIcon
                    key={j}
                    sx={{ color: "#f59e0b", fontSize: "1rem" }}
                  />
                ))}
              </Box>

              {/* Text */}
              <Typography
                sx={{
                  color: "#3a3a38",
                  lineHeight: 1.75,
                  fontSize: "0.92rem",
                  flex: 1,
                }}
              >
                "{item.text}"
              </Typography>

              {/* Author */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                    backgroundColor: "#2a5c45",
                    fontSize: "1rem",
                    fontWeight: 700,
                  }}
                >
                  {item.avatar}
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "#1a1a18",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography sx={{ fontSize: "0.78rem", color: "#6b6b66" }}>
                    {item.role} · {item.company}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TestimonialsSection;
