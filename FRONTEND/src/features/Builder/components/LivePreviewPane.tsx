import { Box } from "@mui/material";
import Preview from "../Preview";

export const LivePreviewPane = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        overflow: "visible",
      }}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: "white",
        }}
      >
        <Preview />
      </Box>
    </Box>
  );
};
