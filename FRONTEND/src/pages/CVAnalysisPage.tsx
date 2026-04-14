import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useFile } from "../hooks/useFile";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CVAnalysisDashboard from "../features/CVAnalysis/CVAnalysisDashboard";

const CVAnalysisPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<any>();
  const { uploadedFile, setUploadedFile } = useFile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
  };

  return (
    <Box sx={{ bgcolor: "#f5f4ef", minHeight: "100vh", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#1a1a18",
              fontFamily: '"DM Serif Display", serif',
              mb: 2,
            }}
          >
            {t("AI Resume Analyzer")}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#6b6b66",
              maxWidth: 700,
              mx: "auto",
              fontWeight: "normal",
            }}
          >
            {t(
              "Upload your CV for a comprehensive AI review. Discover your ATS score, get actionable suggestions, and prepare with tailored interview questions.",
            )}
          </Typography>
        </Box>

        {!uploadedFile ? (
          <Box sx={{ maxWidth: 800, mx: "auto", animation: "fadeIn 0.5s" }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 8 },
                borderRadius: "24px",
                border: "2px dashed rgba(42, 92, 69, 0.3)",
                bgcolor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": {
                  borderColor: "#2a5c45",
                  bgcolor: "rgba(42, 92, 69, 0.02)",
                },
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <CloudUploadOutlinedIcon
                sx={{ fontSize: 80, color: "#2a5c45", mb: 3 }}
              />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#1a1a18", mb: 1 }}
              >
                {t("Click to upload your resume")}
              </Typography>
              <Typography sx={{ color: "#6b6b66", mb: 4 }}>
                {t("Supported formats: PDF, DOCX (Max 5MB)")}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#2a5c45",
                  color: "white",
                  px: 6,
                  py: 1.5,
                  borderRadius: "12px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(42,92,69,0.2)",
                  "&:hover": { bgcolor: "#1e4332" },
                }}
              >
                {t("Browse Files")}
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
            </Paper>
          </Box>
        ) : (
          <Box sx={{ animation: "fadeIn 0.5s" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography sx={{ color: "#6b6b66", fontWeight: "bold" }}>
                Analyzing:{" "}
                <span style={{ color: "#2a5c45" }}>{uploadedFile.name}</span>
              </Typography>
              <Button
                variant="outlined"
                onClick={clearFile}
                sx={{
                  color: "#c25b1a",
                  borderColor: "rgba(194, 91, 26, 0.5)",
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  "&:hover": {
                    borderColor: "#c25b1a",
                    bgcolor: "rgba(194, 91, 26, 0.05)",
                  },
                }}
              >
                {t("Analyze Another File")}
              </Button>
            </Box>
            <CVAnalysisDashboard uploadedFile={uploadedFile} />
          </Box>
        )}
      </Container>

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

export default CVAnalysisPage;
