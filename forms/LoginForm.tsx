import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { Card, FormTitle } from "../utils/styles";
import CustomInput from "../UI/CustomInput";
import CustomConfirmButtom from "../UI/CustomConfirmButtom";
import CustomSecondaryButton from "../UI/CustomSecondaryButton";
import { StackScreenProps } from "@react-navigation/stack";
import { InitialStackParamList } from "../App";
import InitialPage from "../screens/InitialPage";

export type Props = StackScreenProps<InitialStackParamList, "Login">;

export default function LoginForm({ navigation }: Props) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const signUpHandler = () => {
    console.log("ok");
  };

  return (
    <InitialPage>
      <FormTitle>Authentication</FormTitle>
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
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#f5f5f5"
          onPress={() => navigation.push("Reset")}
          style={{
            marginTop: 20,
            maxWidth: 180,
            marginLeft: "auto",
            marginRight: 10,
          }}
        >
          <Text style={styles.link}>I forgot my password</Text>
        </TouchableHighlight>
        <CustomConfirmButtom title="Log In" onPress={() => {}} />
      </Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10
        }}
      >
        <CustomSecondaryButton
          title="Sign Up"
          onPress={() => navigation.push("Signup")}
        />
      </View>
    </InitialPage>
  );
}

const styles = StyleSheet.create({
  link:{
    color: "#C1C1C1"
  }
});
