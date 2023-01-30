import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IProduct} from '../models/models';
import React from 'react';

export type sortType = 'name' | 'views' | 'start_date' | 'end_date'| ''

type ProductsState = {
    list: IProduct[],
    loading: boolean,
    error: null | string,
    currentPage: number,
    perPage: number,
    itemsCount: number
}

const initialState: ProductsState = {
    list: [],
    loading: false,
    error: null,
    currentPage: 1,
    perPage: 5,
    itemsCount: 0

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
        setCurrentPage(state, action :PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setPerPage (state, action :PayloadAction<number>) {
            state.perPage = action.payload
        },
        setItemsCount (state, action :PayloadAction<number>) {
            if (action.payload) {
                state.itemsCount = action.payload
            } else {
                state.itemsCount = Math.ceil(state.list.length/state.perPage)
            }
        }

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
export const {setCurrentPage,setPerPage,setItemsCount} = productSlice.actions

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}