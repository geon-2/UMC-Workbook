import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../data/cartItems';

const initialState = cartItems;

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increase: (state, action) => {
            const index = state.findIndex(item => item.id === action.payload);
            state[index].amount++;
        },
        decrease: (state, action) => {
            const index = state.findIndex(item => item.id === action.payload);
            state[index].amount--;
        },
        clearCart: () => {
            return [];
        },
        removeItem: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
    }
});

export const calculateTotals = (state) => {
    return state.cart.reduce((acc, item) => {
        return {totalPrice: acc.totalPrice + item.price * item.amount, totalAmount: acc.totalAmount + item.amount};
    }, {totalPrice: 0, totalAmount: 0});
}

export const { increase, decrease, clearCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;