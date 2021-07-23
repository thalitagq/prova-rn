import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons"; 
import { useDispatch } from "react-redux";
import { logoutUser, saveBet } from "../store/api";
import { authActions } from "../store/auth";
import { gamesActions } from "../store/games";
import { cartActions } from "../store/cart";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Cart from "../components/Cart/Cart";


const Container = styled.View`
  height: 90px;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
`

const PageTitle = styled.Text`
  color: #707070;
  font-family: Helvetica;
  font-size: 30px;
  font-weight: bold;
`

const TitleBorder = styled.View`
  height: 6px;
  background-color: #b5c401;
  border-radius: 6px;
`;

const Navbar = () => {
  const dispatch = useDispatch()
  
  const logoutHandler = async () => {
    await dispatch(logoutUser());
    dispatch(authActions.resetState())
    dispatch(gamesActions.resetState())
    dispatch(cartActions.resetState());
  }

  const toggleCartHandler = () =>{
    dispatch(cartActions.toggleCart())
  }
  
  return (
    <Container>
      <View>
        <PageTitle>TGL</PageTitle>
        <TitleBorder></TitleBorder>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={toggleCartHandler}
        >
          <MaterialCommunityIcons
            name="cart-outline"
            size={40}
            color="#B5C401"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={logoutHandler}>
          <MaterialIcons name="logout" size={40} color="#C1C1C1" />
        </TouchableOpacity>
      </View>
      <Cart/>
    </Container>
  );
};

export default Navbar;
