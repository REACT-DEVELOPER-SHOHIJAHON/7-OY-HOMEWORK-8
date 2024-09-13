import { createSlice } from "@reduxjs/toolkit";

// LocalStorage dan olingan token bilan dastlabki holati
const initialState = {
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // LocalStorage-ga kirish va tokenni saqlash uchun amal
    signIn: (state, action) => {
      const token = action.payload?.access_token;
      if (token) {
        state.token = token;
        localStorage.setItem("token", token); // Tokenni localStorage-da saqlansh
      }
    },
    // LocalStorage'dan tokenni o'chirish va o'chirish uchun harakat
    signOut: (state) => {
      state.token = null;
      localStorage.removeItem("token"); // LocalStorage dan tokenni olib tashlash
    },
  },
});

// Komponentlarda foydalanish uchun amallarni eksport qilish
export const { signOut, signIn } = authSlice.actions;

// Do'konda ishlatiladigan reduktorni eksport qilish
export default authSlice.reducer;
