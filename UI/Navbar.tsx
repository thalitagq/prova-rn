import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons"; 
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, saveBet } from "../store/api";
import { authActions } from "../store/auth";
import { gamesActions } from "../store/games";
import { cartActions } from "../store/cart";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons"; 
import { RootState } from "../store";
import { Title } from "../utils/styles";
import { transformPrice } from '../components/Game'
import CartItem from "../components/Cart/CartItem";
import CustomConfirmButtom from "./CustomConfirmButtom";

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

const TextBold = styled.Text`
  color: #707070;
  font-size: 15px;
  font-weight: bold;
  font-style: italic;
`;

const TextLight = styled(TextBold)`
  font-family: 'Helvetica Light';
  font-weight: normal;
  font-style: normal;
`

const Footer = styled.View`
  background-color: #EBEBEB;
`;

const Navbar = () => {
  const { isCartOpen, cart, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const msg = <Title style={styles.centralizedText}>Carrinho vazio</Title>;

  const dispatch = useDispatch()
  
  const logoutHandler = async () => {
    await dispatch(logoutUser());
    dispatch(authActions.resetState())
    dispatch(gamesActions.resetState())
    dispatch(cartActions.resetState());
  }

  const saveBetHandler = async () => {
    await dispatch(saveBet());
    dispatch(cartActions.saveGame());
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
            <View style={styles.modalBody}>
              <TouchableOpacity
                style={{ marginLeft: "auto", marginBottom: 10 }}
                onPress={() => dispatch(cartActions.toggleCart())}
              >
                <AntDesign name="close" size={30} color="#B5C401" />
              </TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <MaterialCommunityIcons
                  name="cart-outline"
                  size={40}
                  color="#B5C401"
                />
                <Title>CART</Title>
              </View>
              <View style={{flex: 1}}>
                {cart.length > 0 &&
                  <ScrollView>
                    {cart.map((item) => {
                      return (
                        <CartItem
                          color={item.color}
                          date={item.date}
                          numbers={item.numbers}
                          price={item.price}
                          type={item.type}
                          key={item.id}
                          id={item.id}
                        />
                      );
                    })}
                  </ScrollView> 
                }
                {cart.length === 0 &&
                  msg
                }
              </View> 
              <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 'auto'}}>
                <TextBold>CART</TextBold>
                <TextLight> TOTAL: </TextLight>
                <TextBold style={{marginLeft: 'auto'}}>R$ {transformPrice(totalPrice)}</TextBold>
              </View>
            </View>
            <Footer>
              <CustomConfirmButtom title="Save" onPress={saveBetHandler}/>
            </Footer>
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
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalView: {
    height: "100%",
    width: "70%",
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBody:{
    flex: 1,
    padding: 20
  },
  centralizedText: {
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "auto",
    marginLeft: "auto",
  },
});