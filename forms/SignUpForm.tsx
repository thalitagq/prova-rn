import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { Card, FormTitle } from "../utils/styles";
import CustomInput from "../UI/CustomInput";
import CustomConfirmButtom from "../UI/CustomConfirmButtom";
import CustomSecondaryButton from "../UI/CustomSecondaryButton";
import InitialPage from "../screens/InitialPage";
import { Props } from "./LoginForm";

export default function SignUpForm({navigation} : Props) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const signUpHandler = () => {
    console.log("ok");
  };

  return (
    <InitialPage>
      <FormTitle>Registration</FormTitle>
      <Card>
        <CustomInput
          id="name"
          key="name"
          placeholder="Name"
          keyboardType="default"
          value={nameInput}
          onChangeText={setNameInput}
        />
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
        <CustomConfirmButtom title="Register" onPress={() => {}} />
      </Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <CustomSecondaryButton
          title="Back"
          leftArrow={true}
          onPress={() => navigation.goBack()}
        />
      </View>
    </InitialPage>
  );
}

const styles = StyleSheet.create({
  onFocusInput: {
    borderColor: "#b5c401",
    borderBottomWidth: 2,
  },
  notFocusInput: {},
  link: {
    color: "#C1C1C1",
  },
});
