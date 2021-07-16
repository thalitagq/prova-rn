import React from 'react'
import {
  GestureResponderEvent,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styled from 'styled-components/native';
import { AntDesign } from "@expo/vector-icons"; 

export const SecondaryButton = styled.Text`
  color: #707070;
  font-family: Helvetica;
  font-size: 30px;
  font-style: italic;
  font-weight: bold;
`;

type CustomSecondaryButtonProps = {
  title: string;
  onPress: () => void;
  leftArrow?: boolean
};

const CustomSecondaryButton: React.FC<CustomSecondaryButtonProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      {props.leftArrow && (
        <AntDesign
          name="arrowleft"
          size={30}
          color="#707070"
          style={{ marginBottom: -10 }}
        />
      )}
      <SecondaryButton >{props.title}</SecondaryButton>
      {!props.leftArrow && (
      <AntDesign
        name="arrowright"
        size={30}
        color="#707070"
        style={{ marginBottom: -10 }}
      />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
});


export default CustomSecondaryButton
