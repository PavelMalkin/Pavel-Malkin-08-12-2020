import {createReducer} from "@reduxjs/toolkit";

import {getForecast} from "../appThunk";
import {setCurrentCity, setCurrentCityFromFavorites} from "../actions/citiesActions";

const initialState = {
    condition: {},
    hasFetched: false,
    isFetching: false,
    isFetchingError: null
}

const forecastReducer = createReducer(initialState, {
    [getForecast.pending]: (state) => {
        state.isFetching = true;
        state.hasFetched = false;
    },
    [getForecast.rejected]: (state, action) => {
        state.isFetchingError = action.error.message;
        state.isFetching = false;
        return state;
    },
    [getForecast.fulfilled]: (state, action) => {
        state.condition = action.payload;
        state.hasFetched = true;
        state.isFetching = false;
        return state;
    },
    [setCurrentCity]: (state) => {
        state = initialState;
        return state;
    },
    [setCurrentCityFromFavorites]: (state) => {
        state = initialState;
        return state;
    },
})

export default forecastReducer;