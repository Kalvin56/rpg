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
    localStorage.setItem("character", JSON.stringify({name, type}))
    history.push("/battle");
  }

  return (
    <div>
      <div id="inscription-bloc">
          <h1>Veuillez choisir votre Personnage</h1>
          <input type="text" id="persoName" placeholder='Nom du perso' onChange={(e) => handleName(e)} />
          <div id="perso-select__container">
              <div  className={`perso-select__card animAttack ${type === Character.TYPE_MAGE ? "active" : ""}`} onClick={() => handleType(Character.TYPE_MAGE)}>
              </div>
              <div id="type2" className={`perso-select__card animAttack3 ${type === Character.TYPE_KNIGHT ? "active" : ""}`} onClick={() => handleType(Character.TYPE_KNIGHT)}>
              </div>
          </div>
          <button className="btn" onClick={play}>Jouer</button>
      </div>
    </div>
  )
}

export default Home