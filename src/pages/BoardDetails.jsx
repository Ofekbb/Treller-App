import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { useState } from 'react';

import { GroupList } from '../cmps/user-board/GroupsList';
import { socketService } from '../services/socket.service';
import { loadBoard, onEditBoard } from '../store/board.actions';
import { BoardHeader } from '../cmps/user-board/BoardHeader';
import { taskService } from '../services/task.service';
import { TaskEdit } from '../cmps/task-edit/TaskEdit';

function _BoardDetails(props) {
  // const { board } = props;
  // const [board, setBoard] = useState(props.board)
  const boardId = props.match.params.boardId;
  let board = props.board
  
  useEffect(() => {
    // props.loadBoard(boardId)
    // setBoard(props.board)
    // console.log('props:' ,props)
    onLoadBoard(boardId)
    socketService.on('board-update', onLoadBoard)
  },[]);

  const onLoadBoard = async (boardId) => {
    await props.loadBoard(boardId)
    // console.log('dodod',props.board);
    // setBoard(props.board)
  }

  const onAddGroup = (title) => {
    const updatedBoard = taskService.addGroup(board, title);
    props.onEditBoard(updatedBoard);
  };

  const onAddTask = (groupId, title) => {
    const updatedBoard = taskService.addTask(board, groupId, title);
    props.onEditBoard(updatedBoard);
  };

  const onEditGroupTitle = (groupId, title) => {
    const updatedBoard = taskService.editGroupTitle(board, groupId, title);
    props.onEditBoard(updatedBoard);
  };

  const onUpdateGroups = async (groups) => {
    const updatedBoard = taskService.updateGroups(board, groups);
    await props.onEditBoard(updatedBoard);
  };

  const toggleOpenLabel = (ev) => {
    if (!board.isLabelOpen) board.isLabelOpen = true;
    else board.isLabelOpen = !board.isLabelOpen;
    props.onEditBoard(board);
  };

  const onUpdateTask = (task) => {
    const updatedBoard = taskService.updateTask(board, task);
    props.onEditBoard(updatedBoard);
  }
  // if(!board) onLoadBoard(boardId);
  if (!board) return <span>loading...</span>
  // console.log(board.groups)
  return (
    <>
      <div
        className="board-container"
        style={{ backgroundImage: `url(${board.style.bgImg})` }}
      >
        <BoardHeader board={board} />
        {/* <div className="board-scroller"></div> */}
        <div className="board">
          <GroupList
            groupsFromBoard={board.groups}
            boardId={boardId}
            onAddTask={onAddTask}
            onEditGroupTitle={onEditGroupTitle}
            onUpdateGroups={onUpdateGroups}
            onAddGroup={onAddGroup}
            toggleOpenLabel={toggleOpenLabel}
            isLabelOpen={board.isLabelOpen}
            onUpdateTask={onUpdateTask}
          />
        </div>
      </div>
      <Route path="/:boardId/:taskId" component={TaskEdit} label="edit" />
    </>
  );
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}
const mapDispatchToProps = {
  loadBoard,
  onEditBoard,
};

export const BoardDetails = connect(mapStateToProps,mapDispatchToProps)(_BoardDetails);
