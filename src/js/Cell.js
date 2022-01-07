import { Component, useState } from "react";
import '../css/Cell.css'

export default function Cell(pletter = "-", pstate = false, pspecial = false) {
    const [state, setState] = useState(pstate);
    const [special, setSpecial] = useState(pspecial);
    const [attemptLetter, setAttempt] = useState("");
    const [letter, setLetter] = useState(pletter);
    var position = [];
    const context = {state, setState, special, setSpecial, letter, setLetter, position, attemptLetter, setAttempt};

    return context;
}



export function RenderCell(props) {
    function handleChange(e, cellContext) {
        cellContext.setSpecial(e.target.value.toLowerCase() == cellContext.letter.toLowerCase());
    }

    function handleClick(cellContext, setRow) {
        setRow(cellContext.position[0]);
        console.log("row", cellContext.position[0]);
    }

    let classes = '', content = '';
    if (props.context.state) {
        classes = 'Cell';
        classes += (props.context.special ? ' Cell-Glow' : ' Cell-Input');
        content = (props.context.special ?  props.context.letter : <input type="text" onFocus={() => {handleClick(props.context,props.setRow)}} onChange={(e) => {handleChange(e, props.context, props.setRow);}}/>);
    } 
    else 
        classes = 'Space';


    return (
        <td className={classes}>
            <p className="CellContent">
                {content}
            </p>
        </td>
    )
}