import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { aboutRouter, boardListRouter } from './routes';
import useLogout from '../auth/useLogout';

export default function Header(): JSX.Element {
  const handleLogout = useLogout();
  return (
    <Title>
      <Navigation>
        <StyledLink to={boardListRouter.uri}>Board</StyledLink>
        <StyledLink to={aboutRouter.uri}>About</StyledLink>
        <LogoutButton type="button" onClick={handleLogout}>
          logout
        </LogoutButton>
      </Navigation>
    </Title>
  );
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Navigation = styled.ul`
  display: flex;
  flex: 1;
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
  font-size: 0.8rem;
  height: 1.5rem;
  line-height: 1.5rem;
  flex: 3;

  &.${activeClassName} {
    color: blue;
  }
`;
const LogoutButton = styled.button`
  flex: 1;
  -webkit-appearance: none;
  background-color: transparent;
  border: 0;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
