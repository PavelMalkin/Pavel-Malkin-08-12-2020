import React from 'react';
import {useSelector} from "react-redux";
import moment from 'moment'

import './ForecastCard.scss'

import {Paper, Typography} from "@material-ui/core";

function ForecastCard(props) {
    const metric = useSelector(store => store.settings.unit_system_metric);
    const temperatureMax = metric ? props.Temperature.Maximum.Value + '°C' : (props.Temperature.Maximum.Value * (9 / 5) + 32).toFixed(1) + '°F'
    const temperatureMin = metric ? props.Temperature.Minimum.Value + '°C' : (props.Temperature.Minimum.Value * (9 / 5) + 32).toFixed(1) + '°F'
    const wind = metric ? props.Day.Wind.Speed.Value + ' km/h' : (props.Day.Wind.Speed.Value / 1.60934).toFixed(1) + ' mi/h'

    return (
            <Paper elevation={2} className="ForecastCard">
                <Typography>{moment(props.Date).format('ddd, MMM DD')}</Typography>
                <Typography>{temperatureMax} Day / {temperatureMin} Night</Typography>
                <Typography>{props.Day.Wind.Direction.English} Wind {wind}</Typography>
                <Typography>{props.Day.ShortPhrase}</Typography>
                <img src={`./icons/${props.Day.Icon}-s.png`} alt={props.Day.ShortPhrase}/>
                <img src={`./icons/${props.Night.Icon}-s.png`} alt={props.Night.ShortPhrase}/>
            </Paper>
    );
}

export default ForecastCard;