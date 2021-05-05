import React, { useState, useEffect } from "react";
import { goToApplicationForm, goToLastPage } from "../routes/coordinator";
import { useHistory } from "react-router-dom";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
const CardTrip = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 250px;
  width: 400px;
  padding: 10px;
  color: black;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: inset 0 0 1em lightgrey;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 10px;
  align-items: center;
  justify-content: center;

  & > button {
    font-weight: bold;
    background-color: black;
    color: #dc9d24;
    margin: 10px;
    height: 40px;
    width: 100px;
    border-radius: 10px;
    border-style: none;
    cursor: pointer;
  }
`;

const Title = styled.h1`
  color: #dc9d24;
  font-weight: bold;
  align-self: center;
`;
const ListTripsPage = () => {
  const history = useHistory();
  const [trips, setTrips] = useState([]);

  const getTrips = () => {
    const url = `${baseUrl}/paula-cruz/trips`;
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data.trips);
        setTrips(res.data.trips);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  useEffect(() => {
    getTrips();
  }, [trips]);

  return (
    <>
      <ButtonContainer>
        <button
          onClick={() => {
            goToApplicationForm(history);
          }}
        >
          Inscreva-se
        </button>
        <button
          onClick={() => {
            goToLastPage(history);
          }}
        >
          Voltar
        </button>
      </ButtonContainer>
      <Title>Lista de Viagens</Title>
      {trips.map((trip) => {
        return (
          <CardContainer>
            <CardTrip>
              <p>Nome:{trip.name}</p>
              <p>Descrição:{trip.description}</p>
              <p>Planeta:{trip.planet}</p>
              <p>Duração:{trip.durationInDays}</p>
              <p>Data:{trip.date}</p>
            </CardTrip>
          </CardContainer>
        );
      })}
    </>
  );
};

export default ListTripsPage;
