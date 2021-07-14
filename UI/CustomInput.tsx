import React, { Dispatch, SetStateAction, useState } from "react";
import { KeyboardTypeOptions, NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, Text, View } from "react-native";
import styled from "styled-components/native";

export const Input = styled.TextInput`
  border: 0;
  border-bottom-width: 1px;
  border-color: #ddd;
  height: 70px;
  padding-left: 10px;
  color: #9d9d9d;
`;

type InputProps = {
  id: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  textContentType?: string | undefined;
  onChangeText: Dispatch<SetStateAction<string>>;
  value: string;
  secureTextEntry?: boolean
};

const CustomInput: React.FC<InputProps> = (props) => {
  const [onFocus, setOnFocus] = useState(false);
  const [value, setValue] = useState('')
  const customStyles = onFocus ? styles.onFocusInput : styles.notOnFocus;
  console.log(props);
  return (
    <Input
      placeholder={props.placeholder}
      style={customStyles}
      value={props.value}
      onChangeText={props.onChangeText}
      onFocus={() => setOnFocus(true)}
      onBlur={() => setOnFocus(false)}
      secureTextEntry={props.secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  onFocusInput: {
    borderColor: "#b5c401",
    borderBottomWidth: 2,
  },
  notOnFocus: {},
});

export default CustomInput;
