import React, {useState} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Text} from '@react-native-material/core';
import {useRoute} from '@react-navigation/native';

const ArticleDetailScreen = () => {
  const [imageError, setImageError] = useState(false);
  const {
    params: {title, abstract, published_date, multimedia, isSearching},
  } = useRoute();

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View>
      <Image
        style={styles.img}
        source={
          imageError
            ? require('../assets/nytimes.png')
            : {
                uri: isSearching
                  ? `https://static01.nyt.com/${multimedia[0]?.legacy?.xlarge}`
                  : multimedia?.[0]?.url,
              }
        }
        onError={handleImageError}
      />
      <View style={styles.space}>
        <Text style={styles.title}>{title}</Text>
        <Text>{abstract}</Text>
        <Text style={styles.date}>{published_date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    marginTop: 10,
  },
  img: {
    width: '100%',
    height: 300,
  },
  space: {
    margin: 10,
  },
});

export default ArticleDetailScreen;
