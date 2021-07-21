import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { RootState } from "../store";
import { gamesActions } from "../store/games";

const Button = styled.TouchableOpacity<{color: string}>`
  border: 2px solid;
  border-color: ${(props) => props.color || "#000"};
  height: 35px;
  border-radius: 100px;
  background: #fff;
  padding: 5px 15px;
  font-weight: 600;
  font-style: italic;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text<{ color: string }>`
  font-family: Helvetica;
  font-size: 14px;
  font-style: italic;
  font-weight: bold;
  color: ${(props) => props.color || "#000"};
`;

const ButtonActive = styled(Button)`
  background: ${(props) => props.color || "#000"};
`;

type ButtonProps = {
  color: string;
  text: string;
};

const GameButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const [isActive, setIsActive] = useState(false);

  const selectedGame = useSelector((state: RootState) => state.games.selectedGame);

  const dispatch = useDispatch();

  const onClickHandler = () => {
    setIsActive(true)
    dispatch(gamesActions.selectGame(props.text))
    dispatch(gamesActions.clearGame())
  }

  useEffect(() => {
    if (selectedGame?.type === props.text) {
      setIsActive(true);
    }
  }, [props.text, selectedGame?.type]);

  if(isActive && (selectedGame!.type === props.text)){
    return (
      <ButtonActive color={props.color}>
        <ButtonText color='#fff'>{props.text}</ButtonText>
      </ButtonActive>
    );
  }

  return (
    <Button color={props.color} onPress={onClickHandler}>
      <ButtonText color={props.color}>{props.text}</ButtonText>
    </Button>
  );
};

export default GameButton;
