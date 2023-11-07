import { useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS, WINNER_COMBINATIONS } from './constants.js'
import Square from './components/Square.jsx'
import WinnerModal from './components/WinnerModal.jsx'

function App() {
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    if (turnFromStorage) return turnFromStorage
    return TURNS.X
  })

  const [scores, setScores] = useState(()=>{
    const scoresFromStorage = window.localStorage.getItem('scores')
    if (scoresFromStorage) return JSON.parse(scoresFromStorage)
    return [0, 0]
  })

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
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
    window.localStorage.setItem('scores', JSON.stringify(scores))
  }

  const resetScores = () => {
    setScores([0, 0])
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

    // Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      localStorage.removeItem('board')
      localStorage.removeItem('turn')

      const newScores = [...scores]
      if (newWinner === TURNS.X) newScores[0]++
      else newScores[1]++
      setScores(newScores)

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
      
      <button onClick={resetGame}>Reiniciar Tablero</button>
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
      <div className='scores'> 
        <h2>{scores[0]}</h2>
        <h2>{scores[1]}</h2>
      </div>
      <button onClick={resetScores}>Reiniciar Puntuaciones</button>
        
      <WinnerModal winner={winner}  resetGame={resetGame}/>

      <footer>
        <p>Hecho por Emmanuel Fernández</p>
      </footer>
    </main>
  )
}

export default App
