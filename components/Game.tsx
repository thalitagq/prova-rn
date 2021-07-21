import React from "react";
import styled from "styled-components/native";
import { Text, View } from "react-native";
const Numbers = styled.Text<{ fontSize?: string }>`
  color: #868686;
  font-size: ${(props) => props.fontSize || "14px"};
  font-weight: bold;
  font-style: italic;
  flex: 1;
  flex-shrink: 1;
`;

const Container = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const ContainerBorder = styled.View<{ color: string }>`
  background-color: ${(props) => props.color || "#000"};
  width: 6px;
  border-radius: 10px;
  height: 100%;
  margin-right: 10px;
`;

const Info = styled.Text<{ fontSize?: string }>`
  color: #868686;
  font-size: ${(props) => props.fontSize || "12px"};
`;

const Wraper = styled.View`
  flex-direction: column;
  flex: 1;
`;

const GameName = styled.Text<{ color: string; fontSize?: string }>`
  color: ${(props) => props.color || "#000"};
  font-size: ${(props) => props.fontSize || "16px"};
  font-style: italic;
  font-weight: bold;
`;

export type GameProps = {
  color: string;
  fontSize?: string;
  numbers: string[];
  type: string;
  date: string;
  price: number;
  id: number;
};

export const transformPrice = (price: number) => {
  return price.toFixed(2).toString().replace(".", ",");
};

const Game: React.FC<GameProps> = (props: GameProps) => {
  return (
    <Container>
      <ContainerBorder color={props.color} />
      <Wraper>
          <Numbers fontSize={props.fontSize || undefined}>
            {props.numbers.join(", ")}
          </Numbers>
        <Info fontSize={props.fontSize || undefined}>
          {props.date} - {`(R$${transformPrice(props.price)})`}
        </Info>
        <GameName color={props.color} fontSize={props.fontSize || undefined}>
          {props.type}
        </GameName>
      </Wraper>
    </Container>
  );
};

export default Game;
