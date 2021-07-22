import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, FormTitle } from "../utils/styles";
import CustomInput from "../UI/CustomInput";
import CustomConfirmButtom from "../UI/CustomConfirmButtom";
import CustomSecondaryButton from "../UI/CustomSecondaryButton";
import InitialPage from "../screens/InitialPage";
import { Props } from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { forgotPassword } from "../store/api";

export default function ResetPasswordForm({ navigation }: Props) {
  const [emailInput, setEmailInput] = useState("");
  const regex = /^[\w+.]+@\w+\.[\w^_]{2,}(?:\.\w{1,2})?$/;
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);
  const resetPasswordHandler = async () => {
    if (regex.test(emailInput)) {
      await dispatch(forgotPassword(emailInput));
      if (!error) {
        return navigation.push("NewPassword");
      }
      return alert(error);
    }
    alert("Email inválido");
  };
  return (
    <InitialPage>
      <FormTitle>Registration</FormTitle>
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
        <CustomConfirmButtom title="Send link" onPress={resetPasswordHandler} />
      </Card>
      <View style={styles.buttons}>
        <CustomSecondaryButton
          title="Back"
          leftArrow={true}
          onPress={() => navigation.goBack()}
        />
        <CustomSecondaryButton title="Sign Up" onPress={()=> navigation.push('Signup')} />
      </View>
    </InitialPage>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 20,
    alignItems: "center",
  },
});
