import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';

const PRIMARY = '#FFC107';

const ProductDetails = ({ route }) => {
  const { id } = route.params;
  const API_URL = `http://192.168.213.144:5000/api/foods/${id}`;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  // 🔹 Fetch product by ID
  const fetchProduct = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to load product');

      const data = await res.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // 🔹 Loading state
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  // 🔹 Error state
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // 🔹 UI
  return (
    <View style={styles.container}>
      {/* Image */}
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>

        <Text style={styles.price}>${product.price}</Text>

        <Text style={styles.desc}>{product.description}</Text>

        {/* Quantity */}
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty(Math.max(1, qty - 1))}
          >
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qtyValue}>{qty}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty(qty + 1)}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Cart */}
        <TouchableOpacity style={styles.cartBtn} onPress={() => dispatch(addToCart(product))}>
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  image: {
    width: '100%',
    height: 300,
  },

  content: {
    padding: 20,
  },

  name: {
    fontSize: 24,
    fontFamily: 'Outfit-SemiBold',
    color: '#111827',
  },

  category: {
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 6,
    fontFamily:'Outfit-Regular'
  },

  price: {
    fontSize: 22,
    fontFamily: 'Outfit-SemiBold',
    color: PRIMARY,
    marginVertical: 10,
  },

  desc: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },

  qtyBtn: {
    backgroundColor: PRIMARY,
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyText: {
    fontSize: 22,
    fontWeight: '700',
  },

  qtyValue: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 24,
  },

  cartBtn: {
    backgroundColor: PRIMARY,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 30,
  },

  cartText: {
    fontSize: 16,
    fontWeight: '700',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    color: '#6B7280',
    fontFamily: 'Outfit-Regular'
  },

  errorText: {
    color: 'red',
    fontSize: 16,
  },
});


export default ProductDetails;
