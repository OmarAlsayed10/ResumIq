export const API_BASE_URL = "http://localhost:3001";

export const AUTH_ENDPOINTS = {
    login: `${API_BASE_URL}/auth/login`,
    google: `${API_BASE_URL}/auth/google`,
    register: `${API_BASE_URL}/auth/register`,
    verifyOTP: `${API_BASE_URL}/auth/verify-otp`,
    resendOTP: `${API_BASE_URL}/auth/resend-otp`,
    logout: `${API_BASE_URL}/auth/logout`,
    updatePassword: `${API_BASE_URL}/auth/update-password`
};

export const BUILDER_ENDPOINTS = {
    save: `${API_BASE_URL}/cvbuilder/save`,
    update: (id) => `${API_BASE_URL}/cvbuilder/${id}`,
    delete: (id) => `${API_BASE_URL}/cvbuilder/${id}`
};

export const AI_ENDPOINTS = {
    grammarCheck: `${API_BASE_URL}/api/ai/grammarcheck`
};
