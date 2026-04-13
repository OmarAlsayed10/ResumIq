import { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { getDosAndDonts, getBestPractices } from "../constants/tipsData";
import { theme } from "../utils/theme";

const CVTipsSection = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event, newValue) => {
    setActiveTab(newValue);
  };

  const { dos, donts } = getDosAndDonts(t);
  const { formatTips, contentTips } = getBestPractices(t);

  return (
    <Box
      sx={{
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.gray",
          width: "100%",
          height: "200px",
          mb: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            background:
              "linear-gradient(to right, rgba(107, 36, 155, 0.84), rgba(247, 61, 201, 0.79),  rgba(233, 155, 38, 0.77))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            mb: 2,
          }}
        >
          {t("CV Tips & Best Practices")}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            color: "text.secondary",
            fontSize: "18px",
            textAlign: "center",
          }}
        >
          {t(
            "Expert advice to help you create a standout CV that gets results",
          )}
        </Typography>
      </Box>
      <Paper
        sx={{
          mb: 3,
          bgcolor: theme.palette.background.default,
          height: 40,
          maxWidth: 800,
          mx: "auto",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            height: "100%",

            minHeight: "unset",
            "& .MuiTabs-flexContainer": {
              display: "flex",
              justifyContent: "space-between",
              height: "100%",
            },
            "& .MuiTab-root": {
              fontWeight: 600,
              flex: 1,
              maxWidth: "none",
              textTransform: "none",
              height: "100%",
              minHeight: "unset",
              padding: 0,
              margin: 0,
              "&.Mui-selected": {
                color: "primary.main",
                bgcolor: "white",
                borderRadius: 2,
              },
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          <Tab label={t("Dos & Don'ts")} />
          <Tab label={t("Best Practices")} />
        </Tabs>
      </Paper>

      <Paper
        sx={{
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {activeTab === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ mb: 2, color: "green" }}>
                {t("CV Dos")}
              </Typography>
              <List>
                {dos.map((item) => (
                  <ListItem key={item} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary={item} sx={{ textAlign: "start" }} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, color: theme.palette.error.main }}
              >
                {t("CV Don'ts")}
              </Typography>
              <List>
                {donts.map((item) => (
                  <ListItem key={item} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CloseIcon sx={{ color: "red" }} />
                    </ListItemIcon>
                    <ListItemText primary={item} sx={{ textAlign: "start" }} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {t("Format Tips")}
              </Typography>
              <List>
                {formatTips.map((item) => (
                  <ListItem key={item} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckIcon />
                    </ListItemIcon>
                    <ListItemText primary={item} sx={{ textAlign: "start" }} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {t("Content Tips")}
              </Typography>
              <List>
                {contentTips.map((item) => (
                  <ListItem key={item} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckIcon />
                    </ListItemIcon>
                    <ListItemText primary={item} sx={{ textAlign: "start" }} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CVTipsSection;
