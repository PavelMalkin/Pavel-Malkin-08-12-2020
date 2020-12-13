import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import axios from 'axios'
import {toast} from "react-toastify";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Search.scss'

import {setCurrentCity} from "../../redux/actions/citiesActions";


export default function Search() {
    const dispatch = useDispatch();
    const history = useHistory();
    const cities = useSelector(store => store.cities)
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [input, setInput] = useState('')
    const loading = open && options.length === 0;

    useEffect(() => {
        if (input.length > 1) {
            (async () => {
                const cities = await axios
                    .get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_ACUWEATHER_API_KEY}&q=${input}`)
                    .then(res => res.data)
                    .catch(err => {
                        toast.error("Autocomplete " + err.toString());
                    });

                if (cities) {
                    setOptions(cities.map(city => ({
                        name: city.LocalizedName,
                        country: city.Country.LocalizedName,
                        country_id: city.Country.ID,
                        key: city.Key
                    })))
                }
            })()
        }
    }, [input, loading]);

    const handleSelect = (object, value) => {
        if (value.key !== null && cities.currentCity.key !== value.key) {
            dispatch(setCurrentCity({
                ...value,
                hasFetched: false,
                isFetching: false,
                isFetchingError: null
            }))
        }
        setInput('');
        history.push('/')
    }

    const handleInput = (event, value) => {
        if (/^[a-zA-Z ]+$/.test(value) || !value.length) {
            setInput(value)
        }
    }

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete className="Autocomplete"
                      id="search-city"
                      style={{width: 300}}
                      open={open}
                      onOpen={() => {
                          setOpen(true);
                      }}
                      onClose={() => {
                          setOpen(false);
                      }}
                      getOptionSelected={(option, value) => option.name === value.name}
                      onChange={handleSelect}
                      getOptionLabel={(option) => (option.name + ' , ' + option.country)}
                      options={options}
                      loading={loading}
                      inputValue={input}
                      onInputChange={handleInput}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              label="Search cities"
                              variant="outlined"
                              InputProps={{
                                  ...params.InputProps,
                                  endAdornment: (
                                      <React.Fragment>
                                          {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                          {params.InputProps.endAdornment}
                                      </React.Fragment>
                                  ),
                              }}
                          />
                      )}
        />
    );
}