import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSession } from '../lib/auth-client';

export default function RootLayout() {
  const { data: session, isPending } = useSession();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Wait until the Better Auth client has finished checking secure storage
    if (isPending) return;

    // Check if the user is currently on the auth screen
    const inAuthScreen = segments[0] === 'sign-in' || segments[0] === 'sign-up';

    if (!session && !inAuthScreen) {
      // 1. User is not logged in, but trying to access the app
      // Replace the current route with the sign-in screen so they can't swipe back
      router.replace('/sign-in');
    } else if (session && inAuthScreen) {
      // 2. User is logged in, but sitting on the auth screen
      // Send them to the main tabs interface
      router.replace('/(tabs)');
    }
  }, [session, isPending, segments]);

  // Show a loading spinner while checking authentication state on boot
  if (isPending) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If loading is done, render the current screen (Login or Tabs)
  return <Slot />;
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});