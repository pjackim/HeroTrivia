import Cell, { RenderCell } from "./Cell";
import '../css/Board.css'
import { useState } from "react";


export default function Board(props) {
    return (<RenderBoard dimensions={getDimensions(props)} word={props.word} data={props.data}/>);
}

export var board = [];

function CreateBoard(props) {
    board = [];
    var center = parseInt(props.dimensions.width / 2);
    
    // Initialize Board
    for (var row = 0; row < props.dimensions["height"]; row++) {
        var temp = [];
        var answer = props.data[row]["Answer"];
        var hintIndex = answer.indexOf(props.data[row]["Letter"]);
        var letterIndex = 0;
        var used = false;

        for (var col = 0; col < props.dimensions["width"]; col++) {
            var context = {};
            
            var start = center - hintIndex;
            if (col >= start && col < (center + answer.length - hintIndex)) {
                context = Cell(answer[letterIndex], true, (col - start) == props.data[row]["Index"]);
                letterIndex++;
                
            } else
                context = Cell("");

            context.position = [row, col];
            temp.push(context);
        }

        board.push(temp);
    }

    function getRow(arr, rowIdx){
        return (
            <tr key={rowIdx}>
                {arr.map((m, i) => <RenderCell setRow={props.context.setRow} context={m} key={`${rowIdx},${i}`}/> )}
            </tr>);
    }

    const gridCells = <tbody>{board.map((row, idx) => getRow(row, idx))}</tbody>
    return gridCells;
}


function RenderBoard(props) {
    // return (
    //     state.hasWon
    //     ? 
    //     <div className='winner'>
    //         <div className='neon-orange'>you</div>
    //         <div className='neon-blue'>win</div>
    //     </div>
    //     :
    //     <div>
    //         <div className='Board-title'>
    //             <div className='neon-orange'>Hero</div>
    //             <div className='neon-blue'>Trivia</div>
    //         </div>
    //         <table className='Board'>
    //             {genGridCells()}
    //         </table>
            
    //     </div>
    // );

    // const [hasWon, setHasWon] = useState(false);
    const [row, setRow] = useState(0);
    // var context = {hasWon, setHasWon, row, setRow};
    var context = {row, setRow};

    return (
        <div>
            <div className='Board-title'>
                <div className='neon-orange'>Hero</div>
                <div className='neon-blue'>Trivia</div>
            </div>
            <div className='caption'><br/>Use<b> TAB </b>to easily jump to the next letter!</div>

            <table className='Board'>
                <CreateBoard dimensions={props.dimensions} word={props.word} data={props.data} context={context}/>
            </table>
            <RenderQuestion data={props.data} context={context}/>
        </div>
    );
}

function RenderQuestion(props) {
    var content = props.data[props.context.row]["Question"];

    return (
        <div className='Question-container'>
            {/* <div className='Question-title'>
                Question
            </div> */}
            <div className='Question-content'>
                {content}
            </div>
        </div>
    );
}


function getDimensions(props) {
    var width = 0, height = 0;
    height = props.word.length;

    props.data.forEach(element => {
        if (width < element["Answer"].length)
            width = element["Answer"].length;
    });
    return {"width": width * 2, "height": height};
}