import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DescriptionIcon from "@mui/icons-material/Description";
import axios from "axios";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import ProWarning from "./ProWarning";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { AUTH_ENDPOINTS } from "../../constants/endpoints";
import { useNavigate } from "react-router-dom";
import MobileMenu from "./navbar/MobileMenu";
import DesktopNav from "./navbar/DesktopNav";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [openPaymentDialog, setOpenPaymentDialog] = React.useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUserFromPayment } = useAuth();
  const currentLang = i18n.language;
  const isRTL = currentLang === "ar";
  const paymentState = useSelector((state: any) => state.payment);

  useEffect(() => {
    if (paymentState.success && paymentState.user) {
      updateUserFromPayment(paymentState.user, Cookies.get("token") || "");
      console.log("User updated after payment:", paymentState.user);
    }
  }, [paymentState.success, paymentState.user, updateUserFromPayment]);

  const handleLogout = async () => {
    try {
      await axios.post(AUTH_ENDPOINTS.logout, {}, { withCredentials: true });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const pages = [
    { label: t("Home"), href: "/" },
    { label: t("Blogs"), href: "/Blogs" },
    { label: t("Tips"), href: "/tips" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "black",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            <DescriptionIcon
              sx={{ color: "#7d25d2", mr: 1, fontSize: "30px" }}
            />
            Smart-CV
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              sx={{ color: "black" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              onClick={() => navigate("/")}
              sx={{
                ml: 2,
                display: "flex",
                flexGrow: 1,
                color: "black",
                textDecoration: "none",
                cursor: "pointer",
                alignItems: "center",
              }}
            >
              <DescriptionIcon sx={{ color: "#7d25d2", mr: 1 }} />
              Smart-CV
            </Typography>
          </Box>

          <MobileMenu
            anchorEl={anchorElNav}
            onClose={handleCloseNavMenu}
            pages={pages}
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
            onOpenPayment={() => setOpenPaymentDialog(true)}
          />

          <DesktopNav
            pages={pages}
            isAuthenticated={isAuthenticated}
            user={user}
            onOpenPayment={() => setOpenPaymentDialog(true)}
            onLogout={handleLogout}
          />
        </Toolbar>
      </Container>
      <ProWarning
        openPaymentDialog={openPaymentDialog}
        setOpenPaymentDialog={setOpenPaymentDialog}
      />
    </AppBar>
  );
}

export default Navbar;
