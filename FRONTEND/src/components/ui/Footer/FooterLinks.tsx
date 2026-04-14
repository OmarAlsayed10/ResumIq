import { Typography, Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface FooterLinksProps {
  title: string;
  links: Array<{ label: string; to: string }>;
}

const FooterLinks = ({ title, links }: FooterLinksProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        variant="overline"
        sx={{
          color: "#ffffff",
          fontWeight: 700,
          letterSpacing: "1.2px",
          fontSize: "0.72rem",
          display: "block",
          mb: 2.5,
        }}
      >
        {t(title)}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {links.map((link) => (
          <Link
            key={link.label}
            component={RouterLink}
            to={link.to}
            underline="none"
            sx={{
              color: "#7a9e8e",
              fontSize: "0.9rem",
              transition: "color 0.2s ease",
              "&:hover": {
                color: "#3d8b65",
              },
            }}
          >
            {t(link.label)}
          </Link>
        ))}
      </Box>
    </>
  );
};

export default FooterLinks;
