import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    movieList : [],
}

const filmsSlice = createSlice({
    name:"filmsSlice",
    initialState,
    reducers: {
        getMovieList(state , { payload })  {
            state.movieList = payload;
        }
    }
})

const { reducer , actions } = filmsSlice; 
export {actions as FilmsSliceAction , reducer as FilmsSliceReducer };