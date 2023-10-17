# WeatherApp
Weather App developed in React Native, mainly targeting iOS platform. 

Minimum deployment target: iOS 13 and above.

This project is developed using React Native CLI development environment.(Ref: https://reactnative.dev/docs/environment-setup).

A simulator recording of the app below, for a quick reference/glance:

https://github.com/arungithub/ReactNativeWeatherApp/assets/1140177/72cffe21-b53a-4220-a368-c9d6a56e23f5

# How to run the app:

**Prerequisite:**
- React Native development environment 
- Xcode with latest iOS simulators and command line tools

**Post checkout of codebase:**
- Install all the dependencies by running the following command, `npm i` within the projects directory.
- Navigate inside ios directory from project’s directory and run  `pod install`

Note: If you face any errors like "_Could not find proper version of cocoapods (x.y.z) in any of the sources_" then run `bundle install` and retry `pod Install`.
- Open Xcode and run the app selecting the simulator or the device of your choice. Or
You can even run within Visual Studio Code terminal by `npm run ios` command(ex: for specific simulator: `npm run ios -- --simulator="iPhone 14 Pro (16.0)"`).
 
# Used Libraries:
- React Navigation for navigation between screens. 
- React Native GeoLocation for utilising device GPS feature, to get the user’s current location. 
- Redux, Redux-Toolkit for state management. 
- Jest testing library for unit tests. 
