import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'

// import { Link, NavLink } from 'react-router-dom'
import ExitSvg from '../../assets/imgs/user-boards/exit.svg'
import { onAddBoard } from '../../store/board.actions'


//MAP TO BOARD PREV

export function AddCheckList({onCreateNewTaskList, toggleModal }) {
  const [boardTitle, setBoardTitle] = useState('')





  return (
    <div  className="add-check-list-pop">
      <div className='add-list-title'>Create board</div>
      <div className="add-title">Board Title:</div>
      <input type="text" required="" aria-required="true" value={boardTitle} onChange={e=> setBoardTitle(e.target.value)}></input>
      <button className='btn create-list' onClick={onCreateNewTaskList}>Create</button>
      <img className='exit-svg' onClick={toggleModal} src={ExitSvg}></img>
    </div>
  )


}

