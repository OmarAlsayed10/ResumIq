import { Box } from "@mui/material";
import { useGetStartSteps } from "./hooks/useGetStartSteps";
import { GetStartHeader } from "./components/GetStartHeader";
import { GetStartMenu } from "./components/GetStartMenu";
import { GetStartVisualizer } from "./components/GetStartVisualizer";

const GetStarted = () => {
  const {
    steps,
    activeStep,
    setActiveStep,
  } = useGetStartSteps();

  const activeData = steps[activeStep];

  return (
    <Box sx={{ bgcolor: "#f5f4ef", minHeight: "100vh", py: { xs: 6, md: 10 } }}>
      <GetStartHeader />

      <Box sx={{ maxWidth: "1100px", mx: "auto", px: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <GetStartMenu 
            steps={steps} 
            activeStep={activeStep} 
            onStepChange={setActiveStep} 
          />
          <GetStartVisualizer 
            activeStep={activeStep}
            activeData={activeData}
          />
        </Box>
      </Box>


      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default GetStarted;
