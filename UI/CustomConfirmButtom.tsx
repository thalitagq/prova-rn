import React from 'react'
import { GestureResponderEvent, TouchableOpacity, StyleSheet, StyleProp, TextStyle } from 'react-native'
import styled from 'styled-components/native';
import { AntDesign } from "@expo/vector-icons"; 

export const ConfirmButton = styled.Text`
  color: #b5c401;
  font-family: Helvetica;
  font-size: 30px;
  font-style: italic;
  font-weight: bold;
`;

type CustomCofirmButtonProps = {
  title: string;
  onPress: () => void;
};

const CustomConfirmButtom: React.FC<CustomCofirmButtonProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <ConfirmButton>{props.title}</ConfirmButton>
      <AntDesign name="arrowright" size={30} color="#B5C401" style={{marginBottom: -10}}/>
    </TouchableOpacity>
  );
};

export default CustomConfirmButtom

const styles = StyleSheet.create({
  button:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    marginVertical: 20,
  }
})
