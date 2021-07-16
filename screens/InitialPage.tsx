import React from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import Footer from "../UI/Footer";
import {width} from "../utils/styles"

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

const InitialPage: React.FC = ({children}) => {
  return (
    <View style={styles.container}>
        <Title>TGL</Title>
        <BorderBottomTitle />
      <ScrollView contentContainerStyle={styles.scroll}>
        {children}
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: "100%",
    width: width,

    backgroundColor: "#F7F7F7",
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 20,
  },
  scroll: {
    // flex: 1,

    width: width,
    alignItems: "center",
    // justifyContent: "center",
  },
});

export default InitialPage;
