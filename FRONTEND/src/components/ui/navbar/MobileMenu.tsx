import {
  Box,
  Menu,
  MenuItem,
  Typography,
  Button,
  Switch,
  Avatar,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { useNavigate } from "react-router-dom";

interface Page {
  label: string;
  href: string;
}

interface MobileMenuProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  pages: Page[];
  isAuthenticated: boolean;
  user: any;
  onLogout: () => void;
  onOpenPayment: () => void;
}

const MobileMenu = ({
  anchorEl,
  onClose,
  pages,
  isAuthenticated,
  user,
  onLogout,
  onOpenPayment,
}: MobileMenuProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language;
  const isRTL = currentLang === "ar";

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === "en" ? "ar" : "en");
  };

  return (
    <Menu
      id="mobile-menu"
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(anchorEl)}
      onClose={onClose}
      sx={{ display: { xs: "block", md: "none" } }}
    >
      {isAuthenticated && (
        <MenuItem>
          <Avatar
            src={user?.photo || ""}
            sx={{ bgcolor: "primary.main", marginInlineEnd: 1 }}
          >
            {user?.firstName?.[0]?.toUpperCase() ||
              user?.email?.[0]?.toUpperCase()}
          </Avatar>
          {user?.firstName || user?.email?.split("@")[0]}
        </MenuItem>
      )}
      {pages.map((page) => (
        <MenuItem
          key={page.label}
          onClick={() => {
            onClose();
            navigate(page.href);
          }}
        >
          <Typography textAlign="center" sx={{ color: "black" }}>
            {page.label}
          </Typography>
        </MenuItem>
      ))}

      <MenuItem>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "14px", mx: 1 }}>
            {isRTL ? "ع" : "En"}
          </Typography>
          <Switch
            checked={currentLang === "ar"}
            onChange={toggleLanguage}
            color="primary"
          />
        </Box>
      </MenuItem>
      {!isAuthenticated && (
        <MenuItem
          onClick={() => {
            onClose();
            navigate("/login");
          }}
        >
          <Button
            fullWidth
            sx={{
              background:
                "linear-gradient(135deg, #5a0db5 0%, #7d25d2 100%)",
              color: "white",
            }}
          >
            {t("LogIn")}
          </Button>
        </MenuItem>
      )}
      {user?.role === "normal user" && (
        <MenuItem
          onClick={() => {
            onClose();
            onOpenPayment();
          }}
        >
          <Button
            fullWidth
            sx={{
              background:
                "linear-gradient(135deg, #5a0db5 0%, #7d25d2 100%)",
              color: "white",
            }}
          >
            {t("Go Pro")}
          </Button>
        </MenuItem>
      )}
      {user?.role === "pro user" && (
        <MenuItem
          onClick={() => {
            onClose();
            navigate("/settings?tab=plan");
          }}
        >
          <Button
            fullWidth
            sx={{
              background:
                "linear-gradient(135deg, #5a0db5 0%, #7d25d2 100%)",
              color: "white",
            }}
          >
            {t("Pro")}
          </Button>
        </MenuItem>
      )}
      {isAuthenticated && (
        <MenuItem
          onClick={() => {
            onClose();
            onLogout();
          }}
        >
          <LogoutOutlinedIcon sx={{ mr: 1 }} />
          {t("Logout")}
        </MenuItem>
      )}
    </Menu>
  );
};

export default MobileMenu;
