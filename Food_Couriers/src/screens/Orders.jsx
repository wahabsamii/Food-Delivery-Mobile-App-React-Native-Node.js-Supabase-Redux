import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { serverUrl } from '../utils/server';

const ADMIN_API = `${serverUrl}/api/orders/all`;
const USER_API  = `${serverUrl}/api/orders/`;
const PRIMARY = '#FFC107';

const Orders = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');

      // 🔥 ROLE BASED API
      const url =
        currentUser?.user?.role === 'admin'
          ? ADMIN_API
          : USER_API;
      const token = currentUser.token;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  // 🔄 LOADING
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text style={styles.loading}>Loading orders...</Text>
      </View>
    );
  }

  // ❌ ERROR
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {currentUser.role === 'admin' ? 'All Orders' : 'My Orders'}
      </Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.order_id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* HEADER */}
            <View style={styles.rowBetween}>
              <Text style={styles.orderId}>
                Order #{item.order_id}
              </Text>
              <Text style={styles.total}>${item.total}</Text>
            </View>

            {/* ADMIN ONLY */}
            {currentUser.role === 'admin' && (
              <Text style={styles.user}>
                👤 {item.user_name}
              </Text>
            )}

            {/* ITEMS */}
            <Text style={styles.items}>
              🍽️ {item.items.map(i => i.item_name).join(', ')}
            </Text>

            {/* DATE */}
            <Text style={styles.date}>
              {new Date(item.created_at).toLocaleString()}
            </Text>
          </View>
        )}
      />

      {orders.length === 0 && (
        <Text style={styles.empty}>No orders found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Outfit-SemiBold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
  },
  total: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
    color: PRIMARY,
  },
  user: {
    marginTop: 6,
    fontFamily: 'Outfit-Regular',
    color: '#374151',
  },
  items: {
    marginTop: 4,
    color: '#6B7280',
    fontSize: 13,
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    color: '#9CA3AF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    marginTop: 10,
    color: '#6B7280',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 20,
  },
});

export default Orders;
