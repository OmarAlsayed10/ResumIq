import { useState } from "react";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AIWritingAssistDialog from "./component/AIWritingAssist";
import ChooseTemplateDialog from "./component/chooseTemplate";
import { Box, Button } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function TemplatesSection() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const dialogKey = 0;
  const navigate = useNavigate();
  const { user } = useAuth();
  const isPro = user.role === "pro user";
  const handleClickOpen = () => {
    if (isPro) {
      setOpen(true);
    } else {
      navigate("/pricing");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  return (
    <>
      <Box
        sx={{
          py: 2,
          px: 3,
          bgcolor: "white",
          borderRadius: 4,
          border: "1px solid rgba(26,26,24,0.1)",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Button
          onClick={handleClickOpen2}
          variant="outlined"
          startIcon={<ViewModuleIcon />}
          sx={{ flex: 1, borderRadius: 2, py: 1.5, borderColor: '#dcdcdc', color: '#1a1a18' }}
        >
          Choose Template
        </Button>

        <ChooseTemplateDialog
          open={open2}
          onClose={handleClose2}
          key={dialogKey}
        />

        <Button
          onClick={handleClickOpen}
          variant="contained"
          startIcon={<AutoFixHighIcon />}
          sx={{ flex: 1, borderRadius: 2, py: 1.5, bgcolor: '#2a5c45', boxShadow: 'none', '&:hover': { bgcolor: '#1a3c2d', boxShadow: 'none' } }}
        >
          AI Writing Assistant
        </Button>

        <AIWritingAssistDialog
          open={open}
          onClose={handleClose}
          selectedValue={""}
        />

      </Box>
    </>
  );
}

export default TemplatesSection;
