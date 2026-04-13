import { Box, CircularProgress, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/error";
import store from "./redux/store/store";
import Layout from "./pages/layout";
import GetStarted from "./features/GetStart/GetStart";
import Builder from "./features/Builder/Buldir";
import { theme } from "./utils/theme";
import Home from "./features/Home/Home";
import LoginPage from "./features/Auth/LoginPage";
import RegisterPage from "./features/Auth/RegisterPage";
import GoogleAuthSuccess from "./features/Auth/GoogleAuthSuccess";
import VerifyOTP from "./features/Auth/VerifyOTP";
import GrammarCheck from "./features/GrammarCheck/GrammarCheck";
import { FileProvider } from "./context/fileContext.jsx";
import { TemplateProvider } from "./context/choosenTempContext.jsx";
import ProtectedRoute from "./guard/ProtectedRoute.jsx";
import { useAuth } from "./hooks/useAuth.js";
import "./i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { PreviewProvider } from "./context/previewContext.jsx";
import ChatBot from "./features/chatBot/ChatBot";
import ProPaymentForm from "./features/payment/Payment";
import Blog from "./pages/blogs.jsx";
import BlogDetail from "./pages/blogDetails.jsx";
import PricingSection from "./features/Home/PricingSection.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CVTipsSection from "./pages/tips.jsx";
import Settings from "./features/Settings/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "builder",
        element: (
          <ProtectedRoute>
            <Builder />
          </ProtectedRoute>
        ),
      },
      {
        path: "getStart",
        element: (
          <ProtectedRoute>
            <GetStarted />
          </ProtectedRoute>
        ),
      },
      { path: "auth/success", element: <GoogleAuthSuccess /> },
      { path: "grammarCheck", element: <GrammarCheck /> },
      {
        path: "payment-check",
        element: (
          <ProtectedRoute>
            <ProPaymentForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "chatbot",
        element: (
          <ProtectedRoute>
            <ChatBot />
          </ProtectedRoute>
        ),
      },
      { path: "Blogs", element: <Blog></Blog> },
      { path: "tips", element: <CVTipsSection></CVTipsSection> },

      { path: "Blogs/:id", element: <BlogDetail /> },
      { path: "*", element: <Error /> },
      { path: "Pro-Features", element: <PricingSection /> },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "register", element: <RegisterPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "verify-otp", element: <VerifyOTP /> },
]);

function App() {
  const { i18n } = useTranslation();
  const { loading } = useAuth();

  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "purple" }} />
      </Box>
    );
  }
  return (
    <Provider store={store}>
      <PreviewProvider>
        <TemplateProvider>
          <FileProvider>
            <ThemeProvider theme={theme}>
              <RouterProvider router={router} />
            </ThemeProvider>
          </FileProvider>
        </TemplateProvider>
      </PreviewProvider>
    </Provider>
  );
}

export default App;
