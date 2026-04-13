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
      backgroundColor: "#f5f5f5",
      padding: "40px",
      display: "flex",
      justifyContent: "center",
    }}>
      <Box sx={{
        backgroundColor: "#ffffff",
        padding: "40px",
        maxWidth: "800px",
        width: "100%",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "6px",
      }}>
        <Typography variant="h1" sx={{ fontSize: '2em', fontWeight: 'bold' }}>{name}</Typography>
        <Typography><Box component="strong">Email:</Box> {email}</Typography>
        <Typography><Box component="strong">Phone:</Box> {phone}</Typography>
        <Typography><Box component="strong">Location:</Box> {location}</Typography>
        <Typography><Box component="strong">Title:</Box> {professionalTitle}</Typography>

        <Box sx={{ marginBottom: "25px" }}>
          <Typography variant="h2" sx={{ color: "#333", borderBottom: "1px solid #ccc", paddingBottom: "5px", marginBottom: "10px", fontSize: '1.5em' }}>Professional Summary:</Typography>
          <Typography>{summary}</Typography>
        </Box>

        <Box sx={{ marginBottom: "25px" }}>
          <Typography variant="h2" sx={{ color: "#333", borderBottom: "1px solid #ccc", paddingBottom: "5px", marginBottom: "10px", fontSize: '1.5em' }}>Experience</Typography>
          <Box component="ul" sx={{ paddingLeft: "20px" }}>
            {experience.map((exp, index) => (
              <Box component="li" key={index} sx={{ marginBottom: '10px' }}>
                <Box component="span" sx={{ fontWeight: "bold" }}>{exp.role}</Box> at {exp.company} ({exp.startDate} to {exp.endDate})
                <Typography>{exp.location}</Typography>
                <Typography>{exp.description}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ marginBottom: "25px" }}>
          <Typography variant="h2" sx={{ color: "#333", borderBottom: "1px solid #ccc", paddingBottom: "5px", marginBottom: "10px", fontSize: '1.5em' }}>Education</Typography>
          <Box component="ul" sx={{ paddingLeft: "20px" }}>
            {education.map((edu, index) => (
              <Box component="li" key={index} sx={{ marginBottom: '10px' }}>
                <Box component="strong">{edu.institution}</Box> — {edu.degree} ({edu.startYear} to {edu.endYear})
                <Typography>{edu.location}</Typography>
                <Typography>{edu.description}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ marginBottom: "25px" }}>
          <Typography variant="h2" sx={{ color: "#333", borderBottom: "1px solid #ccc", paddingBottom: "5px", marginBottom: "10px", fontSize: '1.5em' }}>Skills</Typography>
          <Typography>{skills}</Typography>
        </Box>

        <Box sx={{ marginBottom: "25px" }}>
          <Typography variant="h2" sx={{ color: "#333", borderBottom: "1px solid #ccc", paddingBottom: "5px", marginBottom: "10px", fontSize: '1.5em' }}>Languages</Typography>
          <Box component="ul" sx={{ paddingLeft: "20px" }}>
            {languages.map((lang, index) => (
              <Box component="li" key={index}>{lang.name}</Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ marginBottom: "25px" }}>
          <Typography variant="h2" sx={{ color: "#333", borderBottom: "1px solid #ccc", paddingBottom: "5px", marginBottom: "10px", fontSize: '1.5em' }}>Certifications</Typography>
          <Box component="ul" sx={{ paddingLeft: "20px" }}>
            {certifications.map((cert, index) => (
              <Box component="li" key={index}>{cert.name}</Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClassicCV;
