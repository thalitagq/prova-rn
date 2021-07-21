import React from 'react'
import { View, Text, StyleSheet } from "react-native";
import Navbar from './Navbar'

const Layout: React.FC = ({children}) => {
  return (
    <>
    <Navbar></Navbar>
    <View style={styles.container}>
      {children}
    </View>
   </> 
  )
}

export default Layout

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10
  }
})