import React, { useEffect, useState } from 'react'
import Character from '../class/Character';
import CharacterView from '../components/CharacterView';
import Over from '../components/Over';
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

  const updatePlayer = (newPlayer) =>{
    setData({...data, character: newPlayer})
  }
  
  const updateEnemy = (newEnemy) =>{
    setData({...data, character: newEnemy})
  }

  const play = async (attack) => {
    setIsPlaying(true);
    await data.game.play(attack, updateGame, updatePlayer, updateEnemy);
    setIsPlaying(false);
  }

  if(data.game && data.game.player.hp <= 0){
    return (
      <Over round={data.game.count - 1}/>
    )
  }
    
  return (
    data.game ? (
      <div
        className="game"
        style={{backgroundImage: `url(${require(`../img//world/${data.game.world}.png`)})`}}
      >
        <div id="infos-bloc">
          <div id="spell-bloc">
            <button
              id="spell1"
              className="btn btn-spell flex-center"
              disabled={isPlaying || data.game.player.energie < Character.ENERGIE_CONSUME_SORT}
              onClick={() => play(Character.ATTACK_SORT)}
            >
              <img src={require("../img/icons/beer.png")} alt="potion"></img>
              <div className={`${data.game.player.energie >= Character.ENERGIE_CONSUME_SORT ? "energy-good" : "energy-bad"} flex-center`}>
                <span>
                  {Character.ENERGIE_CONSUME_SORT}
                </span>
              </div>
            </button>
            <button
              id="spell1"
              className="btn btn-spell flex-center"
              disabled={isPlaying || data.game.player.energie < Character.ENERGIE_CONSUME_SPECIAL}
              onClick={() => play(Character.ATTACK_SPECIAL)}
            >
              <img src={require("../img/icons/sword2.png")} alt="potion"></img>
              <div className={`${data.game.player.energie >= Character.ENERGIE_CONSUME_SPECIAL ? "energy-good" : "energy-bad"} flex-center`}>
                <span>
                  {Character.ENERGIE_CONSUME_SPECIAL}
                </span>
              </div>
            </button>
            <button
              id="spell2"
              className="btn btn-spell flex-center"
              disabled={isPlaying || data.game.player.energie < Character.ENERGIE_CONSUME}
              onClick={() => play(Character.ATTACK)}
            >
              <img src={require("../img/icons/sword.png")}  alt="sword"></img>
              <div className={`${data.game.player.energie >= Character.ENERGIE_CONSUME ? "energy-good" : "energy-bad"} flex-center`}>
                <span>
                  {Character.ENERGIE_CONSUME}
                </span>
              </div>
            </button>
            <button
              id="next"
              className="btn btn-spell"
              disabled={isPlaying}
              onClick={() => play(Character.NEXT)}
            >
              Passer
            </button>
          </div>
          <div id="log-bloc">
            <div className='flex-center-column'>
              {data.game.logs ? data.game.logs.slice(-2).map((log, index) => (
                <div key={index}>
                  {log}
                </div>
              )) : null}
            </div>
          </div>
          <div id="counter-bloc">
              <h3>Tour : {data.game.count}</h3>
          </div>
        </div>
        <div id="game-bloc">
            <CharacterView type={data.game.player.type} character={data.game.player} energy />
            <CharacterView type={data.game.enemy.type} character={data.game.enemy} reverse />
        </div>
    </div>
    ): null
  )
}

export default Battle