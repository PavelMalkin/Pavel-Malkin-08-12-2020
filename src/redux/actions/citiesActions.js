import { createAction } from "@reduxjs/toolkit";

export const setCurrentCity = createAction("setCurrentCity")

export const saveCity = createAction("saveCity")

export const deleteCity = createAction("deleteCity")

export const setCurrentCityFromFavorites = createAction('setCurrentCityFromSave')