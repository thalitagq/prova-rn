import React from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import Footer from "../UI/Footer";
import LoginForm from "./LoginForm";

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

const InitialPage = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Title>TGL</Title>
        <BorderBottomTitle />
        <LoginForm />
        <Footer />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
});

export default InitialPage;
