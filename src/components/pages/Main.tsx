import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Contents from './Contents';
import GlobalStyles from './styles/GlobalStyles';

function Main(): JSX.Element {
  return (
    <Root>
      <GlobalStyles />

      <Header />

      <Divider />

      <Contents />
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Divider = styled.hr`
  width: 100%;
  flex-basis: 1px;
  background-color: black;
  margin: 0;
  border: 0;
`;

export default Main;
