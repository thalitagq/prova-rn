import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components/native";
import { RootState } from "../store";
import { getBets, getGames, logoutUser } from "../store/api";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Bet from "./Bet";
import Account from "./Account";
import Layout from "../UI/Layout";
import GameTag, { GameProps } from "../components/Game";
import { ScrollView } from "react-native-gesture-handler";

const BetTabButtonWrapper = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background-color: #b5c300;
  /* margin-bottom:40px; */
  bottom: 40px;
  justify-content: center;
  align-items: center;
  border: 3px solid #fff;
  /* ${Platform.select({
    ios: css`shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8`,
    android: css`
      elevation: 3;
    `,
  })}; */
`;

const Title = styled.Text`
  color: #707070;
  font-size: 22px;
  font-family: Helvetica;
  font-style: italic;
  font-weight: bold;
`

export type TapParamList = {
  Home: undefined;
  Bet: undefined;
  Account: undefined;
};

type TabProps = BottomTabScreenProps<TapParamList, "Home">;

const Tab = createBottomTabNavigator<TapParamList>();
const DrawerScreen = ({ navigation }: TabProps) => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      adaptive: true,
      tabStyle: { justifyContent: "center", height: "100%" },
      activeTintColor: "#707070",
      inactiveTintColor: "#e5e5e5",
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: () => (
          <Ionicons name="home-outline" size={24} color="#B5C401" />
        ),
      }}
    />
    <Tab.Screen
      name="Bet"
      component={Bet}
      options={{
        tabBarLabel: "",
        tabBarButton: (props) => (
          <BetTabButtonWrapper onPress={() => navigation.navigate("Bet")}>
            <AntDesign name="pluscircleo" size={40} color="#fff" />
          </BetTabButtonWrapper>
        ),
      }}
    />
    <Tab.Screen name="Account" component={Account} />
  </Tab.Navigator>
);

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
      console.log('getting bets again');
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
      {filteredGames.length === 0 && (
        <Text>Não há apostas feitas em {selectedGame?.type}</Text>
      )}
      <ScrollView>
      {filteredGames.map((game) => (
        <View style={{ marginBottom: 10 }}>
          <GameTag
            key={game.id}
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

export default DrawerScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: "100%",
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 20,
  },
});
