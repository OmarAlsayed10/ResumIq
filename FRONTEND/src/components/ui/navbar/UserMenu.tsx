import * as React from "react";
import {
  Box,
  IconButton,
  Typography,
  MenuItem,
  Switch,
  Popover,
  Avatar,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
  user: any;
  onLogout: () => void;
}

const UserMenu = ({ user, onLogout }: UserMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language;

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === "en" ? "ar" : "en");
  };

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ p: 0, marginInlineEnd: 2 }}>
        <Avatar src={user?.photo || ""}>
          {user?.firstName?.[0]?.toUpperCase() ||
            user?.email?.[0]?.toUpperCase()}
        </Avatar>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 1.5 }}
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          {/* User info header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              pb: 1.5,
              mb: 1,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Avatar
              src={user?.photo || ""}
              sx={{ width: 40, height: 40 }}
            >
              {user?.firstName?.[0]?.toUpperCase() ||
                user?.email?.[0]?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography fontSize={14} fontWeight={600}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Box>
          <MenuItem>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography sx={{ fontSize: "14px", mx: 1 }}>
                {currentLang === "ar" ? "ع" : "En"}
              </Typography>
              <Switch
                checked={currentLang === "ar"}
                onChange={() => {
                  toggleLanguage();
                  handleClose();
                }}
                color="primary"
              />
            </Box>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/settings");
            }}
          >
            <SettingsIcon sx={{ mr: 1 }} />
            {t("Settings")}
          </MenuItem>
          <MenuItem
            onClick={() => {
              onLogout();
              handleClose();
            }}
          >
            <LogoutOutlinedIcon sx={{ mr: 1 }} />
            {t("Logout")}
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
};

export default UserMenu;
