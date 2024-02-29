import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import Button from "../../components/Button"; // Ensure this component can handle 'loading' or 'disabled' props
import Colors from "../../constants/Colors";
import { Link } from "expo-router"; // Assuming expo-router is set up correctly
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { refreshSession } = useAuth();

  async function signInWithEmail() {
    if (loading) return; // Prevent multiple submits

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (!error) {
        await refreshSession(); // Refresh the session after successful sign-in
      } else {
        Alert.alert("Sign In Error", error.message);
      }
      // Navigate to home or next screen after successful login
    } catch (error) {
      Alert.alert("Sign In Error", error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
        style={styles.input}
      />

      {loading ? (
        <ActivityIndicator size="large" color={Colors.light.tint} />
      ) : (
        <Button text="Sign in" onPress={signInWithEmail} disabled={loading} />
      )}

      <Link href="/sign-up" style={styles.link}>
        Don't have an account? Create one
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#F9FAFB", // Light background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.tint,
    alignSelf: "center",
    marginBottom: 30,
  },
  label: {
    color: Colors.dark.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC", // Lighter gray border
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "white",
  },
  link: {
    marginTop: 15,
    color: Colors.light.tint,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default SignInScreen;
