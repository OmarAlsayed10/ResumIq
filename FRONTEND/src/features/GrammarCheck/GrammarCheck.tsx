import { Box, Container } from "@mui/material";
import { useGrammarCheck } from "./hooks/useGrammarCheck";
import { GrammarCheckHeader } from "./components/GrammarCheckHeader";
import { GrammarCheckInput } from "./components/GrammarCheckInput";
import { GrammarCheckResults } from "./components/GrammarCheckResults";

const GrammarCheck = () => {
  const {
    grammarText,
    handleContentChange,
    handleClear,
    handleCheckGrammar,
    isLoading,
    isButtonVisible,
    error,
    grammarResult,
    selectedTab,
    setSelectedTab,
    issues,
    filteredIssues,
    handleFix,
  } = useGrammarCheck();

  return (
    <Box sx={{ bgcolor: "#f5f4ef", minHeight: "100vh", py: { xs: 4, md: 6 } }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 8, xl: 12 } }}>
        <GrammarCheckHeader />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 5, mt: 4 }}>
          <Box sx={{ width: "100%" }}>
            <GrammarCheckInput
              grammarText={grammarText}
              handleContentChange={handleContentChange}
              handleClear={handleClear}
              handleCheckGrammar={handleCheckGrammar}
              isLoading={isLoading}
              isButtonVisible={isButtonVisible}
            />
          </Box>

          <Box sx={{ width: "100%" }}>
            <GrammarCheckResults
              error={error}
              isLoading={isLoading}
              grammarResult={grammarResult}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              issues={issues}
              filteredIssues={filteredIssues}
              handleFix={handleFix}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default GrammarCheck;
