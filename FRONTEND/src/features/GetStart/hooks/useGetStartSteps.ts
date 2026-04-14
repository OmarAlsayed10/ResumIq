import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export interface StepData {
  id: number;
  title: string;
  subtitle: string;
  action: string;
  onClick: () => void;
}

export const useGetStartSteps = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [activeStep, setActiveStep] = useState(0);

  const isPro = user?.role === "pro user";

  const handleCheckGrammer = () => {
    if (isPro) {
      navigate("/grammarCheck");
    } else {
      navigate("/pricing");
    }
  };

  const handleCVAnalysis = () => {
    if (isPro) {
      navigate("/cv-analysis");
    } else {
      navigate("/pricing");
    }
  };

  const steps: StepData[] = [
    {
      id: 0,
      title: t("Create New CV"),
      subtitle: t("create.subtitle", "Start from scratch with our guided builder. Choose your templates and sections dynamically."),
      action: t("Start New CV"),
      onClick: () => navigate("/builder"),
    },
    {
      id: 1,
      title: t("Grammar Checker"),
      subtitle: t("grammar_checker.subtitle", "Leverage AI to perfectly proofread your CV or cover letter to eliminate any costly mistakes."),
      action: t("Check Grammar"),
      onClick: handleCheckGrammer,
    },
    {
      id: 2,
      title: t("AI Resume Analyzer"),
      subtitle: t("cv_analyzer.subtitle", "Upload your CV for a comprehensive AI review. Discover your ATS score, get actionable suggestions, and prepare with tailored interview questions."),
      action: t("Analyze CV"),
      onClick: handleCVAnalysis,
    }
  ];

  return {
    steps,
    activeStep,
    setActiveStep,
  };
};
