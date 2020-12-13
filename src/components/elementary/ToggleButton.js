import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import ToggleOffOutlinedIcon from '@material-ui/icons/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@material-ui/icons/ToggleOnOutlined';
import {Typography} from "@material-ui/core";

import './ToggleButton.scss'

import {toggleUnitSystem} from "../../redux/actions/settingsActions";


export default function ToggleButton() {
    const dispatch = useDispatch();
    const settings = useSelector(store => store.settings)

    const handleClick = () => {
        dispatch(toggleUnitSystem())
    }

    return (
        <div className="ToggleUnitSystem" onClick={handleClick}>
            <div className="ToggleUnitSystem__Value">
                <Typography>Metric</Typography>

                {settings.unit_system_metric ?
                    <ToggleOffOutlinedIcon fontSize='large'/> : <ToggleOnOutlinedIcon fontSize='large'/>
                }
                <Typography>Imperial</Typography>
            </div>
        </div>
    );
}