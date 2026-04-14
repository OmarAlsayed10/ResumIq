import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export const FOOTER_LINKS_DATA = {
  Product: [
    { label: "CV Builder", to: "/getStart" },
    { label: "CV Analyzer", to: "/cv-analysis" },
    { label: "Templates", to: "/templates" },
    { label: "Pricing", to: "/payment-check" },
  ],
  Resources: [
    { label: "Blog", to: "/blogs" },
    { label: "CV Tips", to: "/blogs" },
    { label: "Help Center", to: "/help" },
    { label: "Grammar Check", to: "/grammar-check" },
  ],
  Company: [
    { label: "About Us", to: "/" },
    { label: "Careers", to: "/" },
    { label: "Privacy Policy", to: "/" },
    { label: "Terms of Service", to: "/" },
  ],
};

export const FOOTER_SOCIAL_LINKS = [
  { icon: <TwitterIcon fontSize="small" />, href: "#" },
  { icon: <LinkedInIcon fontSize="small" />, href: "#" },
  {
    icon: <GitHubIcon fontSize="small" />,
    href: "https://github.com/MohamedKhalifa7/Resume-IQ",
  },
];

export const FOOTER_LEGAL_LINKS = ["Privacy", "Terms", "Cookies"];
