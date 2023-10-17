import { GeolocationResponse } from '@react-native-community/geolocation';
import {
  ForecastResponse,
  GetCityResponse,
  Units,
  WeatherResponse,
} from '../../types/types';
import { AppDispatch, RootState } from './store';

export interface AppStateType {
  appLoaded: boolean;
  loading: boolean;
  currentGeoLocation: GeolocationResponse | null;
  favouriteLocations: GetCityResponse[] | [];
  selectedLocation: GetCityResponse | null;
}

export interface WeatherStateType {
  currentWeatherInformation: WeatherResponse | null;
  selectedLocationWeather: WeatherResponse | null;
  weatherForecastInformation: ForecastResponse | null;
  selectedLocationForecastInformation: ForecastResponse | null;
  loading: boolean;
  searchCities: GetCityResponse[];
}

export interface ThunkType {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: any;
  extra?: { s: string; n: number };
}

export interface GetCurrentWeatherRequest {
  lat: number;
  lon: number;
  units?: Units;
}

export interface GetWeatherForecastRequest extends GetCurrentWeatherRequest {
  cnt?: number;
}

export interface GetCityDetailsRequest {
  q: string;
  limit?: number;
}