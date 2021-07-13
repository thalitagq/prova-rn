import styled, { css } from "styled-components/native";
import { Platform, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export const Card = styled.View`
  background-color: #fff;
  min-height: 290px;
  width: ${width * 0.8 + "px"};
  box-shadow: 0px 3px 25px #000;
  border-radius: 15px;
  ${Platform.select({
    ios: css`
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
    `,
    android: css`
      elevation: 2;
    `,
  })};
`;

export const Input = styled.TextInput`
  border: 0;
  border-bottom-width: 1px;
  border-color: #ddd;
  height: 70px;
  padding-left: 10px;
  color: #9d9d9d;
`;

export const InputFocus = styled(Input)`
  border-color: #b5c401;
  border-bottom-width: 2px;
`;
