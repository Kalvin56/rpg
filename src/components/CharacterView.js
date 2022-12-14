import React from 'react'
import Character from '../class/Character'

const CharacterView = ({type, character, energy, reverse}) => {

  const getAnimation = (animation) => {
    if(animation === Character.ANIMATION_SORT){
        return "idle"
    }
    return animation
  }

  return (
    <div id="character-bloc">
        <div className='character-infos'>
            <div className='flex-center-column'>
                <div id="character-hp__container">
                    <div id="character-hp" style={{width : `${(character.hp / character.hpMax) * 100}%`}}></div>
                </div>
                {energy ? (
                    <div id="character-energy__container">
                        <div id="character-energy" style={{width : `${character.energie}%`}}></div>
                    </div>
                ) : null}
            </div>
            <div className='flex-center'>
                <h2>{character.name}</h2>
                <div className='xp flex-center'>
                    <h3>{character.xp}</h3>
                </div>
            </div>
            <div className='flex-center'>
                <div className='flex-center'>
                    <img
                        src={require("../img/icons/barbell.png")}
                        alt="barbell"
                        height={24}
                    />
                    <h3>{character.power}</h3>
                </div>
                <div className='flex-center'>
                    <img
                        src={require("../img/icons/heart.png")}
                        alt="heart"
                        height={24}
                    />
                    <h3>{character.hpMax}</h3>
                </div>
            </div>
        </div>
        <div className={character.animation === Character.ANIMATION_SORT ? "potion" : ""}>
            <img src={require(`../img/${type}/${getAnimation(character.animation)}.gif`)} alt="animation" className={`animation ${reverse ? "reverse" : ""}`}/>
        </div>
    </div>
  )
}

export default CharacterView