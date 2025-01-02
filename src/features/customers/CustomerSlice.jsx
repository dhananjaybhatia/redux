import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialStateCustomer = {
  fullName: "",
  tfn: "",
  createdAt: "",
};

// Customer Slice
const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    // Action to create a new customer
    createCustomer(state, action) {
      state.fullName = action.payload.fullName;
      state.tfn = action.payload.tfn;
      state.createdAt = action.payload.createdAt || new Date().toISOString();
    },

    // Action to update customer name
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

// Export Actions
export const { createCustomer, updateName } = customerSlice.actions;

// Export Reducer
export default customerSlice.reducer;
