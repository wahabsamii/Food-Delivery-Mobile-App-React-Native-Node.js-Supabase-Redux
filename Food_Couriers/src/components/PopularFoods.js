
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';
import { addLike } from '../redux/like/likeSlice';
import { serverUrl } from '../utils/server';

const API_URL = `${serverUrl}/api/foods`;
const PRIMARY = '#FFC107';

export default function PopularFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="small" color={PRIMARY} />
        <Text style={styles.loadingText}>Loading popular foods...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Popular Foods</Text>

        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>

            {/* Image */}
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: item.image }}
                resizeMode="cover"
                style={styles.image}
              />

              {/* Favorite */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.likeBtn}
                onPress={() => dispatch(addLike(item))}
              >
                <Icon
                  name="heart-outline"
                  size={21}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            {/* Info */}
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

              {/* Bottom Row */}
              <View style={styles.bottomRow}>

                <Text style={styles.price}>
                  ${item.price}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.cartBtn}
                  onPress={() => dispatch(addToCart(item))}
                >
                  <Icon
                    name="cart-plus"
                    size={19}
                    color="#111827"
                  />
                </TouchableOpacity>

              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 18,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  heading: {
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
    width: 205,
    backgroundColor: '#fff',
    borderRadius: 17,
    marginRight: 14,
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
    height: 125,
  },

  likeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,

    width: 36,
    height: 36,
    borderRadius: 18,

    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,
  },

  info: {
    padding: 12,
  },

  name: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Outfit-SemiBold',
  },

  category: {
    fontSize: 12,
    color: '#8B8F98',
    marginTop: 3,
    fontFamily: 'Outfit-Regular',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  price: {
    fontSize: 17,
    color: PRIMARY,
    fontFamily: 'Outfit-SemiBold',
  },

  cartBtn: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },

  center: {
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: 7,
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Outfit-Regular',
  },

  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontFamily: 'Outfit-Regular',
  },
});
