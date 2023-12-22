import { TProducts } from "@/domain/entities";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchAllProduct } from "./action";

interface IProdustStates {
    products: {
        loading: boolean,
        total: number,
        data: TProducts[],
    }
}

const initialState: IProdustStates = {
    products: {
        loading: false,
        total: 0,
        data: [],
    }
}

export const productSlices = createSlice({
    name: "product",
    initialState,
    reducers: {
        setResetData: (state, action: PayloadAction<{ isSearch: boolean }>) => {
            if (action.payload.isSearch) {
                state.products.data = []
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchAllProduct.pending, (state) => {
            state.products.loading = true;
        });
        builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
            state.products.loading = false;
            state.products.data = action.payload?.data ?? []
            state.products.total = action.payload?.total ?? 0
        })
    },
})

export const { setResetData } = productSlices.actions
