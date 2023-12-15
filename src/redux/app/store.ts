import { configureStore } from '@reduxjs/toolkit'
import { productSlices } from '../features/products/slice'

export const store = configureStore({
    reducer: {
        product: productSlices.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch