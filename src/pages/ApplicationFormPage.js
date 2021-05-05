import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { goToLastPage } from "../routes/coordinator";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { useForm } from "../hooks/useForm";
import CountrySelector from "../utils/CountrySelector";
import styled from "styled-components";

const ApplicationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & > h1 {
    color: #dc9d24;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > button {
    margin-right: 20px;
    font-weight: bold;
    background-color: black;
    color: #dc9d24;
    height: 40px;
    width: 100px;
    border-radius: 20px;
    cursor: pointer;
  }
`;

const FormApplication = styled.div`
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
  travel: "",
  name: "",
  age: "",
  candidacy: "",
  profession: "",
  country: "",
};

const ApplicationFormPage = () => {
  const [form, onChange, resetForm] = useForm(initialForm);
  const [trips, setTrips] = useState([]);
  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();
    console.log(form);
    resetForm();
  };

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
  useEffect(getTrips, []);

  const applyToTrip = () => {
    const body = {
      name: form.name,
      age: form.age,
      applicationText: form.candidacy,
      profession: form.profession,
      country: form.country,
    };

    console.log(body);
    const url = `${baseUrl}/paula-cruz/trips/${form.travel}/apply`;
    axios
      .post(url, body)
      .then((res) => {
        alert("Aplicação realizada com sucesso!");
      })
      .catch((err) => {
        // console.log(err.data);
      });
  };

  const getOptions = () => {
    const mapTrips = trips.map((trip) => {
      return <option value={trip.id}>{trip.name}</option>;
    });
    return mapTrips;
  };
  applyToTrip();
  const getCountries = () => {
    const paises = CountrySelector().props.options.map((country) => {
      return country.label;
    });
    const mapCountries = paises.map((pais) => {
      return <option value={pais}>{pais}</option>;
    });

    return mapCountries;
  };

  return (
    <>
      <ApplicationContainer>
        <h1>Inscreva-se</h1>

        <form onSubmit={handleClick}>
          <FormApplication>
            <select name={"travel"} value={form.travel} onChange={onChange}>
              {getOptions()}
            </select>
            <input
              name={"name"}
              value={form.name}
              placeholder="Nome"
              onChange={onChange}
              pattern={"(.*[a-z]){3}"}
              required
            />
            <input
              name={"age"}
              value={form.age}
              placeholder="idade"
              onChange={onChange}
              min={18}
              required
            />
            <input
              name={"candidacy"}
              value={form.candidacy}
              placeholder="Texto de candidatura"
              onChange={onChange}
              pattern={"(.*[a-z]){30}"}
              required
            />
            <input
              name={"profession"}
              value={form.profession}
              placeholder="Profissão"
              onChange={onChange}
              required
            />
            <select name={"country"} value={form.country} onChange={onChange}>
              <option>Selecione o País</option>
              {getCountries()}
            </select>
          </FormApplication>
          <ButtonContainer>
            <button>Enviar</button>
            <button
              onClick={() => {
                goToLastPage(history);
              }}
            >
              Voltar
            </button>
          </ButtonContainer>
        </form>
      </ApplicationContainer>
    </>
  );
};

export default ApplicationFormPage;
