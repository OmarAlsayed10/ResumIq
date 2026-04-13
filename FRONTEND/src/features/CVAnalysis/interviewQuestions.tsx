import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

function InterviewQuestions() {
  const [questions, setQuestions] = useState([]);
  const theme = useTheme();

  const analyzeData = useSelector((state: any) => state.cvAnalyze);
  const loading = useSelector((state: any) => state.cvAnalyze.loading);

  useEffect(() => {
    if (analyzeData?.cvAnalyze) {
      setQuestions(analyzeData.cvAnalyze.interviewQuestions || []);
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
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
            Interview Questions Suggestions
          </Typography>

          {questions.length > 0 ? (
            questions.map((question, index) => (
              <Box
                key={index}
                sx={{
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: 3,
                  p: 3,
                  mb: 2,
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ mt: 2, ml: 4, color: "text.secondary" }}
                >
                  {question}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              No questions available at the moment.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}

export default InterviewQuestions;
