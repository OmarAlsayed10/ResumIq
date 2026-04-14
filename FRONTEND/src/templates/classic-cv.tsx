import { Box, Typography } from "@mui/material";

const ClassicCV = ({
  name,
  email,
  phone,
  location,
  professionalTitle,
  summary,
  skills,
  languages,
  certifications,
  experience,
  education,
}) => {
  return (
    <Box sx={{
      backgroundColor: "#f5f4ef",
      padding: { xs: 2, md: 4 },
      display: "flex",
      justifyContent: "center",
    }}>
      <Box sx={{
        backgroundColor: "#ffffff",
        padding: { xs: 3, sm: 5 },
        width: "100%",
        fontFamily: '"DM Sans", sans-serif',
        lineHeight: 1.6,
        boxShadow: "none",
        border: "1px solid rgba(26,26,24,0.1)",
        borderRadius: "10px",
        minHeight: "800px",
      }}>
        <Typography variant="h1" sx={{ fontFamily: '"DM Serif Display", serif', fontSize: '2.5rem', color: "#1a1a18", mb: 0.5 }}>{name}</Typography>
        <Typography sx={{ color: "#6b6b66", fontSize: "0.95rem" }}><Box component="span" sx={{ color: "#1a1a18", fontWeight: 500 }}>Email: </Box> {email}</Typography>
        <Typography sx={{ color: "#6b6b66", fontSize: "0.95rem" }}><Box component="span" sx={{ color: "#1a1a18", fontWeight: 500 }}>Phone: </Box> {phone}</Typography>
        <Typography sx={{ color: "#6b6b66", fontSize: "0.95rem" }}><Box component="span" sx={{ color: "#1a1a18", fontWeight: 500 }}>Location: </Box> {location}</Typography>
        <Typography sx={{ color: "#6b6b66", fontSize: "0.95rem", mb: 2 }}><Box component="span" sx={{ color: "#1a1a18", fontWeight: 500 }}>Title: </Box> {professionalTitle}</Typography>

        <Box sx={{ borderBottom: "1px solid rgba(26,26,24,0.1)", mb: 3 }}></Box>

        {summary && (
          <Box sx={{ marginBottom: "25px" }}>
            <Typography variant="h2" sx={{ color: "#6b6b66", fontSize: '0.85rem', fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", mb: 1 }}>Professional Summary</Typography>
            <Typography sx={{ color: "#1a1a18", fontSize: "0.95rem" }}>{summary}</Typography>
          </Box>
        )}

        {experience && experience.length > 0 && (
          <Box sx={{ marginBottom: "25px" }}>
            <Typography variant="h2" sx={{ color: "#6b6b66", fontSize: '0.85rem', fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", mb: 1.5 }}>Experience</Typography>
            <Box component="ul" sx={{ paddingLeft: "16px", m: 0 }}>
              {experience.map((exp, index) => (
                <Box component="li" key={index} sx={{ marginBottom: '12px', color: "#6b6b66" }}>
                  <Typography sx={{ color: "#1a1a18" }}><Box component="span" sx={{ fontWeight: 500 }}>{exp.role}</Box> at {exp.company}</Typography>
                  <Typography sx={{ fontSize: "0.85rem", mb: 0.5 }}>{exp.years} | {exp.location}</Typography>
                  <Typography sx={{ color: "#1a1a18", fontSize: "0.95rem" }}>{exp.description}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {education && education.length > 0 && (
          <Box sx={{ marginBottom: "25px" }}>
            <Typography variant="h2" sx={{ color: "#6b6b66", fontSize: '0.85rem', fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", mb: 1.5 }}>Education</Typography>
            <Box component="ul" sx={{ paddingLeft: "16px", m: 0 }}>
              {education.map((edu, index) => (
                <Box component="li" key={index} sx={{ marginBottom: '12px', color: "#6b6b66" }}>
                  <Typography sx={{ color: "#1a1a18" }}><Box component="strong" sx={{ fontWeight: 500 }}>{edu.institution}</Box> — {edu.degree}</Typography>
                  <Typography sx={{ fontSize: "0.85rem", mb: 0.5 }}>{edu.startYear} to {edu.endYear} | {edu.location}</Typography>
                  <Typography sx={{ color: "#1a1a18", fontSize: "0.95rem" }}>{edu.description}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {skills && (
          <Box sx={{ marginBottom: "25px" }}>
            <Typography variant="h2" sx={{ color: "#6b6b66", fontSize: '0.85rem', fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", mb: 1 }}>Skills</Typography>
            <Typography sx={{ color: "#1a1a18", fontSize: "0.95rem" }}>{skills}</Typography>
          </Box>
        )}

        {languages && languages.length > 0 && (
          <Box sx={{ marginBottom: "25px" }}>
            <Typography variant="h2" sx={{ color: "#6b6b66", fontSize: '0.85rem', fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", mb: 1 }}>Languages</Typography>
            <Box component="ul" sx={{ paddingLeft: "16px", m: 0, color: "#1a1a18" }}>
              {languages.map((lang, index) => (
                <Box component="li" key={index} sx={{ fontSize: "0.95rem" }}>{lang.name}</Box>
              ))}
            </Box>
          </Box>
        )}

        {certifications && certifications.length > 0 && (
          <Box sx={{ marginBottom: "25px" }}>
            <Typography variant="h2" sx={{ color: "#6b6b66", fontSize: '0.85rem', fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", mb: 1 }}>Certifications</Typography>
            <Box component="ul" sx={{ paddingLeft: "16px", m: 0, color: "#1a1a18" }}>
              {certifications.map((cert, index) => (
                <Box component="li" key={index} sx={{ fontSize: "0.95rem" }}>{cert.name}</Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ClassicCV;
