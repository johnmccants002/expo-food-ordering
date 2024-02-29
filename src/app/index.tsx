import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@providers/AuthProvider";

const index = () => {
  const { refreshSession, session } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("SESSION USE EFFECT", session);
    if (!session) {
      <Redirect href={"/(auth)/sign-up"} />;
    } else {
      console.log("IN ELSE STATEMENT");
    }
  }, [session]);

  useEffect(() => {
    waitForSession();
  }, []);

  const waitForSession = async () => {
    await refreshSession();
    setLoading(false);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      {loading ? (
        <Text>Loading</Text>
      ) : session ? (
        <Redirect href={"/(user)/menu"} />
      ) : (
        <Redirect href={"/(auth)/sign-up"} />
      )}
    </View>
  );
};

export default index;
