import { GeolocationResponse } from '@react-native-community/geolocation';
import {
  GetCityResponse,
  Units,
} from '../../types/types';
import { AppDispatch, RootState } from './store';

export interface AppStateType {
  appLoaded: boolean;
  loading: boolean;
  currentGeoLocation: GeolocationResponse | null;
  favouriteLocations: GetCityResponse[] | [];
  selectedLocation: GetCityResponse | null;
}

export interface ThunkType {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: any;
  extra?: { s: string; n: number };
}

export interface GetCurrentWeatherReq {
  lat: number;
  lon: number;
  units?: Units;
}

export interface GetWeatherForecastReq extends GetCurrentWeatherReq {
  cnt?: number;
}

export interface GetCityDetailsReq {
  q: string;
  limit?: number;
}