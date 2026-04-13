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
                    border: "1px solid #ddd",
                    height: "26px",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    transition: "border-color 0.2s",
                    "&:focus": {
                      borderColor: "primary.main",
                    }
                  },
                }
              : {
                  "& .MuiOutlinedInput-root": {
                    padding: "6px",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "#ddd",
                    },
                    "&:hover fieldset": {
                      borderColor: "#bbb",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
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
