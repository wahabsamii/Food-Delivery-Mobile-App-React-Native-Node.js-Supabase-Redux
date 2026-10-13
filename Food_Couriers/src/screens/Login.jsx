import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { serverUrl } from '../utils/server';

const PRIMARY = '#FFC107';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${serverUrl}/api/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(
        signInSuccess({
          user: response.data.user,
          token: response.data.token,
        })
      );

      ToastAndroid.show(
        'Login Successful!',
        ToastAndroid.SHORT
      );

      navigation.navigate('MainApp');
    } catch (err) {
      console.log('LOGIN ERROR:', err);

      const message =
        err.response?.data?.message ||
        err.message ||
        'Connection to server failed';

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >

        {/* Header */}
        <View style={styles.header}>

          <View style={styles.logoCircle}>
            <Icon
              name="truck-delivery-outline"
              size={40}
              color="#111827"
            />
          </View>

          <Text style={styles.welcomeText}>
            Welcome Back!
          </Text>

          <Text style={styles.subText}>
            Login to your Food Couriers account
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Email Address
            </Text>

            <View style={styles.inputWrapper}>
              <Icon
                name="email-outline"
                size={21}
                color="#9CA3AF"
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Password
            </Text>

            <View style={styles.inputWrapper}>
              <Icon
                name="lock-outline"
                size={21}
                color="#9CA3AF"
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowPassword(!showPassword)
                }
                style={styles.eyeBtn}
              >
                <Icon
                  name={
                    showPassword
                      ? 'eye-off-outline'
                      : 'eye-outline'
                  }
                  size={21}
                  color="#777"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Error */}
          {error ? (
            <View style={styles.errorBox}>
              <Icon
                name="alert-circle-outline"
                size={20}
                color="#DC2626"
              />

              <Text style={styles.errorText}>
                {error}
              </Text>
            </View>
          ) : null}

          {/* Forgot Password */}
          <TouchableOpacity
            style={styles.forgotBtn}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login */}
          <TouchableOpacity
            style={[
              styles.loginBtn,
              isLoading && styles.loginBtnDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator
                  size="small"
                  color="#111827"
                />

                <Text style={styles.loginBtnText}>
                  Logging in...
                </Text>
              </View>
            ) : (
              <View style={styles.loginContent}>
                <Text style={styles.loginBtnText}>
                  Login
                </Text>

                <Icon
                  name="arrow-right"
                  size={21}
                  color="#111827"
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.signUpText}>
              {' '}Sign Up
            </Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  /* Header */

  header: {
    alignItems: 'center',
    marginBottom: 34,
  },

  logoCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,

    elevation: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },

  welcomeText: {
    fontSize: 28,
    color: '#111827',
    fontFamily: 'Outfit-SemiBold',
  },

  subText: {
    fontSize: 14,
    color: '#8B8F98',
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
  },

  /* Form */

  form: {
    width: '100%',
  },

  inputContainer: {
    marginBottom: 17,
  },

  label: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 7,
    fontFamily: 'Outfit-SemiBold',
  },

  inputWrapper: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#fff',

    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E5E7EB',

    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    height: 52,

    marginLeft: 9,

    fontSize: 14,
    color: '#111827',
    fontFamily: 'Outfit-Regular',
  },

  eyeBtn: {
    padding: 5,
  },

  /* Error */

  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#FEF2F2',

    borderWidth: 1,
    borderColor: '#FECACA',

    borderRadius: 10,

    paddingHorizontal: 12,
    paddingVertical: 10,

    marginBottom: 12,
  },

  errorText: {
    flex: 1,
    color: '#DC2626',
    fontSize: 12,
    marginLeft: 7,
    fontFamily: 'Outfit-Regular',
  },

  /* Forgot */

  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 22,
  },

  forgotText: {
    color: '#C28E00',
    fontSize: 13,
    fontFamily: 'Outfit-SemiBold',
  },

  /* Login */

  loginBtn: {
    height: 55,
    backgroundColor: PRIMARY,

    borderRadius: 13,

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  loginBtnDisabled: {
    opacity: 0.75,
  },

  loginContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  loginBtnText: {
    color: '#111827',
    fontSize: 16,
    fontFamily: 'Outfit-SemiBold',
  },

  /* Footer */

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },

  footerText: {
    color: '#777',
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
  },

  signUpText: {
    color: '#C28E00',
    fontSize: 14,
    fontFamily: 'Outfit-SemiBold',
  },
});

export default Login;