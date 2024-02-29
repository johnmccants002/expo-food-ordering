import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button"; // Make sure this Button component supports 'disabled' prop
import Colors from "../../constants/Colors";
import { Link } from "expo-router"; // Assuming expo-router is correctly set up
import { supabase } from "@/lib/supabase";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    if (loading) return; // Prevent multiple submits

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      Alert.alert("Success", "Check your email to confirm your account");
    } catch (error) {
      Alert.alert("Sign Up Error", error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

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
        <Button
          text="Create account"
          onPress={signUpWithEmail}
          disabled={loading}
        />
      )}

      <Link href="/sign-in" style={styles.textButton}>
        Already have an account? Sign in
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#F9FAFB", // A light background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.tint,
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    color: Colors.dark.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 8,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginTop: 15,
  },
});

export default SignUpScreen;
