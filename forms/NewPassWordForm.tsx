import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import InitialPage from "../screens/InitialPage";
import { RootState } from "../store";
import { newPassword } from "../store/api";
import CustomConfirmButtom from "../UI/CustomConfirmButtom";
import CustomInput from "../UI/CustomInput";
import CustomSecondaryButton from "../UI/CustomSecondaryButton";
import { Card, FormTitle } from "../utils/styles";
import { Props } from "./LoginForm";

const NewPassWordForm = ({ navigation }: Props) => {
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  const saveHandler = async () => {
    if (passwordInput.length > 3 && confirmPasswordInput.length > 3) {
      await dispatch(
        newPassword({
          password: passwordInput,
          password_confirmation: confirmPasswordInput,
        })
      );
      if (!error) {
        alert("Senha alterada com sucesso");
        return navigation.push("Login");
      }
      return alert(error);
    }
    alert("Senha inválida");
  };
  return (
    <InitialPage>
      <FormTitle>New Password</FormTitle>
      <Card>
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
        <CustomConfirmButtom title="Save" onPress={saveHandler} />
      </Card>
      <View style={styles.buttons}>
        <CustomSecondaryButton
          title="Back"
          leftArrow={true}
          onPress={() => navigation.goBack()}
        />
        <CustomSecondaryButton title="Sign Up" onPress={saveHandler} />
      </View>
    </InitialPage>
  );
};

const styles = StyleSheet.create({
  buttons: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default NewPassWordForm;
