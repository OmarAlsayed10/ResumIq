import { Box, Button, Paper, TextField, CircularProgress } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useTranslation } from "react-i18next";

interface GrammarCheckInputProps {
  grammarText: string;
  handleContentChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleClear: () => void;
  handleCheckGrammar: () => void;
  isLoading: boolean;
  isButtonVisible: boolean;
}

export const GrammarCheckInput = ({
  grammarText,
  handleContentChange,
  handleClear,
  handleCheckGrammar,
  isLoading,
  isButtonVisible,
}: GrammarCheckInputProps) => {
  const { t } = useTranslation();

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: "24px",
        border: "1px solid rgba(26,26,24,0.1)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "white",
      }}
    >
      <TextField
        multiline
        rows={16}
        variant="outlined"
        fullWidth
        placeholder={t("inputPlaceholder")}
        value={grammarText}
        onChange={handleContentChange}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            bgcolor: "#fdfbf7",
            fontSize: "1.05rem",
            lineHeight: 1.6,
            "& fieldset": { borderColor: "rgba(0,0,0,0.06)" },
            "&:hover fieldset": { borderColor: "rgba(0,0,0,0.15)" },
            "&.Mui-focused fieldset": { borderColor: "#2a5c45", borderWidth: "2px" },
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          mt: 3,
          pt: 3,
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Button
          variant="text"
          onClick={handleClear}
          sx={{
            color: "#c25b1a",
            fontWeight: "bold",
            textTransform: "none",
            px: 2,
            "&:hover": { bgcolor: "rgba(194, 91, 26, 0.05)" },
          }}
        >
          {t("clear")}
        </Button>
        <Button
          variant="contained"
          onClick={handleCheckGrammar}
          disabled={isLoading || !isButtonVisible}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <AutoFixHighIcon />}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: "12px",
            bgcolor: "#2a5c45",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1.05rem",
            boxShadow: "0 4px 12px rgba(42,92,69,0.2)",
            "&:hover": { bgcolor: "#1e4332", boxShadow: "0 6px 16px rgba(42,92,69,0.3)" },
            "&:disabled": { bgcolor: "rgba(42,92,69,0.5)", color: "white" },
          }}
        >
          {isLoading ? t("Checking...") : t("checkGrammar")}
        </Button>
      </Box>
    </Paper>
  );
};
