import {
  Box,
  Typography,
  Button,
  MenuItem,
  Switch,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

interface Page {
  label: string;
  href: string;
}

interface DesktopNavProps {
  pages: Page[];
  isAuthenticated: boolean;
  user: any;
  onOpenPayment: () => void;
  onLogout: () => void;
}

const DesktopNav = ({
  pages,
  isAuthenticated,
  user,
  onOpenPayment,
  onLogout,
}: DesktopNavProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === "en" ? "ar" : "en");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        flexDirection: "row reverse",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "40px",
      }}
    >
      {pages.map((page) => (
        <Typography
          key={page.label}
          onClick={() => navigate(page.href)}
          sx={{
            color: "black",
            textDecoration: "none",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          {page.label}
        </Typography>
      ))}

      {!isAuthenticated && (
        <Button
          onClick={() => navigate("/login")}
          sx={{
            background:
              "linear-gradient(135deg, #6a11cb 0%, #8e2de2 100%)",
            color: "white",
            fontSize: "12px",
          }}
        >
          {t("LogIn")}
        </Button>
      )}

      {user?.role === "normal user" && (
        <Button
          onClick={onOpenPayment}
          sx={{
            background:
              "linear-gradient(135deg, #6a11cb 0%, #8e2de2 100%)",
            color: "white",
            fontSize: "12px",
          }}
        >
          {t("Go Pro")}
        </Button>
      )}

      {!isAuthenticated && (
        <MenuItem>
          <Box
            sx={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <Typography sx={{ fontSize: "14px", mx: 1 }}>
              {currentLang === "ar" ? "ع" : "En"}
            </Typography>
            <Switch
              checked={currentLang === "ar"}
              onChange={toggleLanguage}
              color="primary"
            />
          </Box>
        </MenuItem>
      )}

      {user?.role === "pro user" && (
        <Button
          onClick={() => navigate("/settings?tab=plan")}
          sx={{
            background:
              "linear-gradient(135deg, #6a11cb 0%, #8e2de2 100%)",
            color: "white",
            fontSize: "12px",
          }}
        >
          {t("Pro")}
        </Button>
      )}

      {isAuthenticated && <UserMenu user={user} onLogout={onLogout} />}
    </Box>
  );
};

export default DesktopNav;
