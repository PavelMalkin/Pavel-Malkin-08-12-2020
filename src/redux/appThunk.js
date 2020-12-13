import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'
import {toast} from "react-toastify";

export const getCurrentWeather = createAsyncThunk('getCurrentWeather', (key) => {
    return axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${process.env.REACT_APP_ACUWEATHER_API_KEY}&details=true`)
        .then(res => res.data)
        .catch(err => {
            toast.error(`Receiving forecast for city key ${key} ` + err.toString());
            throw Error(err.statusText)
        })
})

export const getForecast = createAsyncThunk('getForecast', (key) => {
    return axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${process.env.REACT_APP_ACUWEATHER_API_KEY}&details=true&metric=true`)
        .then(res => res.data)
        .catch(err => {
            toast.error("Receiving forecast " + err.toString());
            throw new Error(err)
        })

})

export const getLocationByCoordinates = createAsyncThunk('getLocationByCoordinates', (param) => {
    const coordinates = param.lat + ',' + param.lon;
    return axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_ACUWEATHER_API_KEY}&q=${coordinates}`)
        .then(res => res.data)
        .catch(err => {
            toast.error(`Get city name by coordinates ` + err.toString())
            throw  Error(err)
        })
})
