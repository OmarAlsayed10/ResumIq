import { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CircularProgress,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cvAnalyzeAction } from "../../redux/store/slices/cvAnalyzeSlice";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import { useTranslation } from "react-i18next";

interface CVAnalysisDashboardProps {
  uploadedFile: File;
}

const CVAnalysisDashboard = ({ uploadedFile }: CVAnalysisDashboardProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<any>();
  const analyzeState = useSelector((state: any) => state.cvAnalyze);
  const cvAnalyze = analyzeState?.cvAnalyze;
  const loading = analyzeState?.loading;

  useEffect(() => {
    if (uploadedFile) {
      dispatch(cvAnalyzeAction(uploadedFile));
    }
  }, [dispatch, uploadedFile]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 12,
        }}
      >
        <CircularProgress size={64} sx={{ color: "#2a5c45", mb: 3 }} />
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#1a1a18", mb: 1 }}
        >
          {t("Analyzing your resume...")}
        </Typography>
        <Typography sx={{ color: "#6b6b66" }}>
          {t("Our AI is cross-referencing your CV against industry standards.")}
        </Typography>
      </Box>
    );
  }

  if (!cvAnalyze) {
    return null;
  }

  const score = cvAnalyze.atsScore || 0;
  let scoreColor = "#e65100";
  let scoreText = t("Needs Work");
  if (score >= 75) {
    scoreColor = "#2a5c45";
    scoreText = t("Excellent");
  } else if (score >= 50) {
    scoreColor = "#c25b1a";
    scoreText = t("Average");
  }

  return (
    <Box sx={{ animation: "fadeIn 0.6s" }}>
      {/* SCORE SECTION */}
      <Card
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: "24px",
          border: "1px solid rgba(26,26,24,0.1)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={150}
            thickness={4}
            sx={{ color: "rgba(0,0,0,0.05)" }}
          />
          <CircularProgress
            variant="determinate"
            value={score}
            size={150}
            thickness={4}
            sx={{ color: scoreColor, position: "absolute", left: 0 }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: scoreColor,
                fontWeight: "bold",
                fontFamily: '"DM Serif Display", serif',
              }}
            >
              {score}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Chip
            label={scoreText}
            sx={{
              bgcolor: `${scoreColor}22`,
              color: scoreColor,
              fontWeight: "bold",
              px: 2,
              py: 2,
              fontSize: "1.1rem",
              borderRadius: "12px",
              mb: 2,
            }}
          />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 1, color: "#1a1a18" }}
          >
            {t("ATS Compatibility Score")}
          </Typography>
          <Typography
            sx={{ color: "#6b6b66", maxWidth: 500, fontSize: "1.05rem" }}
          >
            {t(
              "Your resume score indicates how well it is parsed by Applicant Tracking Systems. Aim for 75+ to ensure maximum visibility to recruiters.",
            )}
          </Typography>
        </Box>
      </Card>

      <Grid container spacing={4}>
        {/* LEFT COLUMN: FEEDBACK */}
        <Grid item xs={12} lg={6}>
          <Card
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "24px",
              border: "1px solid rgba(26,26,24,0.1)",
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 3,
                fontFamily: '"DM Serif Display", serif',
              }}
            >
              {t("Detailed Feedback")}
            </Typography>

            {cvAnalyze.positiveFeedback?.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#2a5c45",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CheckCircleOutlineIcon /> {t("Strengths")}
                </Typography>
                {cvAnalyze.positiveFeedback.map((item: string, i: number) => (
                  <Box
                    key={i}
                    sx={{
                      p: 2,
                      mb: 1.5,
                      bgcolor: "rgba(42, 92, 69, 0.05)",
                      borderLeft: "4px solid #2a5c45",
                      borderRadius: "4px 8px 8px 4px",
                    }}
                  >
                    <Typography sx={{ color: "#1a1a18" }}>{item}</Typography>
                  </Box>
                ))}
              </Box>
            )}

            {cvAnalyze.negativeFeedback?.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#b71c1c",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ErrorOutlineIcon /> {t("Critical Issues")}
                </Typography>
                {cvAnalyze.negativeFeedback.map((item: string, i: number) => (
                  <Box
                    key={i}
                    sx={{
                      p: 2,
                      mb: 1.5,
                      bgcolor: "rgba(183, 28, 28, 0.05)",
                      borderLeft: "4px solid #b71c1c",
                      borderRadius: "4px 8px 8px 4px",
                    }}
                  >
                    <Typography sx={{ color: "#1a1a18" }}>{item}</Typography>
                  </Box>
                ))}
              </Box>
            )}

            {cvAnalyze.neutralFeedback?.length > 0 && (
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#c25b1a",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <InfoOutlinedIcon /> {t("Warnings & Tips")}
                </Typography>
                {cvAnalyze.neutralFeedback.map((item: string, i: number) => (
                  <Box
                    key={i}
                    sx={{
                      p: 2,
                      mb: 1.5,
                      bgcolor: "rgba(194, 91, 26, 0.05)",
                      borderLeft: "4px solid #c25b1a",
                      borderRadius: "4px 8px 8px 4px",
                    }}
                  >
                    <Typography sx={{ color: "#1a1a18" }}>{item}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Card>
        </Grid>

        {/* RIGHT COLUMN: SUGGESTIONS & INTERVIEW QUESTIONS */}
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              height: "100%",
            }}
          >
            {/* SUGGESTIONS */}
            <Card
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "24px",
                border: "1px solid rgba(26,26,24,0.1)",
                flexGrow: 1,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  fontFamily: '"DM Serif Display", serif',
                }}
              >
                {t("Actionable Suggestions")}
              </Typography>
              {cvAnalyze.sectionsToImprove?.length > 0 ? (
                cvAnalyze.sectionsToImprove.map((sugg: any, i: number) => (
                  <Box key={i} sx={{ mb: 3 }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "#1a1a18",
                        mb: 0.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <LightbulbOutlinedIcon
                        sx={{ color: "#2a5c45", fontSize: 20 }}
                      />{" "}
                      {sugg.section}
                    </Typography>
                    <Typography sx={{ color: "#6b6b66", ml: 3.5 }}>
                      {sugg.suggestion}
                    </Typography>
                    {i < cvAnalyze.sectionsToImprove.length - 1 && (
                      <Divider sx={{ mt: 3, opacity: 0.5 }} />
                    )}
                  </Box>
                ))
              ) : (
                <Typography sx={{ color: "#6b6b66" }}>
                  {t("No specific section improvements suggested.")}
                </Typography>
              )}
            </Card>

            {/* INTERVIEW QUESTIONS */}
            <Card
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "24px",
                border: "1px solid rgba(26,26,24,0.1)",
                backgroundColor: "#2a5c45",
                color: "white",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  fontFamily: '"DM Serif Display", serif',
                  color: "white",
                }}
              >
                {t("Prepare for the Interview")}
              </Typography>
              <Typography sx={{ mb: 3, opacity: 0.9 }}>
                {t(
                  "Based on your resume, employers might ask you these questions:",
                )}
              </Typography>
              {cvAnalyze.interviewQuestions?.length > 0 ? (
                cvAnalyze.interviewQuestions.map(
                  (question: string, i: number) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        gap: 2,
                        mb: 2,
                        alignItems: "flex-start",
                      }}
                    >
                      <QuestionAnswerOutlinedIcon
                        sx={{ opacity: 0.7, mt: 0.5 }}
                      />
                      <Typography
                        sx={{ fontWeight: "bold", fontSize: "1.05rem" }}
                      >
                        {question}
                      </Typography>
                    </Box>
                  ),
                )
              ) : (
                <Typography sx={{ opacity: 0.8 }}>
                  {t("Not enough data to generate questions.")}
                </Typography>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CVAnalysisDashboard;
