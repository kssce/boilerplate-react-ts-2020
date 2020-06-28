import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { aboutRouter, boardListRouter } from './routes';

export default function Header(): JSX.Element {
  return (
    <Title>
      <Navigation>
        <StyledLink to={boardListRouter.uri}>Board</StyledLink>
        <StyledLink to={aboutRouter.uri}>About</StyledLink>
      </Navigation>
    </Title>
  );
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

const Navigation = styled.ul`
  display: flex;
  flex: 8;
  font-size: 1.3rem;
  a {
    flex: 1;
    text-align: center;
    text-decoration: none;
    color: black;
    &:hover {
      color: blue;
    }
  }
`;

const activeClassName = 'active-link';
const StyledLink = styled(NavLink).attrs({
  activeClassName,
})`
  color: black;

  &.${activeClassName} {
    color: blue;
  }
`;
