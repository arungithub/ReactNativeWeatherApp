import React from 'react';
import Home from './Home';
import { renderWithRedux } from '../../utils/testUtils/testUtils';
import { enableFetchMocks } from 'jest-fetch-mock';
import { AppTestIds } from '../../utils/testUtils/testIds';
import { waitFor, fireEvent } from '@testing-library/react-native';
import store from '../../core/redux/store';
import { AppConstants } from '../../constants/constants';
import {
  mockCityWeatherData,
  mockLocationWeatherData,
  mockWeatherResponse,
} from '../../utils/testUtils/testMockData';
import {
  actionTypes,
  getCity,
  getCurrentWeatherInfo,
  updateCurrentLocation,
} from '../../core/redux/actions/appActions';

enableFetchMocks();

describe('Home', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponse('[]');
  });

  let arg = {
    lat: mockLocationWeatherData.coords.latitude,
    lon: mockLocationWeatherData.coords.longitude,
    units: AppConstants.Celsius.value,
  };

  it('Receiving Current Geo location', async () => {
    const { update } = renderWithRedux(<Home />);
    const spy = jest.spyOn(store, 'dispatch');
    await waitFor(async () => {
      await store.dispatch(updateCurrentLocation(mockLocationWeatherData));
      await update(<Home />);
    });
    expect(spy).toHaveBeenCalledWith(expect.any(Function));
  });

  //On load getting current loc'n weather details
  it('Load current weather information', async () => {
    fetchMock.mockResponse(JSON.stringify(mockWeatherResponse));
    waitFor(async () => {
      const weather = await store.dispatch(getCurrentWeatherInfo(arg));
      expect(weather.payload).toStrictEqual(mockWeatherResponse);
    });
  });

  it('Search city', async () => {
    fetchMock.mockResponse(JSON.stringify([mockCityWeatherData]));
    const { getByTestId, getAllByTestId } = renderWithRedux(<Home />);
    const textInp = getByTestId(AppTestIds.SearchTextInput);
    const button = getByTestId(AppTestIds.SearchPressable);
    await fireEvent.changeText(textInp, mockCityWeatherData.name);
    await fireEvent.press(button);
    await store.dispatch(getCity({ q: mockCityWeatherData.name }));
    waitFor(() => {
      expect(getAllByTestId(AppTestIds.SearchResultsList).length).toBe(1);
    });
  });
});