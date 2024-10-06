import React, { useState } from 'react'
import './TicTacToe.css'

const TicTacToe = () => {
    const [turn, setTurn] = useState('x');
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState();
    const checkForWinner = (squares) => {
        let combos = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6],
            ],
        };
        // Check for a draw
        if (squares.every(cell => cell !== '') && !winner) {
            setWinner('None');
            return;
        }

        for (let combo in combos){
            combos[combo].forEach((pattern) => {
                if(
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === '' 
                ){
                    //do nothing
                } else if(
                    squares[pattern[0]] !== '' &&
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]
                ){
                    setWinner(squares[pattern[0]]);
                }
            });
        }
    };

    const handleClick = (num) => {
        if(cells[num] !== ''){
            alert('already clicked');
            return;
        }
        let squares = [...cells]
        if(turn === 'x'){
            squares[num] = 'x';
            setTurn('o');
        } else{
            setTurn('x');
            squares[num] = 'o';
        }
        checkForWinner(squares);
        setCells(squares);
    };
    const handleRestart = () => {
        setWinner(null);
        setCells(Array(9).fill(''));
    };
    const Cell = ({num}) => {
        return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
    };
     
    return (
        <div className='container'>
            <h1>Tic Tac Toe &#128540;</h1>
            <table>
                Turn: {turn}
                <tbody>
                    <tr>
                        <Cell num={0} />
                        <Cell num={1} />
                        <Cell num={2} />
                    </tr>
                    <tr>
                        <Cell num={3} />
                        <Cell num={4} />
                        <Cell num={5} />
                    </tr>
                    <tr>
                        <Cell num={6} />
                        <Cell num={7} />
                        <Cell num={8} />
                    </tr>
                </tbody>
            </table>
            {winner && (
                <>
                <p>{winner} is the winner!</p>
                <button className='button-50' onClick={() => handleRestart()}>Play again</button>
                </>
            )}
        </div>
    );
};

export default TicTacToe
