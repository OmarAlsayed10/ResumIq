import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Link,
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
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: { xs: 2, md: 4 },
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Box
            component="img"
            src="Images/2.jpg"
            alt="Login Illustration"
            sx={{
              width: "100%",
              maxHeight: "550px",
              objectFit: "cover",
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 10, md: 6 }}>
          <Box
            sx={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              padding: { xs: 2, sm: 4 },
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                color: "primary.main",
                fontWeight: "bold",
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            >
              {t("Login to Your Account")}
            </Typography>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleGoogleLogin}
              startIcon={currentLang === "en" ? <GoogleIcon /> : <></>}
              endIcon={
                currentLang === "ar" ? <GoogleIcon sx={{ mx: 1 }} /> : <></>
              }
              sx={{
                padding: { xs: 1.5, sm: 2 },
                fontWeight: "bold",
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              {t("Login with Google")}
            </Button>

            <Typography
              sx={{
                textAlign: "center",
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
              }}
            >
              {t("Don't have an account?")}{" "}
              <Link
                component={RouterLink}
                to="/register"
                sx={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                {t("Register")}
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box>
        <Link
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "primary.main" }}
        >
          <HomeIcon
            sx={{ fontSize: 40, position: "absolute", top: 20, left: 20 }}
          />
        </Link>
      </Box>
    </Container>
  );
};

export default LoginPage;
