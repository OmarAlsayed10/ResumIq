import { Box, Typography } from "@mui/material";
import { StepData } from "../hooks/useGetStartSteps";

interface GetStartMenuProps {
  steps: StepData[];
  activeStep: number;
  onStepChange: (index: number) => void;
}

export const GetStartMenu = ({ steps, activeStep, onStepChange }: GetStartMenuProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "center", gap: 3 }}>
      {steps.map((step, index) => {
        const isActive = activeStep === index;
        return (
          <Box
            key={index}
            onClick={() => onStepChange(index)}
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              cursor: "pointer",
              p: 2.5,
              borderRadius: "16px",
              transition: "all 0.3s ease",
              bgcolor: isActive ? "white" : "transparent",
              boxShadow: isActive ? "0 8px 24px rgba(42, 92, 69, 0.08)" : "none",
              border: isActive ? "1px solid rgba(42, 92, 69, 0.2)" : "1px solid transparent",
              "&:hover": { bgcolor: isActive ? "white" : "rgba(0,0,0,0.02)" }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24 }}>
              <Box sx={{ 
                width: isActive ? 20 : 14, 
                height: isActive ? 20 : 14, 
                borderRadius: "50%", 
                bgcolor: isActive ? "#2a5c45" : "rgba(0,0,0,0.15)", 
                transition: "all 0.3s ease" 
              }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"DM Serif Display", serif',
                  color: isActive ? "#2a5c45" : "#1a1a18",
                  transition: "0.3s",
                  fontSize: isActive ? "1.4rem" : "1.2rem",
                }}
              >
                {step.title}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
