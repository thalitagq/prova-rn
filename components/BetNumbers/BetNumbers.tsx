import React from "react";
import styled from "styled-components/native";
import BetNumber from "./BetNumber";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-bottom: 45px;
`;

const BetNumbers: React.FC<{ range: number, color: string }> = (props) => {
  const numbers = [];

  const onClickNumberHandler = () => {};

  for (let index = 1; index <= props.range; index++) {
    numbers.push(<BetNumber number={index.toString()} onPress={onClickNumberHandler} key={index} color={props.color}/>);
  }

  return <Container>{numbers}</Container>;
};

export default BetNumbers;
