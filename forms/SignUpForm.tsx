import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { Card, FormTitle } from "../utils/styles";
import CustomInput from "../UI/CustomInput";
import CustomConfirmButtom from "../UI/CustomConfirmButtom";
import CustomSecondaryButton from "../UI/CustomSecondaryButton";
import InitialPage from "../screens/InitialPage";
import { Props } from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { signupUser } from "../store/api";

export default function SignUpForm({ navigation }: Props) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  const signupHandler = async () => {
    const regex = /^[\w+.]+@\w+\.[\w^_]{2,}(?:\.\w{1,2})?$/;

    if (
      regex.test(emailInput) &&
      passwordInput.length > 3 &&
      confirmPasswordInput.length > 3 &&
      nameInput.length > 0
    ) {
      await dispatch(
        signupUser({
          username: nameInput,
          email: passwordInput,
          password: passwordInput,
          password_confirm: confirmPasswordInput,
        })
      );
      if (!error) {
        alert("Cadastro feito com sucesso");
        navigation.push("Login");
      }
      return alert(error);
    }
    alert("Dados inválidos");
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
        <CustomInput
          id="confirmPassword"
          key="confirmPassword"
          placeholder="Confirm password"
          value={confirmPasswordInput}
          onChangeText={setConfirmPasswordInput}
          secureTextEntry={true}
        />
        <CustomConfirmButtom title="Register" onPress={signupHandler} />
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
