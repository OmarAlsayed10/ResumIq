import { Box, Grid } from "@mui/material";
import FooterBrand from "./Footer/FooterBrand";
import FooterLinks from "./Footer/FooterLinks";
import FooterNewsletter from "./Footer/FooterNewsletter";
import FooterBottom from "./Footer/FooterBottom";
import { FOOTER_LINKS_DATA } from "../../constants/footerData";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0f1f17",
        color: "#c8d9ce",
        pt: { xs: 8, md: 10 },
        pb: 4,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #2a5c45 40%, #3d8b65 60%, transparent)",
        },
      }}
    >
      {/* Subtle background pattern */}
      <Box
        sx={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(42,92,69,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ maxWidth: "lg", mx: "auto", px: { xs: 2, md: 6 } }}>
        <Box sx={{ overflow: "hidden" }}>
          <Grid container spacing={{ xs: 4, md: 5 }}>
            {/* Brand Column */}
            <Grid sx={{ xs: 12, md: 5 }}>
              <FooterBrand />
            </Grid>

            {/* Link Columns */}
            {Object.entries(FOOTER_LINKS_DATA).map(([title, links]) => (
              <Grid sx={{ xs: 6, sm: 4, md: 2 }} key={title}>
                <FooterLinks title={title} links={links} />
              </Grid>
            ))}

            {/* Newsletter */}
            <Grid sx={{ xs: 12, md: 12, mt: { md: 2 } }}>
              <FooterNewsletter />
            </Grid>
          </Grid>
        </Box>

        <FooterBottom />
      </Box>
    </Box>
  );
};

export default Footer;
