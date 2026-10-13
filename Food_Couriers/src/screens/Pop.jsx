
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Pop = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.popup}>

        {/* Logo */}
        <View style={styles.logo}>
          <Icon
            name="truck-fast-outline"
            size={48}
            color="#000"
          />
        </View>

        {/* App Name */}
        <Text style={styles.title}>Food Courier</Text>

        <Text style={styles.subtitle}>
          Delicious food, delivered fast
        </Text>

        {/* Loading */}
        <ActivityIndicator
          size="small"
          color="#000"
          style={styles.loader}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
  },

  popup: {
    width: '82%',
    paddingVertical: 38,
    paddingHorizontal: 25,
    backgroundColor: '#FFC107',
    borderRadius: 24,
    alignItems: 'center',

    elevation: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  logo: {
    width: 85,
    height: 85,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  title: {
    fontSize: 28,
    fontFamily: 'Outfit-SemiBold',
    color: '#111111',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    color: '#333333',
    textAlign: 'center',
  },

  loader: {
    marginTop: 22,
  },
});

export default Pop;