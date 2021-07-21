import React from 'react'
import {Text, ScrollView } from 'react-native'
import styled from 'styled-components/native';
import GameButton from '../components/GameButton';
import { Game } from '../store/games';

const Container = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const FilterTitle = styled.Text`
  color: #868686;
  font-size: 17px;
  font-family: Helvetica;
  font-style: italic;
  margin-bottom: 10px
`;

const Filters: React.FC<{ games: Game[], title: string }> = (props) => {
  return (
    <>
      <FilterTitle>{props.title}</FilterTitle>
      <Container>
        <ScrollView horizontal>
          {props.games.map((game) => (
            <GameButton text={game.type} color={game.color} key={game.type} />
          ))}
        </ScrollView>
      </Container>
    </>
  );
};

export default Filters
