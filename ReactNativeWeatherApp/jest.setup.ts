import { jest } from '@jest/globals';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});

jest.mock('@react-native-community/geolocation', () => ({
  addListener: jest.fn(),
  getCurrentPosition: jest.fn(),
  removeListeners: jest.fn(),
  requestAuthorization: jest.fn(() => Promise.resolve(true)),
  setConfiguration: jest.fn(),
  startObserving: jest.fn(),
  setRNConfiguration: jest.fn(),
  stopObserving: jest.fn(),
}));

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: (props: any) => props.children,
}));