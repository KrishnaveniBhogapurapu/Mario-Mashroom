import React from 'react'
import Board from './Board'

function Capture(){
    let h = prompt("enter height")
    let w
    if(h){
    w = prompt("enter width")
    }
    return <Board horizontalBlocks = {h} verticalBlocks = {w}/>
    }

export default Capture