import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const PRIMARY = '#FFC107';

const Profile = () => {
  // 🔹 Dummy user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+92 300 1234567',
    avatar: 'https://i.pravatar.cc/300',
  };
  const {currentUser} = useSelector((state) => state.auth);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />

        <Text style={styles.name}>{currentUser.user.name}</Text>
        <Text style={styles.email}>{currentUser.user.email}</Text>
      </View>

      {/* Info Card */}
      <View style={styles.card}>
        <ProfileItem icon="phone-outline" label="Phone" value={user.phone} />
        <ProfileItem icon="email-outline" label="Email" value={user.email} />
        <ProfileItem icon="map-marker-outline" label="Address" value="Lahore, Pakistan" />
      </View>

      {/* Actions */}
      <View style={styles.card}>
        <ActionItem icon="account-edit-outline" label="Edit Profile" />
        <ActionItem icon="lock-outline" label="Change Password" />
        <ActionItem icon="logout" label="Logout" danger />
      </View>
    </ScrollView>
  );
};
const ProfileItem = ({ icon, label, value }) => (
  <View style={styles.itemRow}>
    <Icon name={icon} size={22} color="#6B7280" />
    <View style={{ marginLeft: 14 }}>
      <Text style={styles.itemLabel}>{label}</Text>
      <Text style={styles.itemValue}>{value}</Text>
    </View>
  </View>
);

const ActionItem = ({ icon, label, danger }) => (
  <TouchableOpacity style={styles.actionRow}>
    <Icon
      name={icon}
      size={22}
      color={danger ? '#EF4444' : '#111827'}
    />
    <Text
      style={[
        styles.actionText,
        danger && { color: '#EF4444' },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  header: {
    alignItems: 'center',
    backgroundColor: PRIMARY,
    paddingVertical: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 10,
  },

  name: {
    fontSize: 22,
    fontFamily: 'Outfit-SemiBold',
    color: '#000',
  },

  email: {
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
    fontFamily:'Outfit-Regular'
  },

  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 14,
    elevation: 3,
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  itemLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily:'Outfit-Regular'
  },

  itemValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
    fontFamily:'Outfit-SemiBold'
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },

  actionText: {
    fontSize: 16,
    marginLeft: 14,
    color: '#111827',
    fontFamily:'Outfit-SemiBold'
  },
});

export default Profile;
