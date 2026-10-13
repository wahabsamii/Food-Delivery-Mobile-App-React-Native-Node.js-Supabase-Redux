import { createSlice } from '@reduxjs/toolkit';

const likeSlice = createSlice({
    name: 'like',
    initialState:{
        likeProducts: []
    },
    reducers:{
        addLike: (state, action) => {
            const product = action.payload;
            const exists = state.likeProducts.find((p) => p.id === product._id);
            if (!exists) {
                state.likeProducts.push(product)
            }
        },
        removeLike:(state, action) => {
            state.likeProducts = state.likeProducts.filter(item => item.id !== action.payload)
        }
    }
});

export const {addLike, removeLike} = likeSlice.actions;
export default likeSlice.reducer;