import { AnyAction } from 'redux';
import {
  actionTypes,
  getCurrentWeatherInfo,
  getCity,
  getSelectedLocationWeatherInfo,
  getCurrentWeatherForecast,
  getSelectedLocationWeatherForecast,
} from '../actions/appActions';
import { AppStateType, WeatherStateType } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import {
  ForecastResponse,
  WeatherResponse,
} from '../../../types/types';

export const appInitialState: AppStateType = {
  appLoaded: false,
  loading: false,
  currentGeoLocation: null,
  favouriteLocations: [],
  selectedLocation: null,
};

export const initialState: WeatherStateType = {
  currentWeatherInformation: null,
  selectedLocationWeather: null,
  weatherForecastInformation: null,
  selectedLocationForecastInformation: null,
  loading: false,
  searchCities: [],
};

export const weatherSlice = createSlice({
  name: 'WEATHER',
  initialState,
  reducers: {
    clearSearchCity: state => {
      state.searchCities = [];
      return state;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrentWeatherInfo.fulfilled, (state, action) => {
        state.currentWeatherInformation = action.payload as WeatherResponse;
        state.loading = false;
      })
      .addCase(getCurrentWeatherInfo.pending, state => {
        state.loading = true;
      })
      .addCase(getCurrentWeatherInfo.rejected, state => {
        state.loading = false;
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.searchCities = action.payload ? action.payload : [];
        state.loading = false;
      })
      .addCase(getCity.pending, state => {
        state.loading = true;
      })
      .addCase(getCity.rejected, state => {
        state.loading = false;
      })
      .addCase(getSelectedLocationWeatherInfo.fulfilled, (state, action) => {
        state.selectedLocationWeather = action.payload as WeatherResponse;
        state.loading = false;
      })
      .addCase(getSelectedLocationWeatherInfo.pending, state => {
        state.loading = true;
      })
      .addCase(getSelectedLocationWeatherInfo.rejected, state => {
        state.loading = false;
      })
      .addCase(getCurrentWeatherForecast.fulfilled, (state, action) => {
        state.weatherForecastInformation = action.payload as ForecastResponse;
        state.loading = false;
      })
      .addCase(getCurrentWeatherForecast.pending, state => {
        state.loading = true;
      })
      .addCase(getCurrentWeatherForecast.rejected, state => {
        state.loading = false;
      })
      .addCase(
        getSelectedLocationWeatherForecast.fulfilled,
        (state, action) => {
          state.selectedLocationForecastInformation =
            action.payload as ForecastResponse;
          state.loading = false;
        },
      )
      .addCase(getSelectedLocationWeatherForecast.pending, state => {
        state.loading = true;
      })
      .addCase(getSelectedLocationWeatherForecast.rejected, state => {
        state.loading = false;
      });
  },
});

export const weatherReducer = weatherSlice.reducer;
export const weatherActions = weatherSlice.actions;

const AppReducer = (
  state = appInitialState,
  action: AnyAction,
): AppStateType => {
  switch (action.type) {
    case actionTypes.APP_LOADED:
      return { ...state, ...action.payload };

    case actionTypes.UPDATE_CURRENT_GEO_LOCATION:
      return { ...state, currentGeoLocation: action.payload };

    case actionTypes.CLEAR_CURRENT_GEO_LOCATION:
      return { ...state, currentGeoLocation: action.payload };

    default:
      return state;
  }
};

export default AppReducer;