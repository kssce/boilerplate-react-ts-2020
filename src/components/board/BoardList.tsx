import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBoardList,
  BoardListType,
  BoardItem,
} from '../../data/board/boardReducer';
import { RootState } from '../../data/rootReducer';

function BoardList(): JSX.Element {
  const list: BoardListType = useComponentInit();
  return (
    <Root>
      {list.map(
        ({
          seq,
          version,
          title,
          grade,
          subject,
          function: func,
        }: BoardItem) => {
          return (
            <ContentsWrap key={seq}>
              <span>{version}:</span>
              <span> | {title}</span>
              <span> | {grade}</span>
              <span> | {subject}</span>
              <span> | {func}</span>
            </ContentsWrap>
          );
        },
      )}
    </Root>
  );
}

function useComponentInit() {
  const list = useSelector(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoardList());
  }, [dispatch]);

  return list;
}

function selector({ board }: RootState) {
  return board.list || [];
}

const Root = styled.div`
  border: 1px dashed black;
`;

const ContentsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export default BoardList;
