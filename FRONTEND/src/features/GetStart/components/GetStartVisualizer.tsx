import { Box, Typography, Paper, Button, Skeleton } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StepData } from "../hooks/useGetStartSteps";

interface GetStartVisualizerProps {
  activeStep: number;
  activeData: StepData;
}

export const GetStartVisualizer = ({ activeStep, activeData }: GetStartVisualizerProps) => {
  const { t } = useTranslation();

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 6 },
        borderRadius: "24px",
        border: "1px solid rgba(26,26,24,0.1)",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        minHeight: 450,
      }}
    >
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", mb: 5 }}>
        {activeStep === 0 && (
          <Box sx={{ py: 6, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(42, 92, 69, 0.02)", borderRadius: 4, animation: "fadeIn 0.5s" }}>
            <Paper elevation={3} sx={{ p: 4, width: 220, height: 280, borderRadius: 2 }}>
              <Skeleton variant="rectangular" height={24} sx={{ mb: 3, borderRadius: 1 }} />
              <Skeleton variant="text" width="50%" sx={{ mb: 4 }} />
              <Skeleton variant="rectangular" height={40} sx={{ mb: 2, borderRadius: 1 }} />
              <Skeleton variant="rectangular" height={40} sx={{ mb: 2, borderRadius: 1 }} />
              <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
            </Paper>
          </Box>
        )}
        {activeStep === 1 && (
          <Box sx={{ py: 8, px: 4, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(42, 92, 69, 0.02)", borderRadius: 4, position: "relative", animation: "fadeIn 0.5s" }}>
            <Paper elevation={1} sx={{ p: 4, borderRadius: 3, border: "1px solid #e0e0e0", width: "100%", maxWidth: 450 }}>
              <Typography sx={{ color: "#6b6b66", fontSize: "1.2rem", lineHeight: 1.8 }}>
                I <span style={{ textDecoration: 'line-through', color: '#c25b1a', opacity: 0.6 }}>done</span> <span style={{ color: '#2a5c45', fontWeight: 'bold' }}>completed</span> the project <span style={{ textDecoration: 'line-through', color: '#c25b1a', opacity: 0.6 }}>good</span> <span style={{ color: '#2a5c45', fontWeight: 'bold' }}>successfully</span>.
              </Typography>
            </Paper>
            <Box sx={{ position: "absolute", right: 20, top: 20, bgcolor: "#2a5c45", color: "white", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", boxShadow: "0 4px 12px rgba(42,92,69,0.3)" }}>
              <AutoFixHighIcon />
            </Box>
          </Box>
        )}
        {activeStep === 2 && (
          <Box sx={{ py: 8, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(42, 92, 69, 0.02)", borderRadius: 4, position: "relative", animation: "fadeIn 0.5s" }}>
            <Paper elevation={2} sx={{ p: 4, width: 280, borderRadius: 3, textAlign: "center", border: "1px solid rgba(42, 92, 69, 0.1)" }}>
              <Box sx={{ position: "relative", display: "inline-flex", mb: 2 }}>
                <CircularProgress variant="determinate" value={85} size={90} thickness={4} sx={{ color: "#2a5c45" }} />
                <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography variant="h5" component="div" sx={{ color: "#2a5c45", fontWeight: "bold" }}>85</Typography>
                </Box>
              </Box>
              <Typography variant="h6" sx={{ color: "#1a1a18", fontWeight: "bold", mb: 1 }}>{t("Exceptional")}</Typography>
              <Typography variant="body2" sx={{ color: "#6b6b66" }}>{t("Your resume is well-optimized for ATS systems.")}</Typography>
            </Paper>
          </Box>
        )}
      </Box>

      <Box sx={{ maxWidth: 600, mx: "auto", textAlign: "center", width: "100%" }}>
        <Typography sx={{ color: "#6b6b66", fontSize: "1.1rem", mb: 4, minHeight: 60 }}>
          {activeData.subtitle}
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={activeData.onClick}
          sx={{
            py: 2,
            borderRadius: "8px",
            bgcolor: "#2a5c45",
            "&:hover": { bgcolor: "#1e4332", boxShadow: "none" },
            boxShadow: "none",
            fontWeight: "bold",
            fontSize: "1.1rem"
          }}
        >
          {activeData.action}
        </Button>
      </Box>
    </Paper>
  );
};
