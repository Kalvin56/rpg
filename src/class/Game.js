import { sleep } from "../functions/functions";
import Character from "./Character";
import Knight from "./Knight";
import Mage from "./Mage";
import Monster from "./Monster";
import Rogue from "./Rogue";

class Game {

    constructor(type, name) {
      this.character = this.generateCharacter(type, name);
      this.monster = new Rogue("Bertrand");
      this.count = 0;
      this.logs = [];
    }

    generateCharacter(type, name){
      switch (type) {
        case Character.TYPE_KNIGHT:
          return new Knight(name)
        case Character.TYPE_MAGE:
          return new Mage(name)
        default:
          return new Knight(name)
      }
    }

    addLogs(logs){
      logs.forEach(log => {
        this.logs.push(log)
      });
    }

    async play(attackType, updateGame, updateCharacter, updateMonster){
      // attaque character
      let logs = await this.character.tackle(this.monster, attackType, updateCharacter);
      this.addLogs(logs);
      updateGame({game: this})

      await sleep(1000);

      if(this.monster.state !== Character.STATE_DIE){
        // attaque monstre
        logs = await this.monster.tackle(this.character, Character.ATTACK, updateMonster)
        this.addLogs(logs);
        this.count++;
        updateGame({game: this})
      }else{
        this.monster = new Monster("Le nouveau monstre")
      }
    }
}

export default Game