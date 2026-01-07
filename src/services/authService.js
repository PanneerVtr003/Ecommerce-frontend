// src/services/authService.js
import { API, registerUser as apiRegisterUser, loginUser as apiLoginUser } from "./api";

// =========================
// User Registration
// =========================
export const registerUser = async (userData) => {
  try {
    const data = await apiRegisterUser(userData);

    // Save token to localStorage if backend returns it
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (err) {
    throw new Error(err.message || "Registration failed");
  }
};

// =========================
// User Login
// =========================
export const loginUser = async (userData) => {
  try {
    const data = await apiLoginUser(userData);

    // Save token to localStorage
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (err) {
    throw new Error(err.message || "Login failed");
  }
};

// =========================
// User Logout
// =========================
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// =========================
// Forgot Password
// =========================
export const forgotPassword = async (email) => {
  try {
    const data = await API.post("/users/forgot-password", { email });
    return data;
  } catch (err) {
    throw new Error(err.message || "Forgot password request failed");
  }
};

// =========================
// Reset Password
// =========================
export const resetPassword = async (token, password) => {
  try {
    const data = await API.post(`/users/reset-password/${token}`, { password });
    return data;
  } catch (err) {
    throw new Error(err.message || "Reset password failed");
  }
};

// =========================
// Get User Profile
// =========================
export const getProfile = async () => {
  try {
    const data = await API.get("/users/profile");
    return data;
  } catch (err) {
    throw new Error(err.message || "Fetching profile failed");
  }
};

// =========================
// Update User Profile
// =========================
export const updateProfile = async (userData) => {
  try {
    const data = await API.put("/users/profile", userData);
    return data;
  } catch (err) {
    throw new Error(err.message || "Updating profile failed");
  }
};
