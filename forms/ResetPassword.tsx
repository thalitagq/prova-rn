import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, FormTitle } from "../utils/styles";
import CustomInput from "../UI/CustomInput";
import CustomConfirmButtom from "../UI/CustomConfirmButtom";
import CustomSecondaryButton from "../UI/CustomSecondaryButton";
import InitialPage from "../screens/InitialPage"
import { Props } from "./LoginForm";

export default function ResetPasswordForm({ navigation }: Props) {
  const [emailInput, setEmailInput] = useState("");

  const signUpHandler = () => {
    console.log("ok");
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
        <CustomConfirmButtom title="Send link" onPress={() => {}} />
      </Card>
      <View
        style={styles.buttons}
      >
        <CustomSecondaryButton
          title="Back"
          leftArrow={true}
          onPress={()=> navigation.goBack()}
        />
        <CustomSecondaryButton
          title="Sign Up"
          onPress={signUpHandler}
        />
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
