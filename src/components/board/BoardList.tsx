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
      {list.map(({ id, name }: BoardItem) => {
        return (
          <div key={id}>
            <span>{id}:</span>
            <span>{name}</span>
          </div>
        );
      })}
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
  return board.list;
}

const Root = styled.div`
  background-color: #3385bb;
  color: white;
`;
export default BoardList;
