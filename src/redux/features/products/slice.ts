import { TProducts } from "@/domain/entities";
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProduct } from "./action";

interface IProdustStates {
    products: {
        loading: boolean,
        data: TProducts[],
    }
}

const initialState: IProdustStates = {
    products: {
        loading: false,
        data: [],
    }
}

export const productSlices = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchAllProduct.pending, (state) => {
            state.products.loading = true;
        });
        builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
            state.products.loading = false;
            state.products.data = action.payload.data
        })
    },
})