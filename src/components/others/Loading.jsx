import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <ActivityIndicator size="large" color="#8CCECC" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#151515',
    borderRadius: 20, 
  },
});

export default Loading;
