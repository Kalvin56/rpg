import React from 'react'

const CharacterView = ({type, character, energy, reverse}) => {
  return (
    <div id="character-bloc">
        <div className='character-infos'>
            <div id="character-hp__container">
                <div id="character-hp" style={{width : `${(character.hp / character.hpMax) * 100}%`}}></div>
            </div>
            {energy ? (
                <div id="character-energy__container">
                    <div id="character-energy" style={{width : `${character.energie}%`}}></div>
                </div>
            ) : null}
            <div className='flex-center'>
                <h2>{character.name}</h2>
                <div className='xp flex-center'>
                    <h3>{character.xp}</h3>
                </div>
            </div>
        </div>
        <div>
            <img src={require(`../../img/${type}/${character.animation}.gif`)} alt="animation" className={`animation ${reverse ? "reverse" : ""}`}/>
        </div>
    </div>
  )
}

export default CharacterView