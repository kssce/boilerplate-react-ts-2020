import React from 'react';
import styled from 'styled-components';

function NotFound(): JSX.Element {
  return (
    <Root>
      <WarningMsg>404 Page not found.</WarningMsg>
    </Root>
  );
}

const Root = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WarningMsg = styled.span`
  font-weight: bold;
  font-size: 2rem;
`;

export default NotFound;
