import { BottomTabBar } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <Text style={styles.footer}>Copyright 2020 Luby Software</Text>
  )
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    color: "#707070",
    fontFamily: "Helvetica Light",
    // height: 100,
    textAlign: "center",
    fontSize: 15,
    // marginTop: 'auto',
    // position: "absolute",
    // bottom: 10,
    marginVertical: 10
  },
  container: {
    // height: 50,
    // alignItems: "center",
    // textAlign: "center",
    // marginTop: 10,
    // marginBottom: 0,
  },
});
