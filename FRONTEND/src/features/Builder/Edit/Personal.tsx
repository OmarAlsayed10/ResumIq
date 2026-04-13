import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateSection } from "../../../redux/store/slices/cvBuilderSlice";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInput from "../../../components/ui/FormInput";
import { useEffect } from "react";

const personalSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .regex(/^[\u0600-\u06FFa-zA-Z\s]*$/, "Letters only"),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .regex(/^[\u0600-\u06FFa-zA-Z\s]*$/, "Letters only"),
  professionalTitle: z.string().min(1, "Professional Title is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^\+?[0-9]{7,15}$/, "Invalid phone format"),
  location: z.string().min(1, "Location is required"),
  ProfessionalSummary: z.string().optional(),
});

const Personal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const personalInfo = useSelector(
    (state: any) => state.cvBuilder?.formData?.personalInfo || {},
  );

  const { control, watch } = useForm({
    resolver: zodResolver(personalSchema),
    defaultValues: personalInfo,
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      dispatch(updateSection({ section: "personalInfo", data: value }));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

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
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          marginBottom: "16px",
          color: "#333",
          textAlign: "start",
          fontSize: "1.1rem",
        }}
      >
        {t("Personal Information")}
      </Typography>

      <Box sx={{ display: "flex", gap: "12px" }}>
        <Box sx={{ width: "50%" }}>
          <Controller
            name="firstName"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormInput
                {...field}
                label={t("First Name")}
                placeholder={t("John")}
                error={!!error}
                helperText={error ? t(error.message) : ""}
                required
              />
            )}
          />
        </Box>

        <Box sx={{ width: "50%" }}>
          <Controller
            name="lastName"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormInput
                {...field}
                label={t("Last Name")}
                placeholder={t("Smith")}
                error={!!error}
                helperText={error ? t(error.message) : ""}
                required
              />
            )}
          />
        </Box>
      </Box>

      <Controller
        name="professionalTitle"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            label={t("Professional Title")}
            placeholder={t("Marketing Manager")}
            icon={WorkIcon}
            error={!!error}
            helperText={error ? t(error.message) : ""}
            required
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            label={t("Email")}
            placeholder="john.smith@example.com"
            icon={EmailIcon}
            error={!!error}
            helperText={error ? t(error.message) : ""}
            required
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            label={t("Phone")}
            placeholder="+1 (555) 123-4567"
            icon={PhoneIcon}
            error={!!error}
            helperText={error ? t(error.message) : ""}
            required
          />
        )}
      />

      <Controller
        name="location"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            label={t("Location")}
            placeholder={t("New York, NY")}
            icon={LocationOnIcon}
            error={!!error}
            helperText={error ? t(error.message) : ""}
            required
          />
        )}
      />

      <Controller
        name="ProfessionalSummary"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            label={t("Professional Summary")}
            placeholder={t("Write your professional summary here...")}
            error={!!error}
            helperText={error ? t(error.message) : ""}
            multiline
            minRows={2}
          />
        )}
      />
    </Box>
  );
};

export default Personal;
