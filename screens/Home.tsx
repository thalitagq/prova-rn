import React from 'react'
import { View, Text, StyleSheet } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>roooi</Text>
    </View>
  )
}

export default Home
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