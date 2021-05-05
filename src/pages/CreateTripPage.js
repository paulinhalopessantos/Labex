import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { goToLastPage } from "../routes/coordinator";
import useProtectedPage from "../hooks/useProtectedPage";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { useForm } from "../hooks/useForm";
import styled from "styled-components";
const TripContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

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
const FormTrip = styled.div`
  display: flex;
  flex-direction: column;

  & > input {
    margin: 10px;
    margin: 10px;
    width: 500px;
    height: 20px;
    border-radius: 10px;
    padding: 5px;
  }

  & > select {
    margin: 10px;
    margin: 10px;
    width: 510px;
    height: 40px;
    border-radius: 10px;
    padding: 5px;
  }
`;

const initialForm = {
  name: "",
  planet: "",
  date: "",
  description: "",
  duration: "",
  select: "",
};

const CreateTripPage = () => {
  useProtectedPage();
  const history = useHistory();
  const [form, onChange, resetForm] = useForm(initialForm);
  const handleClick = (event) => {
    event.preventDefault();
    console.log(form);
    resetForm();
  };

  const createTrip = () => {
    const url = `${baseUrl}/paula-cruz/trips`;
    const token = window.localStorage.getItem("token");
    const body = {
      name: form.name,
      planet: form.select,
      date: form.date,
      description: form.description,
      durationInDays: form.duration,
    };
    console.log(body);

    axios
      .post(url, body, {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
        console.log("Deu certo");
      })
      .catch((err) => {
        console.log("deu errado");
      });
  };
 
  useEffect(createTrip, [form.date,form.description,form.name,form.select, form.duration]);

  return (
    <>
      <TripContainer>
        <h1>Criar Viagem</h1>
        <form onSubmit={(handleClick, createTrip)}>
          <FormTrip>
            <input
              required
              placeholder="nome"
              pattern={"(.*[a-z]){5}"}
              name={"name"}
              value={form.name}
              onChange={onChange}
            />
            <select name={"select"} value={form.select} onChange={onChange}>
              <option value="escolha">Escolha um planeta</option>
              <option value="Mercúrio">Mercúrio</option>
              <option value="Vênus">Vênus</option>
              <option value="Terra">Terra</option>
              <option value="Júpiter">Júpiter</option>
              <option value="Saturno">Saturno</option>
              <option value="Urano">Urano</option>
              <option value="Netuno">Netuno</option>
              <option value="Plutão">Plutão</option>
            </select>
            <input
              required
              type="date"
              name={"date"}
              value={form.date}
              onChange={onChange}
            />
            <input
              required
              placeholder="Descrição"
              name={"description"}
              value={form.description}
              onChange={onChange}
              pattern={"(.*[a-z]){3}"}
            />
            <input
              required
              placeholder="Duração em dias"
              min={50}
              type="number"
              name={"duration"}
              value={form.duration}
              onChange={onChange}
            />
          </FormTrip>

          <ButtonContainer>
            <button>Criar</button>
            <button
              onClick={() => {
                goToLastPage(history);
              }}
            >
              Voltar
            </button>
          </ButtonContainer>
        </form>
      </TripContainer>
    </>
  );
};

export default CreateTripPage;
