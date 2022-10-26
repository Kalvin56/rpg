import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Character from '../class/Character';

const Home = () => {

  let [name, setName] = useState("");
  let [type, setType] = useState("");
  let history = useHistory();
  
  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleType = (type) => {
    setType(type)
  }
  
  const play = () => {
    if(name){
      localStorage.setItem("character", JSON.stringify({name, type}))
      history.push("/battle");
    }
  }

  return (
    <div>
      <form className="inscription-bloc" onSubmit={play}>
          <h1>Veuillez choisir votre Personnage</h1>
          <div className="flex-center">
              <div
                className={`perso-select__card ${type === Character.TYPE_MAGE ? "active" : ""}`}
                onClick={() => handleType(Character.TYPE_MAGE)}
              >
                <div>
                    <img src={require(`../img/mage/idle.gif`)} alt="animation" className="animation-small"/>
                </div>
              </div>
              <div
                className={`perso-select__card ${type === Character.TYPE_KNIGHT ? "active" : ""}`}
                onClick={() => handleType(Character.TYPE_KNIGHT)}
              >
                <div>
                    <img src={require(`../img/knight/idle.gif`)} alt="animation" className="animation-small"/>
                </div>
              </div>
          </div>
          <input
            type="text"
            className="input-form"
            placeholder='Nom du perso'
            onChange={(e) => handleName(e)}
            required
          />
          <input type="submit" className="btn" onClick={play} value="Jouer"/>
      </form>
    </div>
  )
}

export default Home