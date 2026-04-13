import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
export const cvScoreAction= createAsyncThunk(
    'cvScore/get',


    async()=>{
        return 82;
    }


)

export const cvScoreSlice = createSlice({
    name: 'cvScore',
    initialState:{
        cvScore: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(cvScoreAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(cvScoreAction.fulfilled,(state, action)=>{
            state.loading = false;
            state.cvScore = action.payload;
        })
        .addCase(cvScoreAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export default cvScoreSlice.reducer;
