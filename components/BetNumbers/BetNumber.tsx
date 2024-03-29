import React, { useEffect, useState } from "react";
import { gamesActions } from "../../store/games";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import styled from "styled-components/native";

const Number = styled.TouchableOpacity`
  background-color: #adc0c4;
  border: 0;
  border-radius: 50px;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const NumberActive = styled(Number)<{ color: string }>`
  background-color: ${(props) => props.color || "#000"};
`;

const NumberText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

type BetNumberProps = {
  number: string;
  color: string;
};

const BetNumber: React.FC<BetNumberProps> = (props: BetNumberProps) => {
  const [isActive, setIsActive] = useState(false);
  const { selectedNumbers, selectedGame, isGameCompleted } = useSelector(
    (state: RootState) => state.games
  );
  const dispatch = useDispatch();

  const onClickNumberHandler = () => {
    
    if (selectedNumbers.length === selectedGame!["max-number"] &&
        !selectedNumbers.includes(props.number)) {
      return;
    }

    if (isActive) {
      dispatch(gamesActions.removeNumber(props.number));
    } else {
      dispatch(gamesActions.addNumber(props.number));
    }
    setIsActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (
      (isGameCompleted && !selectedNumbers.includes(props.number)) ||
      selectedNumbers.length === 0
    ) {
      setIsActive(false);
    }

    if (selectedNumbers.includes(props.number)) {
      setIsActive(true);
    }
  }, [selectedNumbers, props.number, isGameCompleted]);

  if (isActive) {    
    return (
      <NumberActive color={props.color} onPress={onClickNumberHandler}>
        <NumberText>{props.number}</NumberText>
      </NumberActive>
    );
  }
  return (
    <Number onPress={onClickNumberHandler}>
      <NumberText>{props.number}</NumberText>
    </Number>
  );
};

export default BetNumber;
