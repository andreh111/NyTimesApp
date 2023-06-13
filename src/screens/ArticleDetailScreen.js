import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Text} from '@react-native-material/core';
import {useRoute} from '@react-navigation/native';

const ArticleDetailScreen = () => {
  const {
    params: {title, abstract, published_date, multimedia},
  } = useRoute();

  return (
    <View>
      <Image
        style={styles.img}
        source={{uri: multimedia?.[0]?.url}}
        defaultSource={require('../assets/nytimes.png')}
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
