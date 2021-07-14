import React, { ReactComponentElement, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, Input } from "../utils/styles";
import CustomInput from "../UI/CustomInput";

export default function LoginForm() {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState("");

  return (
    <View>
      <Card>
        <CustomInput
          id="email"
          key="email"
          textContentType="emailAddress"
          placeholder="Email"
          keyboardType="email-address"
          value={emailInput}
          onChangeText={setEmailInput}
        />
        <CustomInput
          id="password"
          key="password"
          placeholder="Password"
          value={passwordInput}
          onChangeText={setPasswordInput}
          secureTextEntry={true}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  onFocusInput: {
    borderColor: "#b5c401",
    borderBottomWidth: 2,
  },
  notFocusInput: {},
});
