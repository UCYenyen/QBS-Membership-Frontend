import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { signUp } from '@/lib/auth-client';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        setError(result.error.message || 'Failed to create account');
      } else {
        // Reset form and navigate to home
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        Alert.alert('Success', 'Account created successfully! You are now signed in.');
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 }}>
          {/* Header */}
          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: colors.text,
                marginBottom: 8,
              }}>
              Join QBS
            </Text>
            <Text style={{ fontSize: 16, color: colors.icon }}>
              Create your membership account
            </Text>
          </View>

          {/* Error Message */}
          {error ? (
            <View
              style={{
                backgroundColor: '#fee',
                borderColor: '#fcc',
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                marginBottom: 20,
              }}>
              <Text style={{ color: '#c33', fontSize: 14 }}>{error}</Text>
            </View>
          ) : null}

          {/* Name Input */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 }}>
              Full Name
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.icon,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 16,
                color: colors.text,
                backgroundColor: colorScheme === 'dark' ? '#222' : '#f9f9f9',
              }}
              placeholder="John Doe"
              placeholderTextColor={colors.icon}
              value={name}
              onChangeText={setName}
              editable={!loading}
              autoCapitalize="words"
            />
          </View>

          {/* Email Input */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 }}>
              Email
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.icon,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 16,
                color: colors.text,
                backgroundColor: colorScheme === 'dark' ? '#222' : '#f9f9f9',
              }}
              placeholder="you@example.com"
              placeholderTextColor={colors.icon}
              value={email}
              onChangeText={setEmail}
              editable={!loading}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          {/* Password Input */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 }}>
              Password
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.icon,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 16,
                color: colors.text,
                backgroundColor: colorScheme === 'dark' ? '#222' : '#f9f9f9',
              }}
              placeholder="At least 8 characters"
              placeholderTextColor={colors.icon}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
              autoCapitalize="none"
            />
          </View>

          {/* Confirm Password Input */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 }}>
              Confirm Password
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.icon,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 16,
                color: colors.text,
                backgroundColor: colorScheme === 'dark' ? '#222' : '#f9f9f9',
              }}
              placeholder="Confirm your password"
              placeholderTextColor={colors.icon}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              editable={!loading}
              autoCapitalize="none"
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={loading}
            style={{
              backgroundColor: colors.tint,
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: 'center',
              marginBottom: 16,
              opacity: loading ? 0.6 : 1,
            }}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#fff',
                }}>
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          {/* Sign In Link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 14, color: colors.icon }}>Already have an account? </Text>
            <Link href="/sign-in" asChild>
              <TouchableOpacity>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.tint }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
