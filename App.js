import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import TopStoriesScreen from './src/screens/TopStoriesScreen';
import NewsCategoryScreen from './src/screens/NewsCategoryScreen';
import ArticleSearchScreen from './src/screens/ArticleSearchScreen';
import ArticleDetailScreen from './src/screens/ArticleDetailScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const {isAuthenticated} = useSelector(state => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="NewsCategory"
              component={NewsCategoryScreen}
              options={{
                title: 'Categories',
              }}
            />
            <Stack.Screen
              name="TopStories"
              component={TopStoriesScreen}
              options={{
                title: 'Top Stories',
              }}
            />
            <Stack.Screen
              name="ArticleSearch"
              options={{
                title: 'Search',
              }}
              component={ArticleSearchScreen}
            />
            <Stack.Screen
              name="ArticleDetail"
              options={{
                title: 'Detail',
              }}
              component={ArticleDetailScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
