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
  onLogout: () => void;
}

const DesktopNav = ({
  pages,
  isAuthenticated,
  user,
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
            color: "#6b6b66",
            fontSize: "14px",
            textDecoration: "none",
            cursor: "pointer",
            fontWeight: 500,
            transition: "color 0.2s",
            "&:hover": {
              color: "#1a1a18",
            },
          }}
        >
          {page.label}
        </Typography>
      ))}

      {!isAuthenticated && (
        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          sx={{
            fontSize: "12px",
          }}
        >
          {t("LogIn")}
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
          variant="contained"
          onClick={() => navigate("/settings?tab=plan")}
          sx={{
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
