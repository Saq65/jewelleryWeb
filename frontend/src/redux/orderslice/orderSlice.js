// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { Baseurl } from "../../config/BaseUrl";

// // Create Order Thunk
// export const create_order = createAsyncThunk(
//   "order/create_order",
//   async (formData, thunkAPI) => {
//     try {
//       const config = { headers: { "Content-Type": "application/json" } };
//       const url = `${Baseurl}/api/order/new`;

//       // ✅ Rename fields to match backend expectations
//       const formattedData = {
//         Username: formData.Username,
//         userId: formData.userId,
//         Mobile: formData.mobile,  // ✅ Change "Usermobile" -> "Mobile"
//         Email: formData.email,    // ✅ Change "Useremail" -> "Email"
//         userAddress: formData.userAddress,
//         produucts: formData.produucts, // ✅ Change "products" -> "produucts"
//         ClientId: formData.userId,  // ✅ Add this field
//         Address: formData.userAddress,  // ✅ Add this field
//       };

//       console.log("📤 Sending Fixed Data:", formattedData); // Debugging log

//       const resp = await axios.post(url, formattedData, config);
//       return resp.data;
//     } catch (error) {
//       console.error("❌ Order creation failed:", error.response?.data || error);
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Order creation failed!"
//       );
//     }
//   }
// );



// // Get Orders Data Thunk
// export const get_order_data = createAsyncThunk(
//   "order/get_order_data",
//   async (userId, thunkAPI) => {
//     try {
//       const url = `${Baseurl}/api/order/user-orders/${userId}`;
//       const resp = await axios.get(url);
//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to fetch orders!"
//       );
//     }
//   }
// );

// const initialState = {
//   orders_all: localStorage.getItem("orders_all")
//     ? JSON.parse(localStorage.getItem("orders_all")).sort((a, b) =>
//         a.createdAt > b.createdAt ? 1 : -1
//       )
//     : [],
//   orders_allLoading: true,
//   isorders_allAvailable: !!localStorage.getItem("orders_all"),
//   currentOrder: "",
// };

// const OrderSlice = createSlice({
//   name: "order",
//   initialState,
//   reducers: {
//     create_new_Order(state, action) {
//       state.orders_all = [...state.orders_all, action.payload.order].sort((a, b) =>
//         a.createdAt > b.createdAt ? 1 : -1
//       );
//       state.currentOrder = action.payload.order;
//       localStorage.setItem("orders_all", JSON.stringify(state.orders_all));
//     },
//     // Moved clear_Order inside reducers
//     clear_Order(state) {
//       state.orders_all = [];
//       state.currentOrder = "";
//       localStorage.setItem("orders_all", JSON.stringify(state.orders_all));
//     },
//   },
// });

// export const { create_new_Order, clear_Order } = OrderSlice.actions;
// export default OrderSlice.reducer;
