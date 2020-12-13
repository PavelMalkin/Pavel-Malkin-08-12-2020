import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./components/basic/Navbar";
import Home from "./components/basic/Home";
import Favorites from "./components/basic/Favorites";
import {setLocationCoordinates} from "./redux/actions/settingsActions";
import {getCurrentWeather, getForecast, getLocationByCoordinates} from "./redux/appThunk";
import {saveCity, setCurrentCityFromFavorites} from "./redux/actions/citiesActions";


function App() {
    const forecast = useSelector(store => store.forecast)
    const cities = useSelector(store => store.cities)
    const settings = useSelector(store => store.settings)
    const dispatch = useDispatch();
    const location = useLocation();


    useEffect(()=> {
        if (!Object.keys(settings.location).length) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                        const coordinates = {lat:position.coords.latitude,lon:position.coords.longitude}
                        dispatch(setLocationCoordinates(coordinates))
                        dispatch(getLocationByCoordinates(coordinates))
                    },
                    () => {
                        toast.error('location error')
                    })
            } else {
                toast.warn('Browser doesnt support Geolocation')
            }
        }
    },[dispatch, settings.location])

    useEffect(() => {
        if (cities.currentCity && !cities.currentCity.hasFetched && !cities.currentCity.isFetching && cities.currentCity.isFetchingError === null) {
            dispatch(getCurrentWeather(cities.currentCity.key))
        }
    },[cities.currentCity, dispatch])

    useEffect(() => {
        if (cities.currentCity && !forecast.hasFetched && !forecast.isFetching && forecast.isFetchingError === null) {
            dispatch(getForecast(cities.currentCity.key))
        }
    },[forecast, dispatch, cities.currentCity])

    useEffect(() => {
            if (localStorage.getItem('SPACities') && !cities.savedCities.length) {
                dispatch(saveCity(JSON.parse(localStorage.getItem('SPACities'))))
            } else {
                const citiesToStorage = cities.savedCities.map( city => ({
                    name:city.name,
                    country:city.country,
                    country_id: city.country_id,
                    key:city.key,
                    hasFetched: false,
                    isFetching: false,
                    isFetchingError: null
                }))
                localStorage.setItem('SPACities', JSON.stringify(citiesToStorage))
            }
        },
        [dispatch, cities.savedCities])

    useEffect(()=> {
        cities.savedCities.forEach( city => {
            if (!city.hasFetched && !city.isFetching && city.isFetchingError === null) {
                dispatch(getCurrentWeather(city.key))
            }
        })
    },[cities.savedCities, dispatch])

    useEffect(()=> {
        const param = new URLSearchParams(location.search).get('city')
        if (param != null) {
            dispatch(setCurrentCityFromFavorites(param))
        }
    }, [dispatch, location])

    return (
        <div className="App">
            <Navbar/>
            {location.pathname === '/' ? <Home/> : <Favorites/>}
            <div>
                <ToastContainer autoClose={8000}/>
            </div>
        </div>
    );
}

export default App;
