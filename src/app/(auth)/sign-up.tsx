import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

type Props = {};

const SignUp = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  return <></>;
};

export default SignUp;
