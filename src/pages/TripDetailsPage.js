import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { goToLastPage } from "../routes/coordinator";
import useProtectedPage from "../hooks/useProtectedPage";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;

  & > button {
    margin-right: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    background-color: black;
    color: #dc9d24;
    height: 40px;
    width: 100px;
    border-radius: 10px;
    cursor: pointer;
    border-style: none;
  }
`;

const CardDetailsTrip = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 500px;
  padding: 10px;
  color: black;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: inset 0 0 1em lightgrey;
  & > button {
    margin-right: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    background-color: black;
    color: #dc9d24;
    height: 60px;
    width: 100px;
    border-radius: 10px;
    cursor: pointer;
    border-style: none;
  }
`;

const TripDetailsPage = () => {
  useProtectedPage();
  const history = useHistory();
  const params = useParams();
  const [trip, setTrip] = useState({});

  const getTrips = () => {
    const token = window.localStorage.getItem("token");
    const url = `${baseUrl}/paula-cruz/trip/${params.id}
    `;
    axios
      .get(url, {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
        setTrip(res.data.trip);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getTrips();
  }, [trip,getTrips()]);

  const decideCandidate = (tripId, candidateId) => {
    const body = {
      approve: true,
    };
    const url = `${baseUrl}/paula-cruz/trips/${tripId}/candidates/${candidateId}/decide}`;
    const token = window.localStorage.getItem("token");
    axios
      .put(url, { headers: { auth: token } }, body)
      .then((res) => {
        alert("aprovado!");
      })
      .catch((err) => {});
  };

  return (
    <>
      <DetailsContainer>
        <button
          onClick={() => {
            goToLastPage(history);
          }}
        >
          Voltar
        </button>
        <CardDetailsTrip>
          {trip.name && <h1>{trip.name}</h1>}
          {trip.name && <p>Nome:{trip.name}</p>}
          {trip.description && <p>Descrição:{trip.description}</p>}
          {trip.planet && <p>Planeta:{trip.planet}</p>}
          {trip.duration && <p>Duração:{trip.duration}</p>}
          {trip.date && <p>Data:{trip.date}</p>}
        </CardDetailsTrip>
        <h1>Candidatos Pendentes</h1>
        {trip.candidates &&
          trip.candidates.map((candidate) => {
            return (
              <div>
                <CardDetailsTrip>
                  <p>Nome:{candidate.name}</p>
                  <p>Idade:{candidate.age}</p>
                  <p>País:{candidate.country}</p>
                  <p>Profissão:{candidate.profession}</p>
                  <p>Texto de Candidatura:{candidate.applicationText}</p>

                  <button
                    onClick={() => decideCandidate(trip.id, candidate.id)}
                  >
                    Aprovar
                  </button>
                </CardDetailsTrip>
              </div>
            );
          })}
        <h1>Candidatos Aprovados</h1>
        {trip.approved &&
          trip.approved.map((aprove) => {
            return <p>{aprove.name}</p>;
          })}
      </DetailsContainer>
    </>
  );
};

export default TripDetailsPage;
