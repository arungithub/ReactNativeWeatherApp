import { View, Text, FlatList, Image, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/redux/store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ForecastResponse, GetCityResponse, WeatherResponse } from '../../types/types';
import { addCityToFavourites, removeCityFromFavourites } from '../../core/redux/actions/appActions';
import Utils from '../../utils/utils';
import { ForecastStyle } from './styles';
import Styles from '../../styles/styles';
import ErrorInfo from '../../components/errorInfo/errorInfo';

const Forecast = () => {
  const getAppState = (state: RootState) => state.App;
  const getWeather = (state: RootState) => state.weather;
  const dispatch = useAppDispatch();

  const { currentGeoLocation, selectedLocation } = useSelector(
    (state: RootState) => getAppState(state),
  );
  const { currentWeatherInformation, selectedLocationWeather, selectedLocationForecastInformation } =
    useAppSelector(getWeather);

  const addCityToFavourites = (city: GetCityResponse) => {
    city.isFavourite
      ? dispatch(removeCityFromFavourites(city))
      : dispatch(addCityToFavourites(city));
  };

  //5 days forecast flatlist items
  const renderForecastItem = (
    weatherInfo: WeatherResponse,
    index: number,
  ) => {
    const { dayName } = Utils.formatUnixDateToReadable(weatherInfo.dt);
    return (
      <View
        style={[Styles.flex1, ForecastStyle.forecastTileStyle, Styles.tileBackgroundColor]}
        key={index}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{dayName}</Text>
        </View>
        <View style={Styles.flex1}>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', width: 140 }}>
            <Image
              source={{
                uri: Utils.loadWeatherIcons(weatherInfo?.weather[0].icon),
              }}
              style={Styles.weatherStatusIconStyle}
            />
            <Text style={{ fontSize: 16, color: 'black', textAlign: "center" }}>
              {weatherInfo?.weather[0].main} -{' '}
              {weatherInfo?.weather[0].description}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  //generating forecast flatlist 
  const weatherForecastList = (weather: ForecastResponse) => {
    return (
      <FlatList
        data={weather.list}
        renderItem={({ item, index }) => renderForecastItem(item, index)}
        horizontal={true}
        style={Styles.paddingVertical16}
      />
    );
  };

  const Data = ({ title, value }: { title: string, value: string | number }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={{ color: 'white', fontSize: 22 }}>{title}</Text>
      <Text style={{ color: 'white', fontSize: 22 }}>{value}</Text>
    </View>
  );

  return (
    <View style={Styles.flex1}>
      <View style={[Styles.flex1, Styles.appBackgroundThemeColor, Styles.padding_v_h_20]}>
        {selectedLocationForecastInformation ? (
          <View style={[Styles.flex1, Styles.appBackgroundThemeColor]}>

            {selectedLocation ? (
              <View>
                <Pressable
                  style={[Styles.mediumIcon]}
                  onPress={() => addCityToFavourites(selectedLocation as GetCityResponse)}>
                  <Image
                    source={
                      selectedLocation?.isFavourite
                        ? require('../../assets/images/favouriteSelected.png')
                        : require('../../assets/images/favourite.png')
                    }
                    style={[Styles.mediumIcon]}
                  />
                </Pressable>
              </View>) : null}

            <View style={[Styles.flex1, Styles.padding_t_b_10]}>
              <Text style={{ color: 'white', fontSize: 40, textAlign: "center" }}>{selectedLocationWeather?.name}</Text>
              <Text style={{ fontSize: 22, color: 'white', textAlign: "center" }}>
                {selectedLocationWeather?.weather[0].main}
              </Text>
              <Text style={{ color: 'white', fontSize: 64, textAlign: "center" }}>
                {Utils.getRoundOfTemp(selectedLocationWeather?.main.temp as string)}
              </Text>
            </View>
          </View>
        ) : (
          <ErrorInfo />
        )}
      </View>
    </View>
  );
};

export default Forecast;