import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Button, Typography} from "@material-ui/core";

import './CityContainer.scss'

import {deleteCity, saveCity} from "../../redux/actions/citiesActions";
import ForecastCard from "../elementary/ForecastCard";
import CurrentWeatherCard from "../elementary/CurrentWeatherCard";


function CityContainer(props) {
    const dispatch = useDispatch();
    const forecast = useSelector(store => store.forecast)
    const cities = useSelector(store => store.cities)
    const isFavorite = cities.savedCities.some(city => city.key === cities.currentCity.key)

    const handleClick = () => {
        if (!isFavorite) {
            dispatch(saveCity([{
                ...cities.currentCity,
                weather: [...cities.currentCity.weather],
                hasFetched: true,
                isFetching: false,
                isFetchingError: null
            }]))
        } else {
            dispatch(deleteCity(cities.currentCity.key))
        }
    }

    return (
        <div className="CityContainer">
            <div className="CityContainer__FirstRow">
                {cities.currentCity.hasFetched && <CurrentWeatherCard {...cities.currentCity} id={cities.currentCity.key} current={true}/>}
                <Button variant='outlined' onClick={handleClick}>{isFavorite? 'Remove from' : 'Add to'} Favorites</Button>
            </div>

            <div className="CityContainer__MainCondition">
                {cities.currentCity.hasFetched && <Typography align='center'
                                                              variant='h3'>{cities.currentCity.weather[0].WeatherText}</Typography>}
            </div>

            <div className="CityContainer__Forecast">
                {forecast.hasFetched && forecast.condition.DailyForecasts.map(day =>
                    <ForecastCard key={day.Date} {...day}/>
                )}
            </div>

        </div>
    );
}

export default CityContainer;