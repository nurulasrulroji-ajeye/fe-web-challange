import { configureStore } from '@reduxjs/toolkit'
import { productSlices } from '../features/products/slice'
import { productQueries } from '../features/products/queries'

const middlewareQueries = [
    productQueries.middleware
]

export const store = configureStore({
    reducer: {
        product: productSlices.reducer,
        [productQueries.reducerPath]: productQueries.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, }).concat(...middlewareQueries),
    // devTools: process.env.NODE_ENV !== "development"
});



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch