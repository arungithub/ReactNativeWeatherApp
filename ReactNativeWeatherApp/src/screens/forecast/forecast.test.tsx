import React from 'react';
import Forecast from './forecast';
import { renderWithRedux } from '../../utils/testUtils/testUtils';
import { fireEvent, waitFor } from '@testing-library/react-native';
import store from '../../core/redux/store';
import {
  getSelectedLocationWeatherForecast,
  getSelectedLocationWeatherInfo,
  updateSelectedCity,
} from '../../core/redux/actions/appActions';
import {
  mockCityWeatherData,
  mockDailyForecastWeatherData,
  mockLocationWeatherData,
  mockWeatherResponse,
} from '../../utils/testUtils/testMockData';
import { AppTestIds } from '../../utils/testUtils/testIds';
import { enableFetchMocks } from 'jest-fetch-mock';
import { AppConstants } from '../../constants/constants';

enableFetchMocks();

describe('Forecast', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponse('[]');
  });

  let arg = {
    lat: mockLocationWeatherData.coords.latitude,
    lon: mockLocationWeatherData.coords.longitude,
    cnt: 3,
    units: AppConstants.Celsius.value,
  };

  //ForecastView - selectedLocationWeather
  it('Selected Location Weather information', async () => {
    fetchMock.mockResponse(JSON.stringify(mockWeatherResponse));
    const { getByTestId } = renderWithRedux(<Forecast />);
    waitFor(async () => {
      await store.dispatch(updateSelectedCity(mockCityWeatherData));
      await store.dispatch(getSelectedLocationWeatherInfo(arg));
    });
    expect(getByTestId(AppTestIds.ForecastView)).toBeOnTheScreen();
  });

  //Selected locations weather forecast information //bottom flatlist
  it('Selected Location Weather forecast information', async () => {
    fetchMock.mockResponse(JSON.stringify(mockDailyForecastWeatherData));
    const { getAllByTestId, update } = renderWithRedux(<Forecast />);
    await waitFor(async () => {
      await store.dispatch(updateSelectedCity(mockCityWeatherData));
      await store.dispatch(getSelectedLocationWeatherForecast(arg));
      await update(<Forecast />);
    });
    expect(getAllByTestId(AppTestIds.ForecastWeatherList).length).toBe(1);
    expect(getAllByTestId(AppTestIds.ForecastScreenWeatherView).length).toBe(
      1 * arg.cnt,
    );
  });

  //Add to favourites test
  it('Updating Favourites', async () => {
    const watchlistSpy = jest.spyOn(store, 'dispatch');
    const { getByTestId } = renderWithRedux(<Forecast />);
    const watchlistPressable = getByTestId(AppTestIds.FavouriteIconPressable);
    waitFor(() => {
      fireEvent(watchlistPressable, 'press');
    });
    expect(watchlistSpy).toHaveBeenCalled();
  });
});
