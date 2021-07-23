import React from "react";
import Game from "../Game";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { GameProps } from "../Game";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DeleteButton = styled.TouchableOpacity`
  background: transparent;
  border: 0;
  font-size: 25px;
  color: #888888;
  margin-right: 15px;
`;

const CartItem: React.FC<GameProps> = (props: GameProps) => {
  const dispatch = useDispatch();

  const deleteGameHandler = () => {
    dispatch(cartActions.removeFromCart({ id: props.id, price: props.price }));
  };

  return (
    <Container>
      <DeleteButton onPress={deleteGameHandler}>
        <Ionicons
          name="trash-outline"
          size={24}
          color="#888888"
        />
      </DeleteButton>
      <Game
        color={props.color}
        date={props.date}
        numbers={props.numbers}
        price={props.price}
        type={props.type}
        id={props.id}
        key={props.id}
      />
    </Container>
  );
};

export default CartItem;
