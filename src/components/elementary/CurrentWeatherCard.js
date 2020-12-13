import React from 'react';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

import './CurrentWeatherCard.scss'

import {CardContent, Paper, Typography} from "@material-ui/core";

function CurrentWeatherCard(props) {
    const metric = useSelector(store => store.settings.unit_system_metric)
    const temperature = metric ? props.weather[0].Temperature.Metric.Value : props.weather[0].Temperature.Imperial.Value
    const wind = metric ? props.weather[0].Wind.Speed.Metric.Value : props.weather[0].Wind.Speed.Imperial.Value
    const isCurrentCity = props.current

    return (
            <Paper elevation={2} className={isCurrentCity ? 'CurrentWeatherCard_Home' : 'CurrentWeatherCard'}>
                <NavLink to={isCurrentCity ? '#' : `/?city=${props.name}`}
                         className={isCurrentCity ? 'CurrentWeatherCard not_active' : 'CurrentWeatherCard'}>
                    <CardContent>
                        <Typography align='center'
                                    variant='h6'>ID {props.id}</Typography>
                        <Typography align='center'
                                    variant='h5'>{temperature} °{metric ? 'C' : 'F'}</Typography>
                        <Typography align='center'
                                    variant='h5'>{props.name}, {props.country_id}</Typography>
                        <Typography align='center'
                                    variant='h6'>{!isCurrentCity && props.weather[0].WeatherText}</Typography>
                        <Typography align='center'
                                    variant='h6'>Wind {wind} {metric ? 'km/h' : 'mi/h'}</Typography>
                        {props.hasFetched &&
                        <img src={`./icons/${props.weather[0].WeatherIcon}-s.png`} alt={props.weather[0].WeatherText}/>}
                    </CardContent>
                </NavLink>
            </Paper>
    );
}

export default CurrentWeatherCard;