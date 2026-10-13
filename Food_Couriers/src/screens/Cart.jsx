
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { clearCart } from '../redux/cart/cartSlice';
import axios from 'axios';
import { serverUrl } from '../utils/server';

const PRIMARY = '#FFC107';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.auth);

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price),
    0
  );

  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // PLACE ORDER
  const placeOrder = async () => {
    setError('');
    setLoading(true);

    try {
      const token = currentUser.token;

      if (!token) {
        throw new Error('Please login first');
      }

      const payload = {
        items: cartItems.map((item) => ({
          item_id: item.id,
          quantity: item.quantity,
        })),
      };

      await axios.post(
        `${serverUrl}/api/orders`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(clearCart());

      ToastAndroid.show(
        'Order placed successfully!',
        ToastAndroid.SHORT
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message
      );
    } finally {
      setLoading(false);
    }
  };

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
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {item.name}
        </Text>

        <Text style={styles.category}>
          {item.category}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>
            ${item.price}
          </Text>

          {item.quantity && (
            <View style={styles.quantityBadge}>
              <Text style={styles.quantityText}>
                x{item.quantity}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyCircle}>
          <Text style={styles.emptyIcon}>🛒</Text>
        </View>

        <Text style={styles.emptyTitle}>
          Your Cart is Empty
        </Text>

        <Text style={styles.emptyText}>
          Add some delicious food to your cart and order your favorite meal.
        </Text>

        <TouchableOpacity
          style={styles.browseButton}
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
            My Cart
          </Text>

          <Text style={styles.itemCount}>
            {cartItems.length}{' '}
            {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </Text>
        </View>
      </View>

      {/* ERROR */}
      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
      ) : null}

      {/* CART ITEMS */}
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />

      {/* BOTTOM SUMMARY */}
      <View style={styles.bottomContainer}>

        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>
              Total Amount
            </Text>

            <Text style={styles.deliveryText}>
              Free delivery
            </Text>
          </View>

          <Text style={styles.totalPrice}>
            ${total.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.placeBtn,
            loading && styles.disabledButton,
          ]}
          onPress={placeOrder}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <>
              <ActivityIndicator
                size="small"
                color="#fff"
              />

              <Text style={styles.placeBtnText}>
                Placing Order...
              </Text>
            </>
          ) : (
            <Text style={styles.placeBtnText}>
              Place Order
            </Text>
          )}
        </TouchableOpacity>

        <Text style={styles.secureText}>
          🔒 Secure and fast checkout
        </Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  // HEADER
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  pageTitle: {
    fontSize: 25,
    fontFamily: 'Outfit-SemiBold',
    color: '#111827',
  },

  itemCount: {
    marginTop: 3,
    fontSize: 13,
    fontFamily: 'Outfit-Regular',
    color: '#9CA3AF',
  },

  // ERROR
  errorBox: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontFamily: 'Outfit-Regular',
  },

  // LIST
  list: {
    padding: 16,
    paddingBottom: 15,
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
    width: 105,
    height: 105,
  },

  info: {
    flex: 1,
    padding: 13,
    justifyContent: 'space-between',
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
    fontFamily: 'Outfit-Regular',
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  price: {
    fontSize: 17,
    fontFamily: 'Outfit-SemiBold',
    color: '#E5A900',
  },

  quantityBadge: {
    backgroundColor: '#FFF8D8',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },

  quantityText: {
    fontSize: 12,
    fontFamily: 'Outfit-SemiBold',
    color: '#A16207',
  },

  // BOTTOM
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 20,

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    elevation: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  totalLabel: {
    fontSize: 16,
    fontFamily: 'Outfit-SemiBold',
    color: '#111827',
  },

  deliveryText: {
    marginTop: 2,
    fontSize: 11,
    fontFamily: 'Outfit-Regular',
    color: '#16A34A',
  },

  totalPrice: {
    fontSize: 23,
    fontFamily: 'Outfit-SemiBold',
    color: '#E5A900',
  },

  placeBtn: {
    height: 50,
    backgroundColor: PRIMARY,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  disabledButton: {
    opacity: 0.6,
  },

  placeBtnText: {
    fontSize: 16,
    fontFamily: 'Outfit-SemiBold',
    color: '#111827',
  },

  secureText: {
    textAlign: 'center',
    marginTop: 9,
    fontSize: 11,
    fontFamily: 'Outfit-Regular',
    color: '#9CA3AF',
  },

  // EMPTY
  emptyContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 35,
  },

  emptyCircle: {
    width: 90,
    height: 90,
    borderRadius: 30,
    backgroundColor: '#FFF7D6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  emptyIcon: {
    fontSize: 40,
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

  browseButton: {
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

export default Cart;
