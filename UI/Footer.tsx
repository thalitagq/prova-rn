import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return <Text style={styles.footer}>Copyright 2020 Luby Software</Text>;
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    color: "#707070",
    fontFamily: "Helvetica Light",
    marginVertical: 20,
    fontSize: 15,
  },
});
