import { Box, Typography } from "@mui/material";

const LinkedInCV = ({
  name,
  email,
  phone,
  location,
  professionalTitle,
  summary,
  experience = [],
  education = [],
  skills,
  languages = [],
  certifications = [],
}) => {
  return (
    <Box sx={{
      backgroundColor: "#f4f7fb",
      display: "flex",
      justifyContent: "center",
      padding: "40px 20px",
      minHeight: "100vh",
    }}>
      <Box sx={{
        maxWidth: "900px",
        width: "100%",
        backgroundColor: "#fff",
        padding: "40px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        fontFamily: `"Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
        color: "#333",
        lineHeight: 1.6,
      }}>
        <Box sx={{
          borderBottom: "2px solid #0056b3",
          paddingBottom: "16px",
          marginBottom: "30px",
          textAlign: "center",
        }}>
          <Typography variant="h1" sx={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#0056b3",
          }}>{name}</Typography>
          <Typography variant="h2" sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#0077cc",
            marginTop: "4px",
          }}>{professionalTitle}</Typography>
          <Box sx={{
            fontSize: "15px",
            color: "#555",
            marginTop: "8px",
          }}>
            <Box component="span">{email}</Box> | <Box component="span">{phone}</Box> | <Box component="span">{location}</Box>
          </Box>
        </Box>

        <Box sx={{ marginBottom: "30px" }}>
          <Typography variant="h3" sx={{
            fontSize: "20px",
            marginBottom: "10px",
            color: "#004080",
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
          }}>Summary</Typography>
          <Typography sx={{
            fontSize: "14px",
            marginTop: "6px",
            color: "#444",
          }}>{summary}</Typography>
        </Box>

        <Box sx={{ marginBottom: "30px" }}>
          <Typography variant="h3" sx={{
            fontSize: "20px",
            marginBottom: "10px",
            color: "#004080",
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
          }}>Experience</Typography>
          <Box component="ul" sx={{ listStyle: "none", paddingLeft: "0" }}>
            {experience.map((item, index) => (
              <Box component="li" key={index} sx={{ marginBottom: "16px" }}>
                <Typography sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#222",
                }}>{item.role}</Typography>
                <Typography sx={{
                  fontSize: "14px",
                  color: "#666",
                }}>
                  {item.company} — {item.years}
                </Typography>
                <Typography sx={{
                  fontSize: "14px",
                  marginTop: "6px",
                  color: "#444",
                }}>{item.description}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ marginBottom: "30px" }}>
          <Typography variant="h3" sx={{
            fontSize: "20px",
            marginBottom: "10px",
            color: "#004080",
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
          }}>Education</Typography>
          <Box component="ul" sx={{ listStyle: "none", paddingLeft: "0" }}>
            {education.map((edu, index) => (
              <Box component="li" key={index} sx={{ marginBottom: "16px" }}>
                <Typography sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#222",
                }}>{edu.institution}</Typography>
                <Typography sx={{
                  fontSize: "14px",
                  color: "#666",
                }}>
                  {edu.degree} ({edu.startYear} - {edu.endYear})
                </Typography>
                <Typography sx={{
                  fontSize: "14px",
                  color: "#666",
                }}>{edu.location}</Typography>
                <Typography sx={{
                  fontSize: "14px",
                  marginTop: "6px",
                  color: "#444",
                }}>{edu.description}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ marginBottom: "30px" }}>
          <Typography variant="h3" sx={{
            fontSize: "20px",
            marginBottom: "10px",
            color: "#004080",
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
          }}>Skills</Typography>
          <Box sx={{
            marginTop: "10px",
            fontSize: "14px",
            backgroundColor: "#eaf4ff",
            padding: "10px",
            borderRadius: "6px",
            lineHeight: 1.8,
          }}>{skills}</Box>
        </Box>

        <Box sx={{ marginBottom: "30px" }}>
          <Typography variant="h3" sx={{
            fontSize: "20px",
            marginBottom: "10px",
            color: "#004080",
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
          }}>Languages</Typography>
          <Box component="ul" sx={{ listStyle: "none", paddingLeft: "0" }}>
            {languages.map((lang, index) => (
              <Box component="li" key={index}>
                {lang.name} 
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ marginBottom: "30px" }}>
          <Typography variant="h3" sx={{
            fontSize: "20px",
            marginBottom: "10px",
            color: "#004080",
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
          }}>Certifications</Typography>
          <Box component="ul" sx={{ listStyle: "none", paddingLeft: "0" }}>
            {certifications.map((cert, index) => (
              <Box component="li" key={index}>
                {cert.name} 
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LinkedInCV;
