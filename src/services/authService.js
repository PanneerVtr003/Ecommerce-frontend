import { API } from './api';

// 🧾 Register new user
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/users/register", userData);
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// 🔐 Login user
export const loginUser = async (userData) => {
  try {
    const response = await API.post("/users/login", userData);
    
    if (response.user && response.token) {
      // Save user to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
    }
    
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// 🚪 Logout
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// 👤 Get user profile
export const getProfile = async () => {
  try {
    const response = await API.get("/users/profile");
    return response;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// ✏️ Update user profile
export const updateProfile = async (profileData) => {
  try {
    const response = await API.put("/users/profile", profileData);
    
    // Update localStorage if user data is returned
    if (response.user) {
      localStorage.setItem("user", JSON.stringify(response.user));
    }
    
    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};