
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/EvilIcons';
import { removeLike } from '../redux/like/likeSlice';

const PRIMARY = '#FFC107';

const Fav = () => {
  const { likeProducts } = useSelector((state) => state.like);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          id: item.id,
        })
      }
    >
      {/* FOOD IMAGE */}
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* FOOD INFO */}
      <View style={styles.info}>
        <View style={styles.details}>
          <Text
            style={styles.name}
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <Text style={styles.category}>
            {item.category}
          </Text>

          <Text style={styles.price}>
            ${item.price}
          </Text>
        </View>

        {/* REMOVE FAVORITE */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.likeBtn}
          onPress={() => dispatch(removeLike(item.id))}
        >
          <Icon
            name="heart"
            size={23}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // EMPTY STATE
  if (likeProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Icon
            name="heart"
            size={50}
            color={PRIMARY}
          />
        </View>

        <Text style={styles.emptyTitle}>
          No Favorites Yet
        </Text>

        <Text style={styles.emptyText}>
          Save your favorite foods here and find them easily later.
        </Text>

        <TouchableOpacity
          style={styles.browseBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.browseText}>
            Browse Foods
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>
            Favorites
          </Text>

          <Text style={styles.subtitle}>
            {likeProducts.length}{' '}
            {likeProducts.length === 1
              ? 'favorite'
              : 'favorites'}
          </Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {likeProducts.length}
          </Text>
        </View>
      </View>

      {/* LIST */}
      <FlatList
        data={likeProducts}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 18,
    paddingBottom: 15,
  },

  pageTitle: {
    fontSize: 24,
    fontFamily: 'Outfit-SemiBold',
    color: '#111827',
  },

  subtitle: {
    marginTop: 3,
    fontSize: 13,
    fontFamily: 'Outfit-Regular',
    color: '#9CA3AF',
  },

  countBadge: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#FFF7D6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  countText: {
    fontSize: 15,
    fontFamily: 'Outfit-SemiBold',
    color: '#B77900',
  },

  // LIST
  list: {
    paddingBottom: 20,
  },

  // CARD
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    marginBottom: 13,
    overflow: 'hidden',

    elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 7,
  },

  image: {
    width: 110,
    height: 110,
  },

  info: {
    flex: 1,
    flexDirection: 'row',
    padding: 13,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  details: {
    flex: 1,
    paddingRight: 10,
  },

  name: {
    fontSize: 16,
    fontFamily: 'Outfit-SemiBold',
    color: '#111827',
  },

  category: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 5,
    marginBottom: 8,
    fontFamily: 'Outfit-Regular',
  },

  price: {
    fontSize: 17,
    fontFamily: 'Outfit-SemiBold',
    color: '#E5A900',
  },

  // HEART
  likeBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',

    elevation: 2,
  },

  // EMPTY STATE
  emptyContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 35,
  },

  emptyIcon: {
    width: 90,
    height: 90,
    borderRadius: 30,
    backgroundColor: '#FFF7D6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 23,
    fontFamily: 'Outfit-SemiBold',
    color: '#111827',
    marginBottom: 8,
  },

  emptyText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Outfit-Regular',
    color: '#6B7280',
    marginBottom: 22,
  },

  browseBtn: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 13,
  },

  browseText: {
    fontSize: 14,
    fontFamily: 'Outfit-SemiBold',
    color: '#111827',
  },
});

export default Fav;