import { TProducts } from "@/domain/entities";
import { ProductServices } from "@/domain/services/product-services";
import { AppDispatch, RootState } from "@/redux/app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

const productServices = new ProductServices()

export const fetchAllProduct = createAsyncThunk<{
    data: TProducts[];
    total: number;
} | undefined, {
    limit: number;
    skip: number;
    search: string;
}, {
    dispatch: AppDispatch
    state: RootState
    rejectValue: {
        errorMessage: string
    }
}>(
    "products/all",
    async ({ limit, skip, search }, { rejectWithValue, getState, }) => {
        let data: TProducts[] = [];
        let stateData: TProducts[] = getState().product.products.data;
        try {
            const response = await productServices.getAllProduct({ limit, skip: skip * 12, search })
            // console.log("current", stateData, response);
            const currentData: TProducts[] = response.products;

            if (stateData.length > 0) {
                data = [...stateData, ...currentData]
            } else {
                data = currentData
            }
            return {
                data: data,
                total: response.total,
            }
        } catch (error) {
            console.error(error)
        }
    },
);
