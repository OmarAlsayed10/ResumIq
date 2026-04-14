import { Box, Typography, IconButton } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FOOTER_SOCIAL_LINKS } from "../../../constants/footerData";

const FooterBrand = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{ cursor: "pointer", mb: 2 }}
        onClick={() => navigate("/")}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            backgroundColor: "#2a5c45",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AutoAwesomeIcon sx={{ color: "#fff", fontSize: "18px" }} />
        </Box>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: "#ffffff", letterSpacing: "-0.3px" }}
        >
          Resume-IQ
        </Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: "#7a9e8e",
          lineHeight: 1.8,
          maxWidth: "260px",
          mb: 3,
          fontSize: "0.9rem",
        }}
      >
        {t("footer.subtitle") ||
          "AI-powered CV builder and analyzer helping you land your dream job faster."}
      </Typography>

      <Box display="flex" gap={0.5}>
        {FOOTER_SOCIAL_LINKS.map((social, i) => (
          <IconButton
            key={i}
            href={social.href}
            target="_blank"
            size="small"
            sx={{
              color: "#7a9e8e",
              border: "1px solid rgba(42,92,69,0.35)",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "rgba(42,92,69,0.2)",
                borderColor: "#2a5c45",
                color: "#3d8b65",
              },
              transition: "all 0.2s ease",
            }}
          >
            {social.icon}
          </IconButton>
        ))}
      </Box>
    </>
  );
};

export default FooterBrand;
