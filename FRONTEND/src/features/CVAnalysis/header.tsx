import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BorderLinearProgress } from "./linearProgress";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

function Header() {
  const [cvScore, setCvScore] = useState(0);
  const analyzeData = useSelector((state: any) => state.cvAnalyze);
  const loading = useSelector((state: any) => state.cvAnalyze.loading);

  useEffect(() => {
    if (analyzeData?.cvAnalyze?.atsScore) {
      setCvScore(analyzeData.cvAnalyze.atsScore);
    }
  }, [analyzeData]);

  return (
    <Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h5" sx={{ my: 1 }}>
            CV Analysis Results
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontSize: 18, my: 2 }}>
              CV Score
            </Typography>
            <Typography variant="h6" sx={{ fontSize: 18 }}>
              {cvScore}/100
            </Typography>
          </Box>

          <BorderLinearProgress variant="determinate" value={cvScore} />
        </>
      )}
    </Box>
  );
}

export default Header;
