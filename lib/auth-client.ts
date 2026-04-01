// lib/auth-client.ts
import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

// Use your machine's IP address instead of localhost for mobile/simulator
// On macOS, find it with: ipconfig getifaddr en0
// Then replace YOUR_IP with the actual IP (e.g., 192.168.1.100)
const BACKEND_URL = "http://10.0.189.45:3000";

export const authClient = createAuthClient({
  baseURL: BACKEND_URL,
  plugins: [
    expoClient({
      scheme: "qbsmembershipfrontend",
      storagePrefix: "qbs_membership",
      storage: SecureStore,
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
