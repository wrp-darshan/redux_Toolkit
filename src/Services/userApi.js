// import axios from 'axios';

// const BASE_URL = "https://gorest.co.in/public/v2/users";

// // Create user
// export const createUserApi = async (userData, token) => {
//   try {
//     const response = await axios.post(BASE_URL, userData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data; // Return only the data
//   } catch (error) {
//     handleApiError(error); // Handle error
//     throw error; // Rethrow error after logging
//   }
// };

// // Get users
// export const getUsersApi = async (token) => {
//   try {
//     const response = await axios.get(BASE_URL, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data; // Return only the data
//   } catch (error) {
//     handleApiError(error); // Handle error
//     throw error; // Rethrow error after logging
//   }
// };

// // Update user
// export const updateUserApi = async (userId, updatedData, token) => {
//   try {
//     const response = await axios.put(`${BASE_URL}/${userId}`, updatedData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data; // Return only the data
//   } catch (error) {
//     handleApiError(error); // Handle error
//     throw error; // Rethrow error after logging
//   }
// };

// // Delete user
// export const deleteUserApi = async (userId, token) => {
//   try {
//     const response = await axios.delete(`${BASE_URL}/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data; // Return only the data
//   } catch (error) {
//     handleApiError(error); // Handle error
//     throw error; // Rethrow error after logging
//   }
// };

// // Common error handling function
// const handleApiError = (error) => {
//   if (error.response) {
//     // Request was made and server responded
//     console.error("Error Response:", error.response.data);
//     console.error("Error Status:", error.response.status);
//   } else if (error.request) {
//     // Request was made but no response
//     console.error("Error Request:", error.request);
//   } else {
//     // Something else caused the error
//     console.error("Error Message:", error.message);
//   }
// };
