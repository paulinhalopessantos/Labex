import React from "react";
import { useHistory } from "react-router-dom";
import { goToListTrips, goToLoginPage } from "../routes/coordinator";
import styled from "styled-components";
import Astronauta from "../components/img/Astronauta.jpg";


const ButtonContainer = styled.div`
  & > button {
    background-color: transparent;
    color: black;
    border: 2px solid #dc9d24;
    color: #dc9d24;
    margin: 10px;
    width: 80px;
    cursor: pointer;
  }
`;

const HomeContainer = styled.div`
  background-image: url(${Astronauta});
  height: 100%;
  width: 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100%;
  font-family: Righteous;
  display: flex;
  flex-direction: column;
`;

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  color: #dc9d24;
  margin-top: 200px;
  align-items: center;
  justify-content: center;

  & > h1 {
    font-size: 100px;
    margin-bottom: 0;
  }

  & > p {
    font-size: 15px;
    margin-top: 0;
    margin-right: 20px;
  }
  //align-items: flex-end;
`;

const HomePage = () => {
  const history = useHistory();
  return (
    <>
      <HomeContainer>
        <ButtonContainer>
          <button
            onClick={() => {
              goToListTrips(history);
            }}
          >
            Ver Viagens
          </button>
          <button
            onClick={() => {
              goToLoginPage(history);
            }}
          >
            Área do Admin
          </button>
        </ButtonContainer>
        <ContainerText>
          <h1>LabeX</h1>
          <p>Sua Plataforma de Gerenciamento de Viagens Espaciais</p>
        </ContainerText>
      </HomeContainer>
    </>
  );
};

export default HomePage;
