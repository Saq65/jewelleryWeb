import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: [], 
};

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const IteamIndex = state.carts.findIndex((iteam) => iteam._id === action.payload._id);
            if (IteamIndex >= 0) {
                state.carts[IteamIndex].qnty += 1
            } else {
                const temp = { ...action.payload, qnty: 1 }
                state.carts = [...state.carts, temp]
            }
        },

        itemdecrement:(state,action)=> {
            const IteamIndex_dec = state.carts.findIndex((itm)=> itm._id === action.payload._id);
            if(state.carts[IteamIndex_dec].qnty >= 1){
                state.carts[IteamIndex_dec].qnty -= 1
            }
        },
        
        RemoveToCart: (state, action) => {
            state.carts = state.carts.filter((itm) => itm._id !== action.payload);
        },
        clearCart: (state) => {
            state.carts = [];
        }

        
    },
});

export const { addToCart,itemdecrement,RemoveToCart, } = cartSlice.actions;
export default cartSlice.reducer;
