import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import LockIcon from "@mui/icons-material/Lock";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";

import ProfileTab from "./components/ProfileTab";
import PlanTab from "./components/PlanTab";
import CvsTab from "./components/CvsTab";

type Tab = "profile" | "plan" | "cv";

const NAV: {
  id: Tab;
  label: string;
  icon: React.ReactNode;
  danger?: boolean;
}[] = [
  { id: "profile", label: "Profile", icon: <PersonIcon fontSize="small" /> },
  { id: "cv", label: "My CVs", icon: <DescriptionIcon fontSize="small" /> },
  { id: "plan", label: "Plan", icon: <StarIcon fontSize="small" /> },
];

const Settings = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const query = new URLSearchParams(window.location.search);
  const defaultTab = (query.get("tab") as Tab) || "profile";
  const [tab, setTab] = useState<Tab>(defaultTab);

  const filteredNav = NAV.filter(item => {
    if (item.id === "plan" && user?.role !== "pro user") {
      return false;
    }
    return true;
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, px: 2, height: "80vh", pb: 4 }}>
      <Paper
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: 1200,
          borderRadius: 3,
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: 160,
            borderRight: "1px solid",
            borderColor: "divider",
            py: 2,
            flexShrink: 0,
          }}
        >
          {filteredNav.map(({ id, label, icon, danger }) => (
            <Box
              key={id}
              onClick={() => setTab(id)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                fontSize: 13,
                cursor: "pointer",
                borderLeft: "2px solid",
                borderLeftColor: tab === id ? "primary.main" : "transparent",
                bgcolor: tab === id ? "primary.50" : "transparent",
                color: danger
                  ? "error.main"
                  : tab === id
                    ? "primary.main"
                    : "text.secondary",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              {icon}
              <Typography fontSize={13}>{t(label)}</Typography>
            </Box>
          ))}
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
          {tab === "profile" && <ProfileTab />}
          {tab === "cv" && <CvsTab />}
          {tab === "plan" && <PlanTab />}
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
