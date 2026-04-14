import { Box, Typography, Link, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FOOTER_LEGAL_LINKS } from "../../../constants/footerData";

const FooterBottom = () => {
  const { t } = useTranslation();

  return (
    <>
      <Divider sx={{ mt: 8, mb: 3, borderColor: "rgba(42,92,69,0.2)" }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography sx={{ color: "#4d7a62", fontSize: "0.82rem" }}>
          {t("© 2025 Resume-IQ. All rights reserved.")}
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          {FOOTER_LEGAL_LINKS.map((item) => (
            <Link
              key={item}
              href="#"
              underline="none"
              sx={{
                color: "#4d7a62",
                fontSize: "0.82rem",
                "&:hover": { color: "#3d8b65" },
                transition: "color 0.2s",
              }}
            >
              {t(item)}
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default FooterBottom;
