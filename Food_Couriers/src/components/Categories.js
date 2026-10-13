import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PRIMARY = '#FFC107';

const categories = [
  { id: '1', name: 'Burger', icon: 'hamburger' },
  { id: '2', name: 'Pizza', icon: 'pizza' },
  { id: '3', name: 'Biryani', icon: 'food-drumstick' },
  { id: '4', name: 'Drinks', icon: 'cup' },
  { id: '5', name: 'Dessert', icon: 'cake-variant' },
];

export default function Categories() {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>

        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
          >
            <View style={styles.iconBox}>
              <Icon
                name={item.icon}
                size={28}
                color="#111827"
              />
            </View>

            <Text style={styles.name}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 18,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  title: {
    fontSize: 20,
    color: '#111827',
    fontFamily: 'Outfit-SemiBold',
  },

  seeAll: {
    fontSize: 13,
    color: '#D89F00',
    fontFamily: 'Outfit-SemiBold',
  },

  list: {
    paddingRight: 16,
  },

  card: {
    width: 88,
    marginRight: 12,
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#fff',

    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFF8DD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },

  name: {
    fontSize: 12,
    color: '#111827',
    fontFamily: 'Outfit-SemiBold',
  },
});
