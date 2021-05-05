import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: black;
  margin-top: auto;
  color: #dc9d24;
  align-items: center;
  box-sizing: border-box;
  padding-left: 20px;
`;

const Footer = () => {
  return (
    <FooterContainer>Copyright ⓒ Todos os direitos Reservados</FooterContainer>
  );
};

export default Footer;
