import { useState, useEffect } from "react";
import { Box, Button, Typography, Alert } from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  setMyCvs,
  updateFormData,
} from "../../../redux/store/slices/cvBuilderSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BUILDER_ENDPOINTS } from "../../../constants/endpoints";

const PastCVsSection = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const myCvs = useSelector((state: any) => state.cvBuilder?.myCvs || []);

  const fetchUserCVs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cvbuilder/user", {
        withCredentials: true,
      });
      dispatch(setMyCvs(response.data || []));
    } catch (error) {
      console.error("Error fetching CVs:", error);
      setError(t("errorFetchingCVs"));
    }
  };

  useEffect(() => {
    fetchUserCVs();
  }, [t]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(BUILDER_ENDPOINTS.delete(id), {
        withCredentials: true,
      });
      console.log("CV deleted successfully:", response.data);

      await fetchUserCVs();

      setSuccess(true);
      setError("");

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setError(error.response ? error.response.data : t("errorDeletingCV"));
      setSuccess(false);
    }
  };

  const handlePreview = (cv) => {
    dispatch(updateFormData(cv));
  };

  return (
    <Box
      sx={{
        py: 2,
        px: 2,
        bgcolor: "white",
        borderRadius: 2,
        border: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: 2,
      }}
    >
      <Typography variant="body1">{t("myCVs")}</Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {t("cvDeletedSuccessfully")}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {myCvs.map((cv, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: 1,
            cursor: "pointer",
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
          onClick={() => handlePreview(cv)}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextSnippetIcon />
            <Typography variant="body1">
              {cv.personalInfo.professionalTitle}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(cv.id || cv._id);
            }}
            sx={{ minWidth: "auto", px: 1 }}
          >
            <DeleteIcon />
          </Button>
        </Box>
      ))}

      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        fullWidth
        onClick={() => {
          dispatch(
            updateFormData({
              personalInfo: {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                location: "",
                professionalTitle: "",
                ProfessionalSummary: "",
              },
              experience: [],
              education: [],
              skills: { skills: [], languages: "", certifications: "" },
            }),
          );
        }}
      >
        {t("newCV")}
      </Button>
    </Box>
  );
};

export default PastCVsSection;
