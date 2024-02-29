import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";

const index = () => {
  const { isLoading, session, profile } = useAuth();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  if (profile?.group === "ADMIN") {
    return <Redirect href="/(admin)" />;
  } else {
    return <Redirect href="/(user)" />;
  }
};

export default index;
