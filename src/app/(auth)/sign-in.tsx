import React, { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "@/lib/supabase";

type Props = {};

const SignIn = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  return <></>;
};

export default SignIn;
