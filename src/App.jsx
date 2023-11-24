import "./App.css";
import {useEffect, useState, useRef} from "react";

const calculateWinner = (cells) => {
    let amogus=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    let cellsX = [];
    let cellsO = [];

    // find all X and O placements
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerText === "X"){
            cellsX.push(i);
        } else if (cells[i].innerText === "O"){
            cellsO.push(i);
        }
    }

    let winner = "";
    amogus.forEach((pattern) => {
        // check if X won
        for(let i = 0; i < pattern.length; i++){
            if (cellsX.includes(pattern[i])){
                if (i === 2){
                    winner = "X";
                }
            }
            else { break; }
        }

        // check if O won
        for(let i = 0; i < pattern.length; i++){
            if (cellsO.includes(pattern[i])){
                if (i === 2){
                    winner = "O";
                }
            }
            else { break; }
        }

    });
    return winner;
};

function App() {
    const board = useRef(null);
    const infoBox = useRef(null);
    const [player, setPlayer] = useState("X");
    const [moves, setMoves] = useState(0);
    const nextPlayer = () => {
        setPlayer(player === 'X' ? "O" : "X");
        setMoves(moves + 1);
    };

    useEffect(() => {
        let winner = calculateWinner(board.current.querySelectorAll(".cell"));
        if (winner !== ""){
            infoBox.current.innerText = "Winner: " + winner;
            return;
        }
        if(moves === 9) {
            infoBox.current.innerText = "REMIS xd";
            return;
        }
    }, [moves]);

    const onClick = (e) => {
        if (moves === 9 || e.target.innerText !== "" || calculateWinner(board.current.querySelectorAll(".cell")) !== ""){
            return;
        }

        e.target.innerText = player;
        nextPlayer();
    }

  return (
    <>
        <div ref={board} id={"board"}>
            <div className={"cell"} onClick={onClick}/>
            <div className={"cell"} onClick={onClick}/>
            <div className={"cell"} onClick={onClick}/>
            <div className={"cell"} onClick={onClick}/>
            <div className={"cell"} onClick={onClick}/>
            <div className={"cell"} onClick={onClick}/>
            <div className={"cell"} onClick={onClick}/>
            <div className={"cell"} onClick={onClick}/>
            <div className={"cell"} onClick={onClick}/>
        </div>
        <div id={"info"}>
            <p ref={infoBox}>Next player: {player}</p>
        </div>
    </>
  );
}

export default App
