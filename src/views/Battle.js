import React, { useEffect, useState } from 'react'
import Character from '../class/Character';
import CharacterView from '../class/components/CharacterView';
import Game from '../class/Game';

const Battle = () => {  

  let [data, setData] = useState({
    game : null,
  });

  let [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let characterStore = JSON.parse(localStorage.getItem("character"));
    setData({game: new Game(characterStore.type, characterStore.name)})
  },[])

  const updateGame = (newGame) =>{
    setData(newGame)
  }

  const updateCharacter = (newCharacter) =>{
    setData({...data, character: newCharacter})
  }
  
  const updateMonster = (newMonster) =>{
    setData({...data, character: newMonster})
  }

  const play = async (attack) => {
    setIsPlaying(true);
    await data.game.play(attack, updateGame, updateCharacter, updateMonster);
    setIsPlaying(false);
  }
    
  return (
    data.game ? (
      <div className="game" id="game">
        <div id="infos-bloc">
          {!isPlaying ? (
            <div id="spell-bloc">
              <button id="spell1" className="btn btn-spell" onClick={() => play(Character.ATTACK_SORT)} ><img src={require("../img/potion.png")} alt="potion"></img>
              </button>
              <button id="spell1" className="btn btn-spell" onClick={() => play(Character.ATTACK_SPECIAL)} ><img src={require("../img/potion.png")} alt="potion"></img>
              </button>
              <button id="spell2" className="btn btn-spell" onClick={() => play(Character.ATTACK)}><img src={require("../img/sword.png")}  alt="sword"></img>
              </button>
              <button id="next" className="btn btn-spell" onClick={() => play(Character.NEXT)}>Passer</button>
            </div>
          ) : null}
          <div id="log-bloc">
              <p>
                {data.game.logs ? data.game.logs.map((log) => (
                  log
                )) : null}
              </p>
          </div>
          <div id="counter-bloc">
              {data.game.count}
          </div>
        </div>
        <div id="game-bloc">
            <CharacterView type={data.game.character.type} character={data.game.character} energy />
            <CharacterView type={data.game.monster.type} character={data.game.monster} reverse />
        </div>
    </div>
    ): null
  )
}

export default Battle