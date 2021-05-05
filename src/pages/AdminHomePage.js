import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { goToCreateTrip, goToLastPage } from "../routes/coordinator";
import useProtectedPage from "../hooks/useProtectedPage";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";


const AdminContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
`;
const ButtonContainer = styled.div`
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

const ListContainer = styled.div`
  display: flex;
  & > button {
    width: 500px;
    height: 50px;
    margin-bottom: 20px;
    border-radius: 10px;
    border-style: none;
    color: #dc9d24;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
  }

  button:nth-child(2) {
    width: 50px;

    margin-left: 30px;
  }
`;

const AdminHomePage = () => {
  useProtectedPage();
  const [trips, setTrips] = useState([]);
  const history = useHistory();

  const getTrips = () => {
    const url = `${baseUrl}/paula-cruz/trips`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.trips);
        setTrips(res.data.trips);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  useEffect(() => {
    getTrips();
    const token = window.localStorage.getItem("token");
    if (token === null) {
      history.push("/login");
    }
  }, [history]);

  const deleteTrip = (id) => {
    const token = window.localStorage.getItem("token");
    const url = `${baseUrl}/paula-cruz/trips/${id}`;

    axios
      .delete(url, { headers: { auth: token } })
      .then((res) => {
        alert("Deletado!");
      })
      .catch((err) => {
        alert("Não foi possível deletar");
      });
  };
  useEffect(() => {
    getTrips();
  }, [trips]);

  const goToDetailPage = (id) => {
    history.push(`/admin/trips/${id}`);
  };
  return (
    <>
      <AdminContainer>
        <ButtonContainer>
          <button
            onClick={() => {
              goToCreateTrip(history);
            }}
          >
            Criar Viagem
          </button>
          <button
            onClick={() => {
              goToLastPage(history);
            }}
          >
            Voltar
          </button>
        </ButtonContainer>

        {trips.map((trip) => {
          return (
            <ListContainer>
              <button onClick={() => goToDetailPage(trip.id)}>
                {trip.description}
              </button>
              <button onClick={() => deleteTrip(trip.id)}>
                <DeleteIcon />
              </button>
            </ListContainer>
          );
        })}
      </AdminContainer>
    </>
  );
};
//Nao esquecer de chamar a função goToTripDetails em cima de cada trip
export default AdminHomePage;
