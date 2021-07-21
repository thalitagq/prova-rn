import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { Platform } from 'react-native'
import Layout from '../UI/Layout';
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons"; 
import styled, { css } from "styled-components/native";
import Home from '../screens/Home';
import Bet from '../screens/Bet';
import Account from '../screens/Account';

const BetTabButtonWrapper = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background-color: #b5c300;
  bottom: 40px;
  justify-content: center;
  align-items: center;
  border: 3px solid #fff;
  ${Platform.select({
    ios: css`shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8`,
    android: css`
      elevation: 3;
    `,
  })};
`;

export type TapParamList = {
  Home: undefined;
  Bet: undefined;
  Account: undefined;
};

type TabProps = BottomTabScreenProps<TapParamList, "Home">;

const Tab = createBottomTabNavigator<TapParamList>();
const InnerTabs = ({ navigation }: TabProps) => {
  return (
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
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              size={24}
              color={focused ? "#B5C401" : "#e5e5e5"}
            />
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
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name="user-o"
              size={24}
              color={focused ? "#B5C401" : "#e5e5e5"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default InnerTabs
