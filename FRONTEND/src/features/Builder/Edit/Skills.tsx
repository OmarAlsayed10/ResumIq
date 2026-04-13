import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateSection } from "../../../redux/store/slices/cvBuilderSlice";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInput from "../../../components/ui/FormInput";

const skillsSchema = z.object({
  skills: z.array(z.string()),
  languages: z.string().optional(),
  certifications: z.string().optional(),
});

const Skills = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const formDataSkills = useSelector(
    (state: any) =>
      state.cvBuilder?.formData?.skills || {
        skills: [],
        languages: "",
        certifications: "",
      },
  );

  const [input, setInput] = useState("");

  const { control, watch, setValue, getValues } = useForm({
    resolver: zodResolver(skillsSchema),
    defaultValues: formDataSkills,
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      dispatch(updateSection({ section: "skills", data: value }));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  const addSkill = () => {
    const currentSkills = getValues("skills") || [];
    if (input.trim() && !currentSkills.includes(input.trim())) {
      setValue("skills", [...currentSkills, input.trim()]);
      setInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    const currentSkills = getValues("skills") || [];
    setValue(
      "skills",
      currentSkills.filter((s) => s !== skillToRemove),
    );
  };

  const skillsArray = watch("skills") || [];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: isMobile ? "90%" : "800px",
        margin: "0 auto",
        padding: isMobile ? "8px" : "12px",
        borderRadius: "8px",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "#333",
          fontSize: isMobile ? "1rem" : "1.1rem",
          mb: 2,
          textAlign: "start",
        }}
      >
        {t("skills")}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <FormInput
          label={t("addSkills")}
          placeholder={t("placeholderSkills")}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addSkill}
          sx={{
            bgcolor: "#4e54c8",
            color: "white",
            "&:hover": { bgcolor: "#3f46a5" },
            fontSize: "0.8rem",
            padding: "4px 12px",
            width: "80px",
            mt: -1,
          }}
        >
          {t("add")}
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            fontSize: "0.85rem",
            mb: 1,
            textAlign: "start",
          }}
        >
          {t("yourSkills")}
        </Typography>
        <Box
          sx={{
            minHeight: "40px",
            border: skillsArray.length ? "none" : "1px dashed #ddd",
            borderRadius: "8px",
            padding: skillsArray.length ? "0" : "8px",
            backgroundColor: skillsArray.length ? "transparent" : "#f9f9f9",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {skillsArray.length > 0 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {skillsArray.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => removeSkill(skill)}
                  deleteIcon={<DeleteIcon style={{ fontSize: "0.85rem" }} />}
                  sx={{
                    fontSize: "0.85rem",
                    "& .MuiChip-deleteIcon": { color: "#ff4444" },
                  }}
                />
              ))}
            </Box>
          ) : (
            <Typography
              variant="body2"
              sx={{ color: "#666", fontStyle: "italic" }}
            >
              {t("noSkills")}
            </Typography>
          )}
        </Box>
      </Box>

      <Controller
        name="languages"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            label={t("languages")}
            placeholder={t("placeholderLanguages")}
            error={!!error}
            helperText={error ? t(error.message) : ""}
          />
        )}
      />

      <Controller
        name="certifications"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            label={t("certifications")}
            placeholder={t("placeholderCertifications")}
            error={!!error}
            helperText={error ? t(error.message) : ""}
          />
        )}
      />
    </Box>
  );
};

export default Skills;
