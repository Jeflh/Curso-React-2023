import { useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS, WINNER_COMBINATIONS } from './constants.js'
import Square from './components/Square.jsx'
import WinnerModal from './components/WinnerModal.jsx'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combination of WINNER_COMBINATIONS){
      const [a, b, c] = combination

      if (
        boardToCheck[a] && // 0 -> x u o
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    // Si no hay ganador
    return false
  }

  const checkEndGame = (boardToCheck) => {
    // Revisar si el tablero no tiene espacios vacios
    return boardToCheck.every((square) => square !== null)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner ) return

    // Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Actualizar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }
    // Revisar si el juego ha terminado
    else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square 
                key={index} 
                index={index} 
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner}  resetGame={resetGame}/>
    </main>
  )
}

export default App
