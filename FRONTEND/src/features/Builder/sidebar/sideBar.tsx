import { Box } from "@mui/material";
import TemplatesSection from "./TemplatesSection";
import PastCVsSection from "./PastCVsSection";

function SideBar() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box>
        <TemplatesSection></TemplatesSection>
      </Box>
      <Box>
        <PastCVsSection></PastCVsSection>
      </Box>
    </Box>
  );
}

export default SideBar;
