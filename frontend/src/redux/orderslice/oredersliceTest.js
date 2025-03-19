import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

// Create Order
export const create_order = createAsyncThunk("orders/create", async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/create`, orderData);

    return response.data;

  } catch (error) {
    console.error("Order creation error:", error.response?.data || error.message); // ✅ Debug log
    return rejectWithValue(error.response?.data || "Order creation failed");
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {
    create_new_Order: (state, action) => {
      state.orders.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create_order.pending, (state) => {
        console.log("🔄 Order creation pending...");
        state.status = "loading";
      })
      .addCase(create_order.fulfilled, (state, action) => {
        console.log("✅ Order created successfully:", action.payload);
        state.status = "succeeded";
        if (!Array.isArray(state.orders)) {
          state.orders = []; // ✅ Fix if `state.orders` is undefined
        }
        state.orders.push(action.payload.order); // ✅ Use `.order` from API response
      })
      .addCase(create_order.rejected, (state, action) => {
        console.log("❌ Order creation failed:", action.payload);
        state.status = "failed";
        state.error = action.payload;
      });
  },
});


export const { create_new_Order } = orderSlice.actions;
export default orderSlice.reducer;
