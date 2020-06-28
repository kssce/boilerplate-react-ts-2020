import React, { useEffect } from 'react';
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
    <div>
      {list.map(({ id, name }: BoardItem) => {
        return (
          <div key={id}>
            <span>{id}:</span>
            <span>{name}</span>
          </div>
        );
      })}
    </div>
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

export default BoardList;
