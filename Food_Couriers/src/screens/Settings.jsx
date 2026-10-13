import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PRIMARY = '#FFC107';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const SettingItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.itemRow}>
    <View style={styles.itemLeft}>
      <Icon name={icon} size={22} color="#6B7280" />
      <Text style={styles.itemText}>{label}</Text>
    </View>
    <Icon name="chevron-right" size={22} color="#9CA3AF" />
  </TouchableOpacity>
);

const SettingSwitch = ({ icon, label, value, onValueChange }) => (
  <View style={styles.itemRow}>
    <View style={styles.itemLeft}>
      <Icon name={icon} size={22} color="#6B7280" />
      <Text style={styles.itemText}>{label}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor={value ? PRIMARY : '#f4f3f4'}
      trackColor={{ false: '#E5E7EB', true: '#FDE68A' }}
    />
  </View>
);


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSub}>Manage your app preferences</Text>
      </View>

      {/* Preferences */}
      <View style={styles.card}>
        <SettingSwitch
          icon="theme-light-dark"
          label="Dark Mode"
          value={darkMode}
          onValueChange={setDarkMode}
        />

        <SettingSwitch
          icon="bell-outline"
          label="Notifications"
          value={notifications}
          onValueChange={setNotifications}
        />
      </View>

      {/* Account */}
      <View style={styles.card}>
        <SettingItem icon="lock-outline" label="Change Password" />
        <SettingItem icon="shield-check-outline" label="Privacy & Security" />
        <SettingItem icon="help-circle-outline" label="Help & Support" />
      </View>

      {/* App Info */}
      <View style={styles.card}>
        <SettingItem icon="information-outline" label="About App" />
        <SettingItem icon="star-outline" label="Rate Us" />
        <SettingItem icon="file-document-outline" label="Terms & Conditions" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  header: {
    padding: 20,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },

  headerSub: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    paddingVertical: 6,
    elevation: 3,
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemText: {
    fontSize: 16,
    marginLeft: 14,
    color: '#111827',
    fontWeight: '500',
  },
});


export default Settings;
