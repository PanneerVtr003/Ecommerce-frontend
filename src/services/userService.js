// src/services/userService.js
import axios from "axios";

export const getProfile = async () => {
  const token = localStorage.getItem("token"); // get latest token dynamically

  const response = await axios.get("http://localhost:5000/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
