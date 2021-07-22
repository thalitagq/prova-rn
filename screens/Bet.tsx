import React, { useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import BetNumbers from "../components/BetNumbers/BetNumbers";
import { RootState } from "../store";
import { cartActions } from "../store/cart";
import { gamesActions } from "../store/games";
import Filters from "../UI/Filters";
import Layout from "../UI/Layout";
import { Title } from "../utils/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Paragraph = styled.Text`
  color: #868686;
  font-size: 14px;
  line-height: 22px;
`;

const Actions = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const SubTitle = styled.Text`
  color: #868686;
  font-size: 17px;
  font-family: Helvetica;
  font-style: italic;
  font-weight: bold;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #fff;
  border: 1px solid #b5c401;
  border-radius: 5px;
  padding: 5px;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

const ActionButtonText = styled.Text`
  color: #b5c401;
  font-size: 13px;
  font-family: Helvetica;
  font-weight: bold;
`;

const AddToCartButton = styled(ActionButton)`
  background-color: #b5c401;
  flex-direction: row;
`;

const AddtoCartButtonText = styled(ActionButtonText)`
  color: #fff;
`;

const Bet = () => {
  const { games, selectedGame, selectedNumbers } = useSelector(
    (state: RootState) => state.games
  );
  const dispatch = useDispatch();

  const clearGameHandler = () => {
    dispatch(gamesActions.clearGame());
  };

  const completeGameHandler = () => {
    // if (selectedGame["max-number"] - selectedNumbers.length === 0) {
    //   dispatch(gamesActions.clearGame());
    // }
    dispatch(gamesActions.completeGame());
  };

  const addToCartHandler = () => {
    if (selectedNumbers.length < selectedGame!["max-number"]) {
      return alert("Jogo incompleto");
    }
    dispatch(
      cartActions.addToCart({
        id: 0,
        type: selectedGame!.type,
        date: new Date().toLocaleDateString(),
        numbers: selectedNumbers,
        price: selectedGame!.price,
        color: selectedGame!.color,
      })
    );
    dispatch(gamesActions.clearGame());
  };
  return (
    <Layout>
      <Title>NEW BET FOR {selectedGame!.type.toUpperCase()}</Title>
      <Filters games={games} title="Choose a game" />
      <ScrollView>
        <SubTitle>Fill your bet</SubTitle>
        <Paragraph style={{ marginBottom: 30 }}>
          {selectedGame?.description}
        </Paragraph>
        <Actions>
          <ActionButton onPress={completeGameHandler}>
            <ActionButtonText>Complete game</ActionButtonText>
          </ActionButton>
          <ActionButton onPress={clearGameHandler}>
            <ActionButtonText>Clear game</ActionButtonText>
          </ActionButton>
          <AddToCartButton onPress={addToCartHandler}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={24}
              color="#fff"
            />
            <AddtoCartButtonText>Add to cart</AddtoCartButtonText>
          </AddToCartButton>
        </Actions>
        <BetNumbers range={selectedGame!.range} color={selectedGame!.color} />
      </ScrollView>
    </Layout>
  );
};



export default Bet;
