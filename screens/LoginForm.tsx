import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { Card, FormTitle } from "../utils/styles";
import CustomInput from "../UI/CustomInput";
import CustomConfirmButtom from "../UI/CustomConfirmButtom";
import CustomSecondaryButton from "../UI/CustomSecondaryButton";

export default function LoginForm() {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState("")

  const signUpHandler = () => {
    console.log('ok');
  }

  return (
    <View style={styles.container}>
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
          onPress={() => console.log("click")}
          style={{
            marginVertical: 20,
            maxWidth: 180,
            marginLeft: "auto",
            marginRight: 10,
          }}
        >
          <Text style={styles.link}>I forgot my password</Text>
        </TouchableHighlight>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <CustomConfirmButtom
            title="Log In"
            onPress={() => {}}
          />
        </View>
      </Card>
      <View style={{ flexDirection: "row", justifyContent: "center",marginVertical: 20 }}>
        <CustomSecondaryButton title="Sign Up" onPress={signUpHandler}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2
  },
  onFocusInput: {
    borderColor: "#b5c401",
    borderBottomWidth: 2,
  },
  notFocusInput: {},
  link:{
    color: "#C1C1C1"
  }
});
