import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  Button,
  Paper,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { GrammarIssue } from "../hooks/useGrammarCheck";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

interface GrammarCheckResultsProps {
  error: string;
  isLoading: boolean;
  grammarResult: any;
  selectedTab: string;
  setSelectedTab: (val: string) => void;
  issues: GrammarIssue[];
  filteredIssues: GrammarIssue[];
  handleFix: (wrong: string, correct: string, id: string) => void;
}

export const GrammarCheckResults = ({
  error,
  isLoading,
  grammarResult,
  selectedTab,
  setSelectedTab,
  issues,
  filteredIssues,
  handleFix,
}: GrammarCheckResultsProps) => {
  const { t } = useTranslation();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "24px",
        border: "1px solid rgba(26,26,24,0.1)",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#ffffff",
        minHeight: "500px",
      }}
    >
      <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold", fontFamily: '"DM Serif Display", serif', mb: 2 }}>
        {t("resultTitle", "Analysis Results")}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ borderRadius: "12px", mb: 3 }}>
          {error}
        </Alert>
      )}

      {!grammarResult && !isLoading && !error && (
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", opacity: 0.6 }}>
          <AutoFixHighIcon sx={{ fontSize: 60, color: "#2a5c45", mb: 2 }} />
          <Typography sx={{ fontSize: "1.05rem", maxWidth: 250, color: "#1a1a18" }}>
            {t("promptToCheck", "Click 'Check Grammar' to let our AI scan your text for errors.")}
          </Typography>
        </Box>
      )}

      {isLoading && (
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress sx={{ color: "#2a5c45" }} />
        </Box>
      )}

      {grammarResult && !isLoading && (
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Tabs
            value={selectedTab}
            onChange={(_e, newValue) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: "40px",
              mb: 3,
              borderBottom: "1px solid rgba(0,0,0,0.05)",
              "& .MuiTabs-indicator": { backgroundColor: "#2a5c45", height: "3px", borderRadius: "3px 3px 0 0" },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: "bold",
                color: "#6b6b66",
                minHeight: "40px",
                fontSize: "1rem",
                "&.Mui-selected": { color: "#2a5c45" },
              },
            }}
          >
            <Tab label={`All (${issues.length})`} value="All" />
            <Tab label={t("grammar")} value="Grammar" />
            <Tab label={t("spelling")} value="Spelling" />
            <Tab label={t("punctuation")} value="Punctuation" />
            <Tab label={t("style")} value="Style" />
          </Tabs>

          <Box sx={{ flexGrow: 1, pr: 1 }}>
            {filteredIssues.length === 0 ? (
              <Box sx={{ py: 6, textAlign: "center" }}>
                <Typography sx={{ fontSize: "1.1rem", color: "#6b6b66", mb: 1 }}>{t("noIssuesFound", "No issues found!")}</Typography>
                <Typography sx={{ fontSize: "0.95rem", color: "#2a5c45", fontWeight: "bold" }}>Your text looks perfect.</Typography>
              </Box>
            ) : (
              filteredIssues.map((issue) => {
                const [wrong, correct] = issue.suggestion.split("→").map((str) => str.trim());

                return (
                  <Card
                    elevation={0}
                    key={issue.id}
                    sx={{ mb: 2, backgroundColor: "#fdfbf7", border: "1px solid rgba(26,26,24,0.08)", borderRadius: "16px", transition: "0.2s", "&:hover": { borderColor: "rgba(42,92,69,0.3)" } }}
                  >
                    <CardContent sx={{ p: 2, pb: "16px !important" }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                        <Chip
                          label={t(issue.type.toLowerCase())}
                          size="small"
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            borderRadius: "6px",
                            backgroundColor:
                              issue.type === "Grammar" ? "#fdecea" : issue.type === "Punctuation" ? "#e8f4fd" : issue.type === "Spelling" ? "#fff3e0" : "#e9f7ef",
                            color:
                              issue.type === "Grammar" ? "#b71c1c" : issue.type === "Punctuation" ? "#0d47a1" : issue.type === "Spelling" ? "#e65100" : "#1b5e20",
                          }}
                        />
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: "0.8rem",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "8px",
                            color: "#2a5c45",
                            borderColor: "rgba(42,92,69,0.3)",
                            textTransform: "none",
                            fontWeight: "bold",
                            "&:hover": { bgcolor: "rgba(42,92,69,0.05)", borderColor: "#2a5c45" },
                          }}
                          onClick={() => handleFix(wrong, correct, issue.id)}
                        >
                          {t("fix")}
                        </Button>
                      </Box>

                      <Typography sx={{ fontSize: "1.05rem", lineHeight: 1.6, color: "#1a1a18" }}>
                        <span style={{ textDecoration: "line-through", color: "#c25b1a", opacity: 0.7, marginRight: "4px" }}>
                          {wrong}
                        </span>
                        <span style={{ color: "#6b6b66", margin: "0 4px" }}>→</span>
                        <span style={{ color: "#2a5c45", fontWeight: "bold", marginLeft: "4px" }}>
                          {correct}
                        </span>
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </Box>
        </Box>
      )}
    </Paper>
  );
};
