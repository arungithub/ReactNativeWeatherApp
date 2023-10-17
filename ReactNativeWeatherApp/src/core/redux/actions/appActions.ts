import { EndPoints, getRequestObject } from '../../network/apiHelper';
import { makeApiRequest } from '../../network/apiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GeolocationResponse } from '@react-native-community/geolocation';
import { AppConstants } from '../../../constants/constants';
import { APIResponse, GetCityResponse } from '../../../types/types';
import {
  GetCityDetailsRequest,
  GetCurrentWeatherRequest,
  GetWeatherForecastRequest,
  ThunkType,
} from '../types';

const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkType>();

export const actionTypes = {
  APP_LOADED: 'APP/APP_LOADED',
  GET_CURRENT_LOCATION_WEATHER_INFO:
    'WEATHER/GET_CURRENT_LOCATION_WEATHER_INFO',
  GET_SELECTED_LOCATION_WEATHER_INFO:
    'WEATHER/GET_SELECTED_LOCATION_WEATHER_INFO',
  GET_CURRENT_LOCATION_WEATHER_FORECAST:
    'WEATHER/GET_CURRENT_LOCATION_WEATHER_FORECAST',
  GET_SELECTED_LOCATION_WEATHER_FORECAST:
    'WEATHER/GET_SELECTED_LOCATION_WEATHER_FORECAST',
  UPDATE_CURRENT_GEO_LOCATION: 'APP/UPDATE_CURRENT_GEO_LOCATION',
  CLEAR_CURRENT_GEO_LOCATION: 'APP/CLEAR_CURRENT_GEO_LOCATION',
  GET_CITY_DETAILS: 'WEATHER/GET_CITY_DETAILS',
  ADD_CITY_TO_FAVOURITES: 'WEATHER/ADD_CITY_TO_FAVOURITES',
  REMOVE_CITY_FROM_FAVOURITES: 'WEATHER/REMOVE_CITY_FROM_FAVOURITES',
  UPDATE_SELECTED_CITY: 'WEATHER/UPDATE_SELECTED_CITY'
};

export const appLoaded = () => {
  return {
    type: actionTypes.APP_LOADED,
    payload: { appLoaded: true },
  };
};

export const clearCurrentLocation = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_GEO_LOCATION,
    payload: null,
  };
};

export const updateCurrentLocation = (position: GeolocationResponse) => {
  return {
    type: actionTypes.UPDATE_CURRENT_GEO_LOCATION,
    payload: position,
  };
};

export const updateSelectedCity = (city: GetCityResponse | null) => {
  return {
    type: actionTypes.UPDATE_SELECTED_CITY,
    payload: city,
  };
};

export const addCityToFavourites = (city: GetCityResponse) => {
  return {
    type: actionTypes.ADD_CITY_TO_FAVOURITES,
    payload: city,
  };
};

export const removeCityFromFavourites = (city: GetCityResponse) => {
  return {
    type: actionTypes.REMOVE_CITY_FROM_FAVOURITES,
    payload: city,
  };
};

const fetchWeatherDetails = async (
  data: GetCurrentWeatherRequest,
  { rejectWithValue }: any,
) => {
  try {
    const req = getRequestObject(EndPoints.currentWeather, data);
    const response = (await makeApiRequest(req)) as APIResponse;

    if (response?.cod === AppConstants.apiSuccess) {
      return response;
    } else {
      rejectWithValue(response);
    }
  } catch (e) {
    rejectWithValue(e);
  }
};

export const getCurrentWeatherInfo = createAppAsyncThunk(
  actionTypes.GET_CURRENT_LOCATION_WEATHER_INFO,
  fetchWeatherDetails,
);

export const getSelectedLocationWeatherInfo = createAppAsyncThunk(
  actionTypes.GET_SELECTED_LOCATION_WEATHER_INFO,
  fetchWeatherDetails,
);

export const getCity = createAppAsyncThunk(
  actionTypes.GET_CITY_DETAILS,
  async (data: GetCityDetailsRequest, { rejectWithValue }) => {
    try {
      const req = getRequestObject(EndPoints.getGeoCode, data);
      const response = (await makeApiRequest(req)) as GetCityResponse[];
  
      if (response.length > 0) {
        return response;
      } else {
        rejectWithValue(response);
      }
    } catch (e) {
      rejectWithValue(e);
    }
  },
);

const fetchWeatherForecast = async (
  data: GetWeatherForecastRequest,
  { rejectWithValue }: any,
) => {
  try {
    const req = getRequestObject(EndPoints.dailyForecast, data);
    const response = (await makeApiRequest(req)) as APIResponse;

    if (parseInt(response?.cod as string, 10) === AppConstants.apiSuccess) {
      return response;
    } else {
      rejectWithValue(response);
    }
  } catch (e) {
    rejectWithValue(e);
  }
};

export const getCurrentWeatherForecast = createAppAsyncThunk(
  actionTypes.GET_CURRENT_LOCATION_WEATHER_FORECAST,
  fetchWeatherForecast,
);

export const getSelectedLocationWeatherForecast = createAppAsyncThunk(
  actionTypes.GET_SELECTED_LOCATION_WEATHER_FORECAST,
  fetchWeatherForecast,
);