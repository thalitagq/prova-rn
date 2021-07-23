import React from "react";
import CartItem from "./CartItem";
import { RootState } from "../../store";
import { transformPrice } from "../Game";
import { saveBet } from "../../store/api";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import {
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Title } from "../../utils/styles";
import CustomConfirmButtom from "../../UI/CustomConfirmButtom";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

const TextBold = styled.Text`
  color: #707070;
  font-size: 15px;
  font-weight: bold;
  font-style: italic;
`;

const TextLight = styled(TextBold)`
  font-family: "Helvetica Light";
  font-weight: normal;
  font-style: normal;
`;

const Footer = styled.View`
  background-color: #ebebeb;
`;

function Cart() {
  const { isCartOpen, cart, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();
  const msg = <Title style={styles.centralizedText}>Carrinho vazio</Title>;

  const saveBetHandler = async () => {
    await dispatch(saveBet());
    dispatch(cartActions.saveGame());
  };

  return (
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
            <View style={{ flex: 1 }}>
              {cart.length > 0 && (
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
              )}
              {cart.length === 0 && msg}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                marginTop: "auto",
              }}
            >
              <TextBold>CART</TextBold>
              <TextLight> TOTAL: </TextLight>
              <TextBold style={{ marginLeft: "auto" }}>
                R$ {transformPrice(totalPrice)}
              </TextBold>
            </View>
          </View>
          <Footer>
            <CustomConfirmButtom title="Save" onPress={saveBetHandler} />
          </Footer>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBody: {
    flex: 1,
    padding: 20,
  },
  centralizedText: {
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "auto",
    marginLeft: "auto",
  },
});

export default Cart;
