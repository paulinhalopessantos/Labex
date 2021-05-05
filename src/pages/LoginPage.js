import React from "react";
import { useHistory } from "react-router-dom";
import { goToLastPage } from "../routes/coordinator";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { useForm } from "../hooks/useForm";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > input {
    margin: 10px;
    width: 500px;
    height: 20px;
    border-radius: 10px;
    padding: 5px;
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
    border-style: none;
  }
`;

const Title = styled.h1`
  color: #dc9d24;
  font-weight: bold;
  align-self: center;
`;

const initialForm = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const history = useHistory();
  const [form, onChange, resetForm] = useForm(initialForm);

  const handleClick = (event) => {
    event.preventDefault();
    console.log(form);
    resetForm();
  };

  const login = () => {
    const url = `${baseUrl}/paula-cruz/login`;
    const body = {
      email: form.email,
      password: form.password,
    };

    axios
      .post(url, body)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        history.push("/admin/trips/list");
        console.log("sucesso!");
      })
      .catch((err) => {});
  };

  login();
  return (
    <>
      <Title>Conecte-se</Title>

      <LoginContainer>
        <form onSubmit={(handleClick, login)}>
          <div>
            <InputContainer>
              <input
                required
                value={form.email}
                name="email"
                pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"}
                placeholder="Email"
                onChange={onChange}
              />

              <input
                required
                value={form.password}
                name="password"
                pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"}
                placeholder="Senha"
                onChange={onChange}
              />
            </InputContainer>
          </div>
          <ButtonContainer>
            <button
              onClick={() => {
                goToLastPage(history);
              }}
            >
              Voltar
            </button>
            <button>Entrar</button>
          </ButtonContainer>
        </form>
      </LoginContainer>
    </>
  );
};
export default LoginPage;
