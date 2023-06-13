import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
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
import {logout} from '../store/slices/auth.slice';

const NewsCategoryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const recentSearches =
    useSelector(state => state.searches.recentSearches) || [];

  const addToSearchHistory = () => {
    setSearchInput('');
    dispatch(addRecentSearch(searchInput));
    navigation.navigate('ArticleSearch', {query: searchInput});
  };

  const onCategoryPress = category => () => {
    navigation.navigate('TopStories', {category});
  };

  const onRecentSearchPress = search => () => {
    navigation.navigate('ArticleSearch', {query: search});
  };

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>Pick a category from Top Stories</Text>
        <View style={styles.categoryContainer}>
          <Pressable
            onPress={onCategoryPress('science')}
            style={styles.category}>
            <Text style={styles.categoryText}>Science</Text>
          </Pressable>
          <Pressable onPress={onCategoryPress('world')} style={styles.category}>
            <Text style={styles.categoryText}>World</Text>
          </Pressable>
        </View>
        <Text style={styles.text}>Or search for an article:</Text>
        <View style={styles.searchContainer}>
          <TextInput
            value={searchInput}
            onChangeText={setSearchInput}
            placeholder="Article name"
            variant="standard"
            style={styles.input}
          />
          <Button
            title="Search"
            onPress={addToSearchHistory}
            style={styles.searchButton}
          />
        </View>
        <Text style={styles.text}>Recent searches:</Text>
        <HStack spacing={4} style={styles.searches}>
          {recentSearches.map((search, index) => (
            <Chip
              key={index}
              variant="outlined"
              label={search}
              onPress={onRecentSearchPress(search)}
            />
          ))}
        </HStack>
      </ScrollView>
      <Pressable onPress={onLogout} style={styles.logoutButton}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  category: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#5825e3',
  },
  categoryText: {
    color: '#ffffff',
  },
  text: {
    marginVertical: 10,
  },
  searchContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  searchButton: {
    width: '100%',
    alignSelf: 'flex-start',
  },
});

export default NewsCategoryScreen;
