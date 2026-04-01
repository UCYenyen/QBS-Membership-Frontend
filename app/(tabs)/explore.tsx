import { View, Text, Button } from 'react-native';
import { signOut, useSession } from '../../lib/auth-client'; // Adjust path if needed

export default function ExploreScreen() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
    // No router.replace() needed here!
    // The _layout.tsx will detect the session became null and automatically redirect.
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello, {session?.user?.name}</Text>
      <Text>Your Points: Fetching...</Text>
      
      <Button title="Log Out" color="red" onPress={handleLogout} />
    </View>
  );
}