import {createReducer} from "@reduxjs/toolkit";

import {saveCity, deleteCity, setCurrentCity, setCurrentCityFromFavorites} from "../actions/citiesActions";
import {getCurrentWeather, getLocationByCoordinates} from "../appThunk"


const initialState = {
    savedCities: [],
    currentCity: {
        key: "215854",
        name: "Tel Aviv",
        country: "Israel",
        country_id: "IL",
        hasFetched: false,
        isFetching: false,
        isFetchingError: null
    },
    hasFetched: false,
    isFetching: false,
    isFetchingError: null
}

const citiesReducer = createReducer(initialState, {
    [saveCity]: (state, action) => {
        state.savedCities = [...state.savedCities, ...action.payload];
        state.hasFetched = true;
        return state;
    },
    [deleteCity]: (state, action) => {
        state.savedCities.forEach((city, index) => {
            if (city.key === action.payload) {
                state.savedCities.splice(index, 1)
            }
        })
        return state
    },
    [setCurrentCity]: (state, action) => {
        state.currentCity = action.payload;
    },
    [getCurrentWeather.pending]: (state, action) => {
        state.savedCities.forEach((city, index) => {
            if (city.key === action.meta.arg) {
                state.savedCities[index].isFetching = true;
                state.savedCities[index].hasFetched = false;
            }
        })
        if (state.currentCity.key === action.meta.arg) {
            state.currentCity.isFetching = true;
            state.currentCity.hasFetched = false;
        }
        return state;
    },
    [getCurrentWeather.rejected]: (state, action) => {
        state.savedCities.forEach((city, index) => {
            if (city.key === action.meta.arg) {
                state.savedCities[index].isFetching = false;
                state.savedCities[index].isFetchingError = action.error.message;
            }
        })
        if (state.currentCity.key === action.meta.arg) {
            state.currentCity.isFetching = false;
            state.currentCity.isFetchingError = action.error.message;
        }
        return state;
    },
    [getCurrentWeather.fulfilled]: (state, action) => {
        state.savedCities.forEach((city, index) => {
            if (city.key === action.meta.arg) {
                state.savedCities[index].isFetching = false;
                state.savedCities[index].hasFetched = true;
                state.savedCities[index].weather = action.payload;
            }
        })
        if (state.currentCity.key === action.meta.arg) {
            state.currentCity.isFetching = false;
            state.currentCity.hasFetched = true;
            state.currentCity.weather = action.payload;
        }
        return state;
    },
    [setCurrentCityFromFavorites]: (state, action) => {
        state.currentCity = state.savedCities.find(city => city.name === action.payload)
        return state;
    },
    [getLocationByCoordinates.pending]: (state) => {
        state.isFetching = true;
        state.hasFetched = false;
        state.isFetchingError = null;
    },
    [getLocationByCoordinates.rejected]: (state, action) => {
        state.isFetchingError = action.error;
        state.isFetching = false;
        return state;
    },
    [getLocationByCoordinates.fulfilled]: (state, action) => {
        state.currentCity = {
            key: action.payload.Key,
            name: action.payload.LocalizedName,
            country: action.payload.Country.LocalizedName,
            country_id: action.payload.Country.ID,
            hasFetched: false,
            isFetching: false,
            isFetchingError: null
        };
        state.hasFetched = true;
        state.isFetching = false;
        return state;
    },

})

export default citiesReducer;