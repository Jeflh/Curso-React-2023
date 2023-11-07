import React from 'react'
import Square from './Square.jsx'
const WinnerModal = ({ winner, resetGame}) => {
  if (winner === null) return null

  const winnerText = winner === false ? 'Empate' : `El ganador es:`
  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>

        <header className='win'>
          {winner &&  <Square>{winner}</Square>}
        </header>

        <footer>
          <button onClick={resetGame}>Jugar de nuevo</button>
        </footer>
      </div>
    </section>
  )
}

export default WinnerModal