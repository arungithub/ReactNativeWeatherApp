export interface Weather {
  id: string;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherSysDetails {
  country: string;
}

export interface WeatherCoordinates {
  lat: number;
  lon: number;
}

export interface APIResponse {
  cod: number | string;
  [key: string]: any;
}

export interface GetCityResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
  isWatchlist?: boolean;
}

export type Units = 'imperial' | 'metric' | 'standard';