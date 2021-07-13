import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginForm from "./screens/LoginForm";
import * as Font from "expo-font";
import styled from "styled-components/native";

const Title = styled.Text`
  font-weight: bold;
  font-family: Helvetica;
  font-style: italic;
  font-size: 44px;
  color: #707070;
`;

const BorderBottomTitle = styled.View`
  height: 6px;
  width: 110px;
  background-color: #b5c401;
  border-radius: 10px;
  margin-bottom: 30px;
`;

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  async function loadFonts() {
    await Font.loadAsync({
      Helvetica: require("./assets/fonts/Helvetica.ttf"),
    });    
    setIsLoaded(true)
  }

  useEffect(() => {
    loadFonts()
  }, [])
   
  return (
    <View style={styles.container}>
      {isLoaded && (
        <>
          <Title>TGL</Title>
          <BorderBottomTitle />
          <LoginForm />
          <StatusBar style="auto" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
