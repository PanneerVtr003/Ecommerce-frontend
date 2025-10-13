import { API } from './api';

// 👤 Fetch logged-in user's profile
export const getProfile = async () => {
  try {
    const response = await API.get("/users/profile");
    return response;
  } catch (error) {
    console.error('Error fetching user profile:', error);
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
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// 🔐 Change password
export const changePassword = async (passwordData) => {
  try {
    const response = await API.put("/users/change-password", passwordData);
    return response;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};