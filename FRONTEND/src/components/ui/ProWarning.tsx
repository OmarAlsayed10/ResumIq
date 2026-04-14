import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Divider,
  Slide,
} from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useTranslation } from "react-i18next";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProWarning({ openPaymentDialog, setOpenPaymentDialog }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigateToPayment = () => {
    setOpenPaymentDialog(false);
    navigate("/payment-check");
  };
  return (
    <Dialog
      open={openPaymentDialog}
      onClose={() => setOpenPaymentDialog(false)}
      maxWidth="xs"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 5,
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 20px 45px rgba(0,0,0,0.25)",
          px: 3,
          py: 2,
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
        <Box
          sx={{
            background: "radial-gradient(circle, #FFF8DC 40%, transparent 70%)",
            borderRadius: "50%",
            p: 1,
          }}
        >
          <StarRoundedIcon
            sx={{
              fontSize: 60,
              color: "#FFD700",
              filter: "drop-shadow(0 0 8px #FFD700)",
            }}
          />
        </Box>
      </Box>

      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 800,
          fontSize: 24,
          color: "#222",
          mt: 1,
        }}
      >
        {t("Unlock Pro Features")}
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center" }}>
        <Typography
          variant="body1"
          sx={{
            color: "#444",
            fontSize: 16,
            lineHeight: 1.6,
            mt: 1,
          }}
        >
          {t("pro warning text")}
        </Typography>
      </DialogContent>

      <Divider sx={{ my: 2 }} />

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={() => setOpenPaymentDialog(false)}
          variant="outlined"
          color="inherit"
          sx={{
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 500,
            px: 3,
            py: 1,
            borderColor: "#ccc",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              borderColor: "#bbb",
            },
          }}
        >
          {t("Maybe Later")}
        </Button>
        <Button
          onClick={handleNavigateToPayment}
          variant="contained"
          sx={{
            backgroundColor: "#2a5c45",
            color: "#ffffff",
            fontWeight: "bold",
            borderRadius: 3,
            textTransform: "none",
            px: 4,
            py: 1.25,
            ml: 2,
            boxShadow: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              backgroundColor: "#1e4332",
              boxShadow: "none",
            },
          }}
        >
          {t("Upgrade Now")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProWarning;
