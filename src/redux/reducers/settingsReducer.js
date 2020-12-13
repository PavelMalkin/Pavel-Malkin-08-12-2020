import {createReducer} from "@reduxjs/toolkit";

import {setLocationCoordinates, toggleUnitSystem} from "../actions/settingsActions";

const initialState = {
    unit_system_metric: true,
    location: {},
}

const settingsReducer = createReducer(initialState, {
    [setLocationCoordinates]: (state, action) => {
        state.location = action.payload;
        return state;
    },
    [toggleUnitSystem]: (state, action) => {
        state.unit_system_metric = !state.unit_system_metric;
        return state;
    },
})

export default settingsReducer;