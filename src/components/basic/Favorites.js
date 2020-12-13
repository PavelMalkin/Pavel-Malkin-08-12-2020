import React from 'react';
import {useSelector} from "react-redux";

import './Favorites.scss'

import CurrentWeatherCard from "../elementary/CurrentWeatherCard";

function Favorites() {
    const cities = useSelector(store => store.cities)

    return (
        <div className="Favorites">
            {cities.savedCities.map(city =>
            city.hasFetched? <CurrentWeatherCard key={city.key} {...city} id={city.key} current={false}/> : null
            )}
        </div>
    );
}

export default Favorites;