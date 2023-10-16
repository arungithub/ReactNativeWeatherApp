import {
    locationConfig,
    getCurrentLocation,
    requestLocationAccess,
  } from './geoLocation';
  import Geolocation from '@react-native-community/geolocation';
  
  describe('Geolocation', () => {
    it('Location init config', () => {
      const initConfigSpy = jest.spyOn(Geolocation, 'setRNConfiguration');
      locationConfig();
      expect(initConfigSpy).toHaveBeenCalledWith({
        skipPermissionRequests: false,
        authorizationLevel: 'auto',
        locationProvider: 'auto',
      });
    });
  
    it('Request authorization', () => {
      const authSpy = jest.spyOn(Geolocation, 'requestAuthorization');
      requestLocationAccess();
      expect(authSpy).toHaveBeenCalled();
    });
  
    it('Get CurrentLocation', () => {
      const positionSpy = jest.spyOn(Geolocation, 'getCurrentPosition');
      getCurrentLocation();
      expect(positionSpy).toHaveBeenCalled();
    });
  });