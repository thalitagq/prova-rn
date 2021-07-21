import React, { useEffect, useState } from "react";
import { View, Text, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components/native";
import { RootState } from "../store";
import { getBets, getGames } from "../store/api";
import Layout from "../UI/Layout";
import GameTag, { GameProps } from "../components/Game";
import GameButton from "../components/GameButton";
import { ScrollView } from "react-native";
import Filters from "../UI/Filters";
import { Title } from '../utils/styles'

const Home = () => {
  const { games, selectedGame } = useSelector(
    (state: RootState) => state.games
  );
  const { user_id } = useSelector((state: RootState) => state.auth);

  const { gamesSaved, isBetsStoredEmpty } = useSelector(
    (state: RootState) => state.cart
  );
  const [filteredGames, setFilteredGames] = useState<GameProps[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getGamesHandler = async () => {
      await dispatch(getGames());
    };

    const getBetsHandler = async () => {
      await dispatch(getBets());
    };

    if (games.length === 0) {
      getGamesHandler();
    }

    if (gamesSaved.length === 0 && isBetsStoredEmpty) {
      console.log("getting bets again");
      getBetsHandler();
    }
  }, [dispatch, games.length, gamesSaved.length, isBetsStoredEmpty]);

  useEffect(() => {
    setFilteredGames(
      gamesSaved.filter((game) => game.type === selectedGame!.type)
    );
  }, [selectedGame, gamesSaved]);
  console.log(filteredGames);

  return (
    <Layout>
      <Title>RECENT GAMES</Title>
      <Filters games={games} title="Filters" />
      {filteredGames.length === 0 && (
        <Text>Não há apostas feitas em {selectedGame?.type}</Text>
      )}
      <ScrollView>
        {filteredGames.map((game) => (
          <View style={{ marginBottom: 10 }} key={game.id}>
            <GameTag
              date={game.date}
              price={game.price}
              color={game.color}
              id={game.id}
              numbers={game.numbers}
              type={game.type}
            />
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
};

export default Home;
