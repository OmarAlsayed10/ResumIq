import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateSection } from "../../../redux/store/slices/cvBuilderSlice";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInput from "../../../components/ui/FormInput";
import { useEffect } from "react";

const educationSchema = z.object({
  education: z.array(
    z.object({
      institution: z
        .string()
        .min(1, "Institution is required")
        .regex(/^[\u0600-\u06FFa-zA-Z\s]*$/, "Letters only"),
      degree: z
        .string()
        .min(1, "Degree is required")
        .regex(/^[\u0600-\u06FFa-zA-Z\s]*$/, "Letters only"),
      location: z.string().min(1, "Location is required"),
      startYear: z.string().min(1, "Start Year is required"),
      endYear: z.string().min(1, "End Year is required"),
      description: z.string().optional(),
    }),
  ),
});

const Education = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const educations = useSelector(
    (state: any) => state.cvBuilder?.formData?.education || [],
  );

  const { control, watch } = useForm({
    resolver: zodResolver(educationSchema),
    defaultValues: { education: JSON.parse(JSON.stringify(educations)) },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      const clonedData = value.education ? JSON.parse(JSON.stringify(value.education)) : [];
      dispatch(updateSection({ section: "education", data: clonedData }));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  const addEducation = () => {
    append({
      institution: "",
      degree: "",
      location: "",
      startYear: "",
      endYear: "",
      description: "",
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: isMobile ? "90%" : "800px",
        margin: "0 auto",
        padding: "12px",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#333", fontSize: "1.1rem" }}
        >
          {t("Education")}
        </Typography>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addEducation}
          sx={{
            border: "1px dashed rgba(26,26,24,0.3)",
            borderColor: "rgba(26,26,24,0.3)",
            color: "#1a1a18",
            "&:hover": {
              borderColor: "#2a5c45",
              color: "#2a5c45",
              backgroundColor: "rgba(42,92,69,0.05)",
            },
            fontSize: "0.85rem",
            padding: "6px 12px",
            boxShadow: "none"
          }}
        >
          {t("Add Education")}
        </Button>
      </Stack>

      <Box sx={{ border: "1px solid #e0e0e0", borderRadius: "8px", p: 2 }}>
        {fields.map((field, index) => (
          <Box key={field.id} sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: "1rem" }}
              >
                {t("Education")} {index + 1}
              </Typography>

              <IconButton
                onClick={() => remove(index)}
                sx={{ color: "#ff4444" }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", gap: "12px" }}>
              <Box sx={{ width: "50%" }}>
                <Controller
                  name={`education.${index}.institution`}
                  control={control}
                  render={({ field: f, fieldState: { error } }) => (
                    <FormInput
                      {...f}
                      label={t("Institution")}
                      placeholder={t("University Name")}
                      error={!!error}
                      helperText={error ? t(error.message) : ""}
                      required
                    />
                  )}
                />
              </Box>

              <Box sx={{ width: "50%" }}>
                <Controller
                  name={`education.${index}.degree`}
                  control={control}
                  render={({ field: f, fieldState: { error } }) => (
                    <FormInput
                      {...f}
                      label={t("Degree")}
                      placeholder={t("Bachelor's in Computer Science")}
                      error={!!error}
                      helperText={error ? t(error.message) : ""}
                      required
                    />
                  )}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: "12px" }}>
              <Box sx={{ width: "50%" }}>
                <Controller
                  name={`education.${index}.location`}
                  control={control}
                  render={({ field: f, fieldState: { error } }) => (
                    <FormInput
                      {...f}
                      label={t("Location")}
                      placeholder={t("New York, NY")}
                      error={!!error}
                      helperText={error ? t(error.message) : ""}
                      required
                    />
                  )}
                />
              </Box>

              <Box sx={{ width: "25%" }}>
                <Controller
                  name={`education.${index}.startYear`}
                  control={control}
                  render={({ field: f, fieldState: { error } }) => (
                    <FormInput
                      {...f}
                      label={t("Start Year")}
                      placeholder={t("2018")}
                      error={!!error}
                      helperText={error ? t(error.message) : ""}
                      required
                    />
                  )}
                />
              </Box>

              <Box sx={{ width: "25%" }}>
                <Controller
                  name={`education.${index}.endYear`}
                  control={control}
                  render={({ field: f, fieldState: { error } }) => (
                    <FormInput
                      {...f}
                      label={t("End Year")}
                      placeholder={t("2022")}
                      error={!!error}
                      helperText={error ? t(error.message) : ""}
                      required
                    />
                  )}
                />
              </Box>
            </Box>

            <Controller
              name={`education.${index}.description`}
              control={control}
              render={({ field: f, fieldState: { error } }) => (
                <FormInput
                  {...f}
                  label={t("Description (Optional)")}
                  placeholder={t("Describe your education experience here...")}
                  error={!!error}
                  helperText={error ? t(error.message) : ""}
                  multiline
                  minRows={3}
                />
              )}
            />

            {index < fields.length - 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Education;
