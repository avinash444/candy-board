import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Board = ({ boardSize, colors}) => {
    const pickRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    }
    const [boardGrid, changeBoard] = useState([]);
    let scoreCard = 0;
    const [score,changeScore] = useState(0);
    const fillBoardRandomColor = (fillBoard) => {

        return fillBoard.map((row,rowIndex) => {
           return  row.map((col,index) => {
               col[`${rowIndex}-${index}-backgroundImage`] = pickRandomColor();
               col[`${rowIndex}-${index}-isActive`] = true;
               return col;
            })
        })
    }
    useEffect(() => {
        const fillBoard = Array(boardSize).fill(0).map(x => Array(boardSize)
            .fill({}));
        changeBoard(fillBoardRandomColor(fillBoard));
    }, []);

    function recursiveCalc(size=0, board= [...boardGrid]) {
       let m = size;
            //check for rows
            for(let i=0; i < board.length - 2; i++) {
                let col1 = board[m][i][`${m}-${i}-backgroundImage`];
                let col2 = board[m][i+1][`${m}-${i + 1}-backgroundImage`];
                let col3 = board[m][i + 2][`${m}-${i + 2}-backgroundImage`];
                let col4 = null;
                // condition to check for four same candies
                if((i + 3) <= board.length - 1) {
                    col4 = board[m][i + 3][`${m}-${i + 2}-backgroundImage`];
                }
                if(col1 === col2 && (col2 === col3) && col1 !== '') {
                    scoreCard +=3
                    if(col3 === col4 ) {
                        scoreCard +=1
                        board[m][i + 3][`${m}-${i + 3}-isActive`] = false;
                        board[m][i + 3][`${m}-${i + 3}-backgroundImage`] = '';
                    }
                    board[m][i][`${m}-${i}-isActive`] = false;
                    board[m][i][`${m}-${i}-backgroundImage`] = '';

                    board[m][i + 1][`${m}-${i + 1}-isActive`] = false;
                    board[m][i + 1][`${m}-${i + 1}-backgroundImage`] = '';

                    board[m][i + 2][`${m}-${i + 2}-isActive`] = false;
                    board[m][i + 2][`${m}-${i + 2}-backgroundImage`] = '';

                }
            }
            //check for columns
            for(let j=0; j <= m; j++) {
                for(let k=0; k < board.length - 2; k++) {
                    let row1 = board[k][j][`${k}-${j}-backgroundImage`];
                    let row2 = board[k + 1][j][`${k + 1}-${j}-backgroundImage`];
                    let row3 = board[k + 2][j][`${k + 2}-${j}-backgroundImage`];
                    let row4 = null;
                    // condition to check for four same candies
                    if((k + 3) <= board.length - 1) {
                        row4 = board[k + 3][j][`${k + 3}-${j}-backgroundImage`];
                    }
                    if(row1 === row2 && (row2 === row3) && row1 !== '') {
                        scoreCard +=3
                        if(row3 == row4) {
                            scoreCard +=1
                            board[k + 3][j][`${k + 3}-${j}-isActive`] = false;
                            board[k + 3][j][`${k + 3}-${j}-backgroundImage`] = '';
                        }
                        board[k][j][`${k}-${j}-isActive`] = false;
                        board[k][j][`${k}-${j}-backgroundImage`] = '';

                        board[k + 1][j][`${k + 1}-${j}-isActive`] = false;
                        board[k + 1][j][`${k + 1}-${j}-backgroundImage`] = '';

                        board[k + 2][j][`${k + 2}-${j}-isActive`] = false
                        board[k + 2][j][`${k + 2}-${j}-backgroundImage`] = '';
                    }
                }
            }
            // check for gravity
        if(m === board.length - 1) {
            for(let i=0; i <=m; i++) {
                let len = board.length - 1;
                let idx = len;
                let curIdx = len;
                while (curIdx >= 0) {
                    if(board[curIdx][i][`${curIdx}-${i}-isActive`] === false) {
                        curIdx--;
                    }else {
                        [board[curIdx][i][`${curIdx}-${i}-isActive`], board[idx][i][`${idx}-${i}-isActive`]] = [board[idx][i][`${idx}-${i}-isActive`], board[curIdx][i][`${curIdx}-${i}-isActive`]];
                        [board[curIdx][i][`${curIdx}-${i}-backgroundImage`], board[idx][i][`${idx}-${i}-backgroundImage`]] = [board[idx][i][`${idx}-${i}-backgroundImage`], board[curIdx][i][`${curIdx}-${i}-backgroundImage`]];
                        curIdx--;
                        idx--
                    }
                }
            }
        }
        if(m === board.length - 1) {
            let prevScore = score;
            prevScore += scoreCard
            changeScore(prevScore)
            changeBoard(board);
        } else {
            // recursion
            recursiveCalc(size + 1, board);
        }
    }
    const handleBoardClick = (cord) => () => {
      recursiveCalc();
    }
    return (
        <div className="board-container">
            {
                boardGrid.map((row,rowIndex) => {
                    return (
                        <div className="row" key={`row-${rowIndex}`} data-rowvalue={`${rowIndex}`}>
                            {
                                row.map((column,colIndex) =>
                                    <div
                                        className="column"
                                        onClick={handleBoardClick({rowIndex, colIndex})}
                                        key={`column-${colIndex}`}
                                        data-columnvalue={`${rowIndex}, ${colIndex}`}
                                        data-active={column[`${rowIndex}-${colIndex}-isActive`] }
                                        style={{ backgroundImage: `url(${column[`${rowIndex}-${colIndex}-backgroundImage`]})`}}
                                    />)
                            }
                        </div>
                    )
                })
            }
            <div className="score-count">score: {score}</div>
        </div>
    )
}
Board.propTypes = {
    boardSize: PropTypes.number,
    colors: PropTypes.array
}
Board.defaultProps = {
    boardSize: 10
}

export default Board
