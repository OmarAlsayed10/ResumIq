import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const savedCVsAction = createAsyncThunk(
    'saveCVs/getAll',

    async () => {
        return ['frontend CV', 'backend CV']
    }
);

export const savedCVsSlice = createSlice({
    name: 'savedCVs',
    initialState: {
        savedCVs: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(savedCVsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(savedCVsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.savedCVs = action.payload;
            })
            .addCase(savedCVsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default savedCVsSlice.reducer;