import React, { ReactComponentElement, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Input } from '../utils/styles'

export default function LoginForm() {


  const inputRef = useRef(null);

  return (
    <View>
      <Card>
        <Input
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="blue"
          style={styles.onFocusInput}
        >
          Email
        </Input>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  onFocusInput: {
    borderColor: '#b5c401',
    borderBottomWidth: 2,
  },
});
