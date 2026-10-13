
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const PRIMARY = '#FFC107';

const HomeHeader = () => {
  const navigation = useNavigation();
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <View style={styles.container}>

      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.greetingBox}>
          <Text style={styles.welcome}>Welcome back 👋</Text>

          <Text style={styles.title} numberOfLines={1}>
            {currentUser?.user?.name || 'Food Lover'}
          </Text>

          <Text style={styles.subtitle}>
            What are you craving today?
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.profileBtn}
          onPress={() => navigation.openDrawer()}
        >
          <Icon name="account" size={25} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Icon name="magnify" size={22} color="#8B8F98" />

        <TextInput
          placeholder="Search food or restaurant..."
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.filterBtn}
        >
          <Icon name="tune-variant" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  greetingBox: {
    flex: 1,
    paddingRight: 15,
  },

  welcome: {
    fontSize: 13,
    color: '#8B8F98',
    fontFamily: 'Outfit-Regular',
    marginBottom: 2,
  },

  title: {
    fontSize: 21,
    color: '#111827',
    fontFamily: 'Outfit-SemiBold',
  },

  subtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Outfit-Regular',
    marginTop: 2,
  },

  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  searchBox: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F8',
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 6,

    borderWidth: 1,
    borderColor: '#F0F0F0',
  },

  input: {
    flex: 1,
    height: 50,
    marginHorizontal: 9,
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Outfit-Regular',
  },

  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeHeader;