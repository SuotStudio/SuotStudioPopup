import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: undefined,
  email: undefined,
  phone: undefined,
  city: undefined,
};

const userContactDetailsSlice = createSlice({
  name: "userContactDetails",
  initialState,
  reducers: {
    addUserContactDetails: (state, action) => {
      state.name =
        action.payload.name !== undefined ? action.payload.name : state.name;
      state.email =
        action.payload.email !== undefined ? action.payload.email : state.email;
      state.phone =
        action.payload.phone !== undefined ? action.payload.phone : state.phone;
      state.city =
        action.payload.city !== undefined ? action.payload.city : state.city;
    },
    resetUserContactDetails: (state) => {
      state.name = undefined;
      state.email = undefined;
      state.phone = undefined;
      state.city = undefined;
    },
  },
});

export const userContactDetailsReducer = userContactDetailsSlice.reducer;
export const { addUserContactDetails, resetUserContactDetails } =
  userContactDetailsSlice.actions;
