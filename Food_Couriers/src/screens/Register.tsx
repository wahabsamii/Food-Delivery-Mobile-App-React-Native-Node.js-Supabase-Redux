import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { serverUrl } from '../utils/server';

const Register = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${serverUrl}/api/users/register`,
        {
          name: name.trim(),
          email: email.trim(),
          password,
        }
      );

      ToastAndroid.show(
        response.data.message || 'Account created successfully!',
        ToastAndroid.SHORT
      );

      navigation.navigate('Login');
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Icon
              name="truck-fast-outline"
              size={42}
              color="#000"
            />
          </View>

          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.subtitle}>
            Join Food Courier and order your favorite food
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>

          {/* Name */}
          <Text style={styles.label}>Full Name</Text>

          <View style={styles.inputContainer}>
            <Icon
              name="account-outline"
              size={22}
              color="#777"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* Email */}
          <Text style={styles.label}>Email Address</Text>

          <View style={styles.inputContainer}>
            <Icon
              name="email-outline"
              size={22}
              color="#777"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <Text style={styles.label}>Password</Text>

          <View style={styles.inputContainer}>
            <Icon
              name="lock-outline"
              size={22}
              color="#777"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm Password</Text>

          <View style={styles.inputContainer}>
            <Icon
              name="lock-check-outline"
              size={22}
              color="#777"
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />

            <TouchableOpacity
              onPress={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              <Icon
                name={
                  showConfirmPassword
                    ? 'eye-off-outline'
                    : 'eye-outline'
                }
                size={22}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          {/* Error */}
          {error ? (
            <View style={styles.errorBox}>
              <Icon
                name="alert-circle-outline"
                size={20}
                color="#D32F2F"
              />

              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Register Button */}
          <TouchableOpacity
            style={[
              styles.registerButton,
              loading && styles.disabledButton,
            ]}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <>
                <Text style={styles.registerText}>
                  Create Account
                </Text>

                <Icon
                  name="arrow-right"
                  size={21}
                  color="#000"
                />
              </>
            )}
          </TouchableOpacity>

          {/* Login */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginLink}> Login</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingVertical: 35,
  },

  header: {
    alignItems: 'center',
    marginBottom: 30,
  },

  logo: {
    width: 78,
    height: 78,
    borderRadius: 40,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    elevation: 5,
  },

  title: {
    fontSize: 28,
    fontFamily: 'Outfit-SemiBold',
    color: '#111',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    color: '#777',
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 20,
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    fontFamily: 'Outfit-SemiBold',
    color: '#333',
    marginBottom: 8,
    marginTop: 14,
  },

  inputContainer: {
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  input: {
    flex: 1,
    height: '100%',
    marginLeft: 10,
    fontSize: 15,
    fontFamily: 'Outfit-Regular',
    color: '#222',
  },

  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 12,
    marginTop: 18,
  },

  errorText: {
    flex: 1,
    marginLeft: 8,
    color: '#D32F2F',
    fontSize: 13,
    fontFamily: 'Outfit-Regular',
  },

  registerButton: {
    height: 56,
    backgroundColor: '#FFC107',
    borderRadius: 16,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    elevation: 4,
  },

  disabledButton: {
    opacity: 0.7,
  },

  registerText: {
    fontSize: 16,
    fontFamily: 'Outfit-SemiBold',
    color: '#000',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 10,
  },

  loginText: {
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    color: '#777',
  },

  loginLink: {
    fontSize: 14,
    fontFamily: 'Outfit-SemiBold',
    color: '#D99F00',
  },
});

export default Register;