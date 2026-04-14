import { Box, Typography, TextField } from "@mui/material";

const FormInput = (props: any) => {
  const {
    label,
    name,
    value,
    onChange,
    error,
    helperText,
    placeholder,
    required,
    icon: Icon,
    multiline,
    minRows
  } = props;
  return (
    <Box sx={{ marginBottom: "20px" }}>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          marginBottom: "2px",
          textAlign: "start",
          fontSize: "0.85rem",
        }}
      >
        {label} {required && "*"}
      </Typography>
      
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
        {Icon && (
          <Box sx={{ mt: multiline ? 1.5 : 0.5 }}>
            <Icon sx={{ color: "#555", fontSize: "1rem" }} />
          </Box>
        )}
        <TextField
          fullWidth
          variant={multiline ? "outlined" : "standard"}
          name={name}
          value={value || ""}
          onChange={onChange}
          error={error}
          helperText={helperText}
          placeholder={placeholder}
          required={required}
          multiline={multiline}
          minRows={minRows}
          InputProps={!multiline ? { disableUnderline: true } : undefined}
          sx={
            !multiline
              ? {
                  "& .MuiInput-input": {
                    border: "1px solid rgba(26,26,24,0.18)",
                    height: "26px",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    "&:focus": {
                      borderColor: "#2a5c45",
                      boxShadow: "0 0 0 3px rgba(42,92,69,0.12)",
                    }
                  },
                }
              : {
                  "& .MuiOutlinedInput-root": {
                    padding: "6px",
                    borderRadius: "6px",
                    "& fieldset": {
                      borderColor: "rgba(26,26,24,0.18)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(26,26,24,0.3)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2a5c45",
                      borderWidth: "1px",
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 0 0 3px rgba(42,92,69,0.12)",
                    },
                    "& textarea": {
                      padding: "4px",
                      fontSize: "0.85rem",
                      minHeight: "60px",
                    },
                  },
                }
          }
        />
      </Box>
    </Box>
  );
};

export default FormInput;
