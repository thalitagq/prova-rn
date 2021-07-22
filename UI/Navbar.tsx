import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons"; 
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/api";
import { authActions } from "../store/auth";
import { gamesActions } from "../store/games";
import { cartActions } from "../store/cart";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootState } from "../store";
import { Title } from "../utils/styles";

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
  const {isCartOpen} = useSelector((state: RootState) => state.cart)

  const dispatch = useDispatch()
  const logoutHandler = async () => {
    await dispatch(logoutUser());
    dispatch(authActions.resetState())
    dispatch(gamesActions.resetState())
    dispatch(cartActions.resetState());
  };

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
      <Modal
        transparent={true}
        visible={isCartOpen}
        animationType="fade"
        onRequestClose={() => {
          dispatch(cartActions.toggleCart());
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flexDirection: "row", alignItems: 'baseline'}}>
              <MaterialCommunityIcons
                name="cart-outline"
                size={40}
                color="#B5C401"
              />
              <Title>CART</Title>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    height: 80,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalView: {
    height: "100%",
    width: '70%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
})