import { Box, Typography } from "@mui/material";

const ModernCV = ({
  name,
  email,
  phone,
  location,
  professionalTitle,
  summary,
  skills,
  languages = [],
  certifications = [],
  experience = [],
  education = [],
}) => {
  return (
    <Box sx={{
      display: 'flex',
      width: '900px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
      minHeight: '1122px',
    }}>
      <Box sx={{
        width: '30%',
        backgroundColor: '#1e293b',
        color: '#ffffff',
        padding: '40px 25px',
      }}>
        <Typography variant="h1" sx={{ fontSize: '22px', marginBottom: '20px' }}>{name}</Typography>
        <Typography><Box component="strong">Title:</Box> {professionalTitle}</Typography>
        <Typography><Box component="strong">Email:</Box> {email}</Typography>
        <Typography><Box component="strong">Phone:</Box> {phone}</Typography>
        <Typography><Box component="strong">Location:</Box> {location}</Typography>

        <Typography variant="h2" sx={{ fontSize: '18px', marginTop: '30px', marginBottom: '10px', borderBottom: '1px solid #ffffff', paddingBottom: '5px' }}>Skills</Typography>
        <Typography>{skills}</Typography>

        <Typography variant="h2" sx={{ fontSize: '18px', marginTop: '30px', marginBottom: '10px', borderBottom: '1px solid #ffffff', paddingBottom: '5px' }}>Languages</Typography>
        <Typography>{languages.map(lang => lang.name).join(", ")}</Typography>

        <Typography variant="h2" sx={{ fontSize: '18px', marginTop: '30px', marginBottom: '10px', borderBottom: '1px solid #ffffff', paddingBottom: '5px' }}>Certifications</Typography>
        <Typography>{certifications.map(cert => cert.name).join(", ")}</Typography>
      </Box>

      <Box sx={{
        width: '70%',
        padding: '40px',
        color: '#333',
        fontFamily: `"Segoe UI", sans-serif`,
        backgroundColor: '#ffffff',
      }}>
        <Box sx={{ marginBottom: '30px' }}>
          <Typography variant="h2" sx={{ fontSize: '22px', borderBottom: '2px solid #1e293b', paddingBottom: '5px', marginBottom: '10px' }}>Professional Summary</Typography>
          <Typography>{summary}</Typography>
        </Box>

        <Box sx={{ marginBottom: '30px' }}>
          <Typography variant="h2" sx={{ fontSize: '22px', borderBottom: '2px solid #1e293b', paddingBottom: '5px', marginBottom: '10px' }}>Experience</Typography>
          {experience.map((exp, index) => (
            <Box key={index} sx={{ marginBottom: '20px' }}>
              <Typography variant="h3" sx={{ fontSize: '16px', fontWeight: 'bold' }}>{exp.role} at {exp.company}</Typography>
              <Typography><Box component="strong">Location:</Box> {exp.location}</Typography>
              <Typography><Box component="strong">From:</Box> {exp.startDate} <Box component="strong">To:</Box> {exp.endDate}</Typography>
              <Typography>{exp.description}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ marginBottom: '30px' }}>
          <Typography variant="h2" sx={{ fontSize: '22px', borderBottom: '2px solid #1e293b', paddingBottom: '5px', marginBottom: '10px' }}>Education</Typography>
          {education.map((edu, index) => (
            <Box key={index} sx={{ marginBottom: '20px' }}>
              <Typography variant="h3" sx={{ fontSize: '16px', fontWeight: 'bold' }}>{edu.degree} - {edu.institution}</Typography>
              <Typography><Box component="strong">Location:</Box> {edu.location}</Typography>
              <Typography><Box component="strong">Years:</Box> {edu.startYear} - {edu.endYear}</Typography>
              <Typography>{edu.description}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ModernCV;
