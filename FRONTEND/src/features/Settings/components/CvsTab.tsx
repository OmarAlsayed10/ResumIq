import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFormData } from "../../../redux/store/slices/cvBuilderSlice";
import { CV_ENDPOINTS } from "../../../constants/endpoints";

interface CV {
  _id: string;
  title: string;
  updatedAt: string;
}

const CvsTab = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cvs, setCvs] = useState<CV[]>([]);

  useEffect(() => {
    axios
      .get(CV_ENDPOINTS.userCvs, { withCredentials: true })
      .then((r) => setCvs(r.data))
      .catch(() => {});
  }, []);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, fontSize: "1.1rem", fontWeight: 600 }}>
        {t("My CVs")}
      </Typography>
      <Grid container spacing={2}>
        {cvs.map((cv) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cv._id}>
            <Card variant="outlined" sx={{ borderRadius: 2, transition: "0.2s", "&:hover": { borderColor: "primary.main" } }}>
              <CardActionArea onClick={() => {
                dispatch(updateFormData(cv));
                navigate("/builder");
              }}>
                <CardContent sx={{ p: 2 }}>
                  <Box
                    sx={{
                      height: 60,
                      bgcolor: "primary.50",
                      borderRadius: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1.5,
                    }}
                  >
                    <DescriptionIcon color="primary" />
                  </Box>
                  <Typography fontSize={13} fontWeight={600} noWrap>
                    {cv.title}
                  </Typography>
                  <Typography fontSize={11} color="text.secondary" sx={{ mt: 0.5 }}>
                    {new Date(cv.updatedAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card variant="outlined" sx={{ borderRadius: 2, borderStyle: "dashed", height: "100%", transition: "0.2s", "&:hover": { borderColor: "primary.main", bgcolor: "action.hover" } }}>
            <CardActionArea onClick={() => {
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
                })
              );
              navigate("/builder");
            }} sx={{ height: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 120,
                  p: 2,
                }}
              >
                <AddIcon color="action" sx={{ mb: 1 }} />
                <Typography fontSize={13} color="text.secondary" fontWeight={500}>
                  {t("New CV")}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CvsTab;
