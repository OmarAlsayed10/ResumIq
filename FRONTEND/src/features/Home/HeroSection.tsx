import {
  Box,
  Button,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Grow,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import CheckIcon from "@mui/icons-material/Check";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language;

  return (
    <Box
      sx={{
        overflowX: "hidden",
        bgcolor: "#f5f4ef",
      }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: { xs: 8, md: 12 },
          maxWidth: "760px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Grow in timeout={1000}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                color: "#2a5c45",
                fontWeight: 500,
              }}
            >
              Resume-IQ BUILDER
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontFamily: '"DM Serif Display", serif',
                lineHeight: 1.1,
                color: "#1a1a18",
              }}
            >
              Craft the{" "}
              <Box component="i" sx={{ color: "#2a5c45" }}>
                Perfect CV
              </Box>{" "}
              with AI
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#6b6b66",
                fontSize: "17px",
                lineHeight: 1.7,
                maxWidth: "600px",
              }}
            >
              {t("home1.subtitle")}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 2,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: "6px",
                  boxShadow: "none",
                  backgroundColor: "#2a5c45",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1e4332",
                    boxShadow: "none",
                  },
                }}
                endIcon={
                  currentLang === "en" ? (
                    <ArrowForwardIcon />
                  ) : (
                    <ArrowBackIcon sx={{ px: 2 }} />
                  )
                }
                onClick={() => navigate("/getStart")}
              >
                {t("Get Started")}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: "6px",
                  borderColor: "rgba(26,26,24,0.1)",
                  color: "#1a1a18",
                }}
                onClick={() => navigate("/getStart")}
              >
                {t("Upload Your CV")}
              </Button>
            </Box>
          </Box>
        </Grow>

        <Fade in timeout={1200}>
          <Box
            sx={{
              width: "100%",
              mt: { xs: 4, md: 6 },
              zIndex: 1,
            }}
          >
            <Box
              component={motion.div}
              initial="initial"
              whileHover="hover"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              {/* CV Created Popup */}
              <Box
                component={motion.div}
                variants={{
                  initial: { opacity: 0, y: 20, scale: 0.9 },
                  hover: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.3 }}
                sx={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  bgcolor: "#2a5c45",
                  color: "white",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  zIndex: 10,
                  boxShadow: "0 10px 25px rgba(42,92,69,0.3)",
                }}
              >
                <CheckIcon sx={{ fontSize: "1.2rem" }} />
                <Typography sx={{ fontWeight: 500, fontSize: "0.85rem" }}>
                  {t("CV Created Successfully")}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  border: "1px solid rgba(26,26,24,0.1)",
                  padding: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 30px 60px -12px rgba(0,0,0,0.12)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                {/* Header / Profile */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
                >
                  <Box
                    component={motion.div}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    sx={{
                      width: 64,
                      height: 64,
                      backgroundColor: "#e8f2ec",
                      borderRadius: "50%",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      flex: 1,
                    }}
                  >
                    <Box
                      component={motion.div}
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{
                        duration: 0.8,
                        delay: 0.4,
                        ease: "easeOut",
                      }}
                      sx={{
                        height: 16,
                        backgroundColor: "#2a5c45",
                        borderRadius: "4px",
                      }}
                    />
                    <Box
                      component={motion.div}
                      initial={{ width: 0 }}
                      animate={{ width: "35%" }}
                      transition={{
                        duration: 0.8,
                        delay: 0.6,
                        ease: "easeOut",
                      }}
                      sx={{
                        height: 12,
                        backgroundColor: "#f5f4ef",
                        borderRadius: "4px",
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ borderBottom: "1px solid rgba(26,26,24,0.05)" }} />

                {/* Body Sub-sections */}
                {[0.8, 1.4, 1.8].map((delay, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                  >
                    <Box
                      component={motion.div}
                      initial={{ width: 0 }}
                      animate={{ width: "25%" }}
                      transition={{ duration: 0.6, delay, ease: "easeOut" }}
                      sx={{
                        height: 14,
                        backgroundColor: "#e0e0e0",
                        borderRadius: "4px",
                      }}
                    />
                    <Box
                      component={motion.div}
                      initial={{ width: 0 }}
                      animate={{ width: index % 2 === 0 ? "85%" : "100%" }}
                      transition={{
                        duration: 0.8,
                        delay: delay + 0.2,
                        ease: "easeOut",
                      }}
                      sx={{
                        height: 10,
                        backgroundColor: "#f5f4ef",
                        borderRadius: "4px",
                      }}
                    />
                    <Box
                      component={motion.div}
                      initial={{ width: 0 }}
                      animate={{ width: index % 2 === 0 ? "95%" : "75%" }}
                      transition={{
                        duration: 0.8,
                        delay: delay + 0.4,
                        ease: "easeOut",
                      }}
                      sx={{
                        height: 10,
                        backgroundColor: "#f5f4ef",
                        borderRadius: "4px",
                      }}
                    />
                    {index === 0 && (
                      <Box
                        component={motion.div}
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{
                          duration: 0.8,
                          delay: delay + 0.6,
                          ease: "easeOut",
                        }}
                        sx={{
                          height: 10,
                          backgroundColor: "#f5f4ef",
                          borderRadius: "4px",
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default HeroSection;
