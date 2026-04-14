import {
  Box,
  Button,
  Typography,
  Container,
  Link,
  Paper,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link as RouterLink } from "react-router-dom";
import { AUTH_ENDPOINTS } from "../../constants/endpoints";
import HomeIcon from "@mui/icons-material/Home";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const LoginPage = () => {
  const { t } = useTranslation();
  const currentLang = i18n.language;

  const handleGoogleLogin = () => {
    window.location.href = AUTH_ENDPOINTS.google;
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f4ef",
        padding: { xs: 2, md: 4 },
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: 20, left: 20 }}>
        <Link component={RouterLink} to="/" sx={{ color: "#2a5c45" }}>
          <HomeIcon sx={{ fontSize: 32 }} />
        </Link>
      </Box>

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          border: "1px solid rgba(26,26,24,0.1)",
          padding: { xs: 3, sm: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#1a1a18",
            fontFamily: '"DM Serif Display", serif',
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          {t("Login to Your Account")}
        </Typography>

        <Button
          variant="contained"
          onClick={handleGoogleLogin}
          startIcon={currentLang === "en" ? <GoogleIcon /> : <></>}
          endIcon={currentLang === "ar" ? <GoogleIcon sx={{ mx: 1 }} /> : <></>}
          sx={{
            padding: "12px 16px",
            fontWeight: 500,
            fontSize: "1rem",
            backgroundColor: "#2a5c45",
            color: "#ffffff",
            boxShadow: "none",
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: "#1e4332",
              boxShadow: "none",
            },
          }}
        >
          {t("Login with Google")}
        </Button>

        <Typography
          sx={{
            textAlign: "center",
            fontSize: "14px",
            color: "#6b6b66",
          }}
        >
          {t("Don't have an account?")}{" "}
          <Link
            component={RouterLink}
            to="/register"
            sx={{
              color: "#2a5c45",
              textDecoration: "none",
              fontWeight: 500,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {t("Register")}
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage;
