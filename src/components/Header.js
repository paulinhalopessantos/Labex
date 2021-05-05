import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: black;
  font-family: "Righteous", cursive;
  color: #dc9d24;
  font-size: 45px;
  font-weight: bold;
  box-sizing: border-box;
  padding: 25px 30px;
`;
function Header(props) {
  //[firstTitle, secondTitle] = props;
  return <HeaderContainer>Labex</HeaderContainer>;
}
export default Header;
