import { useState, useEffect } from "react";
import { Box, Typography, Button, Chip, LinearProgress } from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { USER_ENDPOINTS } from "../../../constants/endpoints";

interface PlanInfo {
  plan: string;
  expiresAt: string;
  daysLeft: number;
}

const PlanTab = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [planInfo, setPlanInfo] = useState<PlanInfo | null>(null);

  useEffect(() => {
    axios
      .get(USER_ENDPOINTS.plan, { withCredentials: true })
      .then((r) => setPlanInfo(r.data))
      .catch(() => {});
  }, []);

  if (!planInfo) return null;

  const planProgress = Math.min(100, (planInfo.daysLeft / 30) * 100);

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "grey.50",
          borderRadius: 2,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 0.5,
            }}
          >
            <Chip
              label={planInfo.plan.toUpperCase()}
              size="small"
              color="primary"
            />
            <Typography fontWeight={500}>
              {planInfo.daysLeft} {t("days left")}
            </Typography>
          </Box>
          <Typography fontSize={12} color="text.secondary">
            {t("Renews")}{" "}
            {new Date(planInfo.expiresAt).toLocaleDateString()}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={planProgress}
            sx={{ mt: 1, borderRadius: 2, height: 5, width: 200 }}
          />
        </Box>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate("/pricing")}
        >
          {t("Manage")}
        </Button>
      </Box>
    </Box>
  );
};

export default PlanTab;
