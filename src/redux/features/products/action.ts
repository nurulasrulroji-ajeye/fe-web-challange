import { ProductServices } from "@/domain/services/product-services";
import { createAsyncThunk } from "@reduxjs/toolkit";

const productServices = new ProductServices()

export const fetchAllProduct = createAsyncThunk(
    "story-brand/admin/post-partner",
    async ({ limit, skip, search }: { limit: number; skip: number; search: string }, thunkAPI) => {
        try {
            const response = await productServices.getAllProduct({ limit, skip, search })
            return {
                data: response.products
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);