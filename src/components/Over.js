import React from 'react'

const Over = ({round}) => {
  return (
    <div className='main-block'>
        <h1>Game over !</h1>
        <h2>Vous avez survécu {round} tour</h2>
        <button className="btn" onClick={() => window.location.reload()}>
          Rejouer
        </button>
    </div>
  )
}

export default Over