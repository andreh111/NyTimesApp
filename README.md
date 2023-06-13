## Demo for NyTimes React Native App


### To run the app:

1) Clone the repository

2) `cd NyTimesApp/`

3) Install the dependencies `npm install` and then run `cd ios/ && pod install`

4) To run the app on ios run `npx react-native run-ios` or on android run `npx react-native run-android`

5) Additional requirements:
  The app requires to have an api key to access NyTimes api so in order to make that working you need to create this file `config/index.js` inside `src/` directory and add the following to it `export const API_KEY = 'YOUR_API_KEY';` where you can login to https://developer.nytimes.com/ to create an app and get the required api key and use it.

    The App contains Login/Register functionality using this repo https://github.com/techiediaries/fake-api-jwt-json-server so you need to clone it and then follow the instructions to get the server up and running.

 
### Run unit tests

To run the unit tests run the command: `npm run test`

