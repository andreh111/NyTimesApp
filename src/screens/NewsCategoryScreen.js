import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  Chip,
  HStack,
  Pressable,
  Text,
  TextInput,
} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addRecentSearch} from '../store/slices/recentSearches.slice';

const NewsCategoryScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState('');

  const recentSearches =
    useSelector(state => state.searches.recentSearches) ?? [];

  const addToSearchHistory = () => {
    setSearchInput('');
    dispatch(addRecentSearch(searchInput));
    navigation.navigate('ArticleSearch', {query: searchInput});
  };

  const onCategoryPress = category => () =>
    navigation.navigate('TopStories', {category});

  const onRecentSearchPress = search => () =>
    navigation.navigate('ArticleSearch', {query: search});

  return (
    <>
      <View style={styles.main}>
        <Text>Pick a category from Top Stories</Text>
        <View style={styles.container}>
          <Pressable
            onPress={onCategoryPress('science')}
            style={styles.category}>
            <Text style={styles.white}>Science</Text>
          </Pressable>
          <Pressable onPress={onCategoryPress('world')} style={styles.category}>
            <Text style={styles.white}>World</Text>
          </Pressable>
        </View>
        <Text style={styles.text}>Or search an article ? </Text>
        <View>
          <TextInput
            value={searchInput}
            onChangeText={setSearchInput}
            placeholder="Article name"
            variant="standard"
          />
          <Button title="Search" onPress={addToSearchHistory} />
        </View>

        {/* we need to get these from redux persistent storage */}
        <Text style={styles.text}>Recent searches:</Text>
        <HStack spacing={4} style={styles.searches}>
          {recentSearches.map((search, index) => {
            return (
              <Chip
                onPress={onRecentSearchPress(search)}
                key={index}
                variant="outlined"
                label={search}
              />
            );
          })}
        </HStack>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    margin: 10,
  },
  text: {
    marginVertical: 10,
  },
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 20,
  },
  category: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#5825e3',
    marginHorizontal: 10,
  },
  searches: {flexWrap: 'wrap'},
  white: {
    color: '#ffffff',
  },
});

export default NewsCategoryScreen;
