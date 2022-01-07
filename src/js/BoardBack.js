import { Component, useEffect } from "react";
import Cell from "./Cell";
import '../css/Board.css'
import { AddFileListener } from "./ProcessData";

export const word = "Parker";

class Board extends Component{
    static defaultProps = {
        maxWordSize: 6
    }
    constructor(props){
        super(props)

        this.state = {
            grid: this.initGrid(props),
            hasWon:false
        }
        this.toggle = this.toggle.bind(this)
    }
    initGrid(props){

        let data = props.boardData;

        if (data.length <= 0)
            return [];


        let width = this.props.maxWordSize;
        let height = word.length;
        let letters = [...word]
        let grid = []

        let hintCol = parseInt((Math.random() * 100)) % width;
        for(let y = 0; y < height; y++){

            let row = []            
            for(let x=0; x < data[y]["Answer"].length; x++)
                row.push(
                    {
                        "data": data[y]["Answer"][x],
                        "glow": data[y]["Answer"][x] == word[y]
                    }
                    );
            
            grid.push(row)
        }
        return grid
    }
    genGridCells(grid = this.state.grid){
        function getRow(arr, rowIdx, obj){
            return (
                <tr key={rowIdx}>
                    {arr.map((m, i) => 
                    <Cell letter={m["data"]} mode={m["glow"]} key={`${rowIdx},${i}`} pos={[rowIdx,i]} toggle={obj.toggle}/>
                    )
                }
                </tr>);
        }
        const gridCells = <tbody>{grid.map((row, idx) => getRow(row, idx, this))}</tbody>

        return gridCells;
    }
    
    toggle(pos){
        // It toggles the given grid position using 
        function duplicate(grid){
            let newGrid = grid.map(row=>{
                return [...row]
            })
            return newGrid
        }

        this.setState(currSt=>{

            let newGrid = duplicate(currSt.grid)
            const [row, col] = pos

            if ((row >= 0 && row <= newGrid.length - 1) && (col >= 0 && col <= newGrid.length - 1)){
                if(newGrid[row][col]){
                    newGrid[row][col]=""
                }
                else{
                    newGrid[row][col]=1
                }
            }

            let hasWon = newGrid.every(row => row.every(cell => !cell))

            return {
                grid: newGrid,
                hasWon: hasWon
            }

        })
    }
    

        
    render() {
        AddFileListener(this.props.setData, this.setState, this.initGrid);
        return (
            this.state.hasWon
            ? 
            <div className='winner'>
                <div className='neon-orange'>you</div>
                <div className='neon-blue'>win</div>
            </div>
            :
            <div>
                <div className='Board-title'>
                    <div className='neon-orange'>Hero</div>
                    <div className='neon-blue'>Trivia</div>
                </div>
                <table className='Board'>
                    {this.genGridCells()}
                </table>
                
            </div>
        )
    }
}

export default Board