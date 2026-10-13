import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { addLike } from '../redux/like/likeSlice';
import { addToCart } from '../redux/cart/cartSlice';
import { serverUrl } from '../utils/server';

const API_URL = `${serverUrl}/api/foods`;
const PRIMARY = '#FFC107';

const Products = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchFoods = async () => {
    try {
      setError(null);

      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error('Failed to fetch foods');
      }

      const data = await res.json();
      setFoods(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFoods();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text style={styles.loadingText}>Loading foods...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>

        <TouchableOpacity
          style={styles.retryBtn}
          onPress={fetchFoods}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
      {/* IMAGE */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Favorite */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.likeBtn}
          onPress={() => dispatch(addLike(item))}
        >
          <Icon
            name="heart-outline"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* INFO */}
      <View style={styles.info}>

        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {item.name}
        </Text>

        <Text
          style={styles.category}
          numberOfLines={1}
        >
          {item.category}
        </Text>

        <View style={styles.bottomRow}>

          {/* Price */}
          <Text style={styles.price}>
            ${item.price}
          </Text>

          {/* Add To Cart */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cartBtn}
            onPress={() => dispatch(addToCart(item))}
          >
            <Icon
              name="cart-plus"
              size={20}
              color="#111827"
            />
          </TouchableOpacity>

        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>All Products</Text>
          <Text style={styles.subHeading}>
            Find something delicious for you
          </Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {foods.length}
          </Text>
        </View>
      </View>

      <FlatList
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[PRIMARY]}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  heading: {
    fontSize: 24,
    color: '#111827',
    fontFamily: 'Outfit-SemiBold',
  },

  subHeading: {
    fontSize: 12,
    color: '#8B8F98',
    marginTop: 2,
    fontFamily: 'Outfit-Regular',
  },

  countBadge: {
    minWidth: 36,
    height: 36,
    paddingHorizontal: 8,
    borderRadius: 18,
    backgroundColor: '#FFF4C7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  countText: {
    fontSize: 13,
    color: '#9A7300',
    fontFamily: 'Outfit-SemiBold',
  },

  list: {
    paddingBottom: 100,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 18,
    overflow: 'hidden',

    elevation: 4,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  imageWrapper: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 185,
  },

  likeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,

    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 4,
  },

  info: {
    padding: 14,
  },

  name: {
    fontSize: 18,
    color: '#111827',
    fontFamily: 'Outfit-SemiBold',
  },

  category: {
    fontSize: 13,
    color: '#8B8F98',
    marginTop: 4,
    fontFamily: 'Outfit-Regular',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 11,
  },

  price: {
    fontSize: 19,
    color: PRIMARY,
    fontFamily: 'Outfit-SemiBold',
  },

  cartBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 2,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  loadingText: {
    marginTop: 10,
    color: '#6B7280',
    fontSize: 13,
    fontFamily: 'Outfit-Regular',
  },

  errorText: {
    color: '#DC2626',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
    marginBottom: 12,
  },

  retryBtn: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 10,
  },

  retryText: {
    color: '#111827',
    fontFamily: 'Outfit-SemiBold',
  },
});

export default Products;
