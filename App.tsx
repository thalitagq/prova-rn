import React, { useEffect, useState } from "react";
import * as Font from "expo-font";;
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import LoginForm from "./forms/LoginForm";
import SignUpForm from "./forms/SignUpForm";
import ResetPasswordForm from "./forms/ResetPassword";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Provider } from "react-redux";
import store from './store/index'
import { useSelector } from 'react-redux'
import { RootState } from "./store/index";

export type InitialStackParamList = {
  Login: undefined;
  Signup: undefined;
  Reset: undefined;
};

const InitialStack = createStackNavigator<InitialStackParamList>();
const InitialStackScreen = () => (
  <InitialStack.Navigator headerMode="none" initialRouteName="Login">
    <InitialStack.Screen name="Login" component={LoginForm} />
    <InitialStack.Screen name="Signup" component={SignUpForm} />
    <InitialStack.Screen name="Reset" component={ResetPasswordForm} />
  </InitialStack.Navigator>
);

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

const RootStack = createStackNavigator();
const RootStackScreen = (props: {user_id:  number | Promise<number | null> | null}) => {
  console.log('user_id login', props.user_id);
  
  return (<RootStack.Navigator headerMode="none">
    {!props.user_id ? (
      <RootStack.Screen
        name="InitialPage"
        component={InitialStackScreen}
        options={{ animationEnabled: false }}
      />
    ) : (
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{ animationEnabled: false }}
      />
    )}
  </RootStack.Navigator>)
};

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { user_id } = useSelector((state: RootState) => state.auth)
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
          <RootStackScreen user_id={user_id}/>
        </NavigationContainer>
      )}
    </>
  )
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: "100%",
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
});