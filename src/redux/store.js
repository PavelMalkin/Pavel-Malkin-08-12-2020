import { configureStore } from '@reduxjs/toolkit';

import forecastReducer from './reducers/forecastReducer'
import citiesReducer from "./reducers/citiesReducer";
import settingsReducer from "./reducers/settingsReducer";

export default configureStore({
  reducer: {
    forecast: forecastReducer,
    cities: citiesReducer,
    settings: settingsReducer,
  },
});
