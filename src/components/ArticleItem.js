import {Pressable} from '@react-native-material/core';
import React from 'react';
import {Image, Text, StyleSheet, Dimensions} from 'react-native';

const ArticleItem = ({
  title,
  abstract,
  published_date,
  multimediaUrl,
  onPress,
}) =>
  abstract &&
  multimediaUrl && (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: multimediaUrl}}
        defaultSource={require('../assets/nytimes.png')}
      />
      {title && <Text style={styles.text}>{title}</Text>}
      {abstract && <Text style={styles.text}>{abstract}</Text>}
      {published_date && <Text style={styles.text}>{published_date}</Text>}
    </Pressable>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginVertical: 5,
  },
  text: {
    marginStart: 10,
    width: Dimensions.get('screen').width - 70,
  },
});

export default ArticleItem;
