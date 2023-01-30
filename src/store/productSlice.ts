import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IProduct} from '../models/models';

export type sortType = 'name' | 'views' | 'start_date' | 'end_date'| ''

type ProductsState = {
    list: IProduct[],
    loading: boolean,
    error: null | string,

}

const initialState: ProductsState = {
    list: [],
    loading: false,
    error: null,

}


export const fetchProducts = createAsyncThunk<IProduct[], undefined, { rejectValue: string }>(
'products/fetchProducts',
async function (_, {rejectWithValue}) {
        const response = await fetch('http://localhost:3001/products')
        if (!response?.ok) {
            return rejectWithValue("Server error")
        }
        return await response.json()
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.list = action.payload
            state.loading = false
        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        })
    }
})

export default productSlice.reducer

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}