import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import LoginForm from "./screens/LoginForm";
import * as Font from "expo-font";
import styled from "styled-components/native";
import Footer from "./UI/Footer";
import { createStackNavigator } from "@react-navigation/stack";
import InitialPage from "./screens/InitialPage";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";

const RootStack = createStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    {false ? (
      <RootStack.Screen
        name="InitialPage"
        component={InitialPage}
        options={{ animationEnabled: false }}
      />
    ) : (
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{ animationEnabled: false }}
      />
    )}
  </RootStack.Navigator>
);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  async function loadFonts() {
    await Font.loadAsync({
      Helvetica: require("./assets/fonts/Helvetica.ttf"),
      "Helvetica Light": require("./assets/fonts/Helvetica_Light.ttf"),
    });
    setIsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <>
      {isLoaded && (
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>
      )}
    </>
  );
}
