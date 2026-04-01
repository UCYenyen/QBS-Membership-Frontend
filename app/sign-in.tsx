import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { signIn, signUp } from '../lib/auth-client';

export default function LoginScreen() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only used for registration

  const handleSubmit = async () => {
    if (isRegistering) {
      // Handle Registration
      const { error } = await signUp.email({
        email,
        password,
        name,
      });
      if (error) Alert.alert('Registration Failed', error.message);
      else Alert.alert('Success', 'Registered successfully! You can now log in.');
    } else {
      // Handle Login
      const { error } = await signIn.email({
        email,
        password,
      });
      if (error) Alert.alert('Login Failed', error.message);
      // Note: We don't manually navigate here. The Root Layout handles it!
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? 'Create Account' : 'Welcome Back'}</Text>

      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title={isRegistering ? 'Sign Up' : 'Sign In'} onPress={handleSubmit} />

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)} style={styles.switchButton}>
        <Text style={styles.switchText}>
          {isRegistering ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 15, borderRadius: 8 },
  switchButton: { marginTop: 20, alignItems: 'center' },
  switchText: { color: '#007AFF', fontSize: 16 },
});