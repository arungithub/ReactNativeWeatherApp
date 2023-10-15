import { EndPoints, getRequestObject } from '../../network/apiHelper';
import { makeApiRequest } from '../../network/apiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetCityDetailsReq,
  GetCurrentWeatherReq,
  GetWeatherForecastReq,
  ThunkType,
} from '../types';
import { GeolocationResponse } from '@react-native-community/geolocation';
import { AppConstants } from '../../../constants/constants';
import { APIResponse, GetCityResponse } from '../../../types/types';

const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkType>();

export const actionTypes = {
  APP_LOADED: 'APP/APP_LOADED',
  GET_CURRENT_LOCATION_WEATHER_INFO:
    'WEATHER/GET_CURRENT_LOCATION_WEATHER_INFO',
  GET_SELECTED_LOCATION_WEATHER_INFO:
    'WEATHER/GET_SELECTED_LOCATION_WEATHER_INFO',
  GET_SELECTED_LOCATION_WEATHER_FORECAST:
    'WEATHER/GET_SELECTED_LOCATION_WEATHER_FORECAST',
  UPDATE_CURRENT_GEO_LOCATION: 'APP/UPDATE_CURRENT_GEO_LOCATION',
  CLEAR_CURRENT_GEO_LOCATION: 'APP/CLEAR_CURRENT_GEO_LOCATION',
  GET_CITY_DETAILS: 'WEATHER/GET_CITY_DETAILS',
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

const fetchWeatherDetails = async (
  data: GetCurrentWeatherReq,
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
  async (data: GetCityDetailsReq, { rejectWithValue }) => {
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
  data: GetWeatherForecastReq,
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

export const getSelectedLocationWeatherForecast = createAppAsyncThunk(
  actionTypes.GET_SELECTED_LOCATION_WEATHER_FORECAST,
  fetchWeatherForecast,
);