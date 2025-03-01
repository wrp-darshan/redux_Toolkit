import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://gorest.co.in/public/v2/users";
const ACCESS_TOKEN = "c841b288fd616e4b5fd80dbeb9450ffa5e0b40ecf0653bb7a5de06de483d1090";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  });
  return response.data;
});

export const createUser = createAsyncThunk("users/createUser", async (userData) => {
  const response = await axios.post(API_URL, userData, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  });
  return response.data;
});

export const updateUser = createAsyncThunk("users/updateUser", async ({ userId, updatedData }) => {
  const response = await axios.put(`${API_URL}/${userId}`, updatedData, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  });
  return response.data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (userId) => {
  await axios.delete(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  });
  return userId;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearEditingUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setCurrentUser, clearEditingUser } = userSlice.actions;
export default userSlice.reducer;
