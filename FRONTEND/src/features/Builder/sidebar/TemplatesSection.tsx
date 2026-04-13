import { useState } from "react";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AIWritingAssistDialog from "./component/AIWritingAssist";
import ChooseTemplateDialog from "./component/chooseTemplate";
import { Box, Button } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import ProWarning from "../../../components/ui/ProWarning";

function TemplatesSection() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const dialogKey = 0;
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const { user } = useAuth();
  const isPro = user.role === "pro user";
  const handleClickOpen = () => {
    if (isPro) {
      setOpen(true);
    } else {
      setOpenPaymentDialog(true);
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
          px: 2,
          bgcolor: "white",
          borderRadius: 2,
          border: "1px solid #ccc",
        }}
      >
        <Button
          sx={{ my: 1 }}
          onClick={handleClickOpen2}
          variant="outlined"
          startIcon={<ViewModuleIcon />}
          fullWidth
        >
          Choose Template
        </Button>

        <ChooseTemplateDialog
          open={open2}
          onClose={handleClose2}
          key={dialogKey}
        />

        <Button
          sx={{ my: 1 }}
          onClick={handleClickOpen}
          variant="outlined"
          startIcon={<AutoFixHighIcon />}
          fullWidth
        >
          AI Writing Assistant
        </Button>

        <AIWritingAssistDialog
          open={open}
          onClose={handleClose}
          selectedValue={""}
        />

        <ProWarning
          openPaymentDialog={openPaymentDialog}
          setOpenPaymentDialog={setOpenPaymentDialog}
        ></ProWarning>
      </Box>
    </>
  );
}

export default TemplatesSection;
