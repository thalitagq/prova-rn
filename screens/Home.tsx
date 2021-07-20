import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { RootState } from "../store";
import { getBets, getGames, logoutUser } from "../store/api";
import { authActions, getData } from "../store/auth";

const Home = () => {
  const { games, selectedGame } = useSelector(
    (state: RootState) => state.games
  );
    const {user_id} = useSelector(
      (state: RootState) => state.auth
    );

  // const { gamesSaved, isBetsStoredEmpty } = useSelector(
  //   (state: RootState) => state.cart
  // );
  // const [filteredGames, setFilteredGames] = useState<GameProps[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getGamesHandler = async () => {
      await dispatch(getGames());
      console.log(games);
    };

    // const getBetsHandler = async () => {
    //   await dispatch(getBets());
    // };

    if (games.length === 0) {
      getGamesHandler();
    }
    // if (gamesSaved.length === 0 && isBetsStoredEmpty) {
    //   getBetsHandler();
    // }
  // }, [dispatch, games.length, gamesSaved.length, isBetsStoredEmpty]);
  }, [dispatch]);

  // useEffect(() => {
  //   setFilteredGames(
  //     gamesSaved.filter((game) => game.type === selectedGame!.type)
  //   );
  // }, [selectedGame, gamesSaved]);
  const logoutHandler = async() =>{
    await dispatch(logoutUser())
    dispatch(authActions.resetState())
    console.log('async user?', await getData('user_id'));
    console.log('user?', user_id)
  }
  return (
    <View>
      <Button onPress={logoutHandler} title="logout">
        Games
      </Button>
      <Text>{user_id}</Text>
    </View>
    // <Container>
    //   <div>
    //     <Title>Recent Games</Title>
    //     {filteredGames.length === 0 && (
    //       <Text>
    //         Não há apostas feitas em <strong>{selectedGame?.type}</strong>
    //       </Text>
    //     )}
    //     {filteredGames.map((game) => (
    //       <div style={{ marginBottom: "10px" }}>
    //         <GameTag
    //           key={game.id}
    //           date={game.date}
    //           price={game.price}
    //           color={game.color}
    //           id={game.id}
    //           numbers={game.numbers}
    //           type={game.type}
    //         />
    //       </div>
    //     ))}
    //   </div>
    //   <Nav>
    //     <Filters>
    //       <p>Filters</p>
    //       {games.map((game) => (
    //         <GameButton text={game.type} color={game.color} key={game.type} />
    //       ))}
    //     </Filters>
    //   </Nav>
    // </Container>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: "100%",
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
});
