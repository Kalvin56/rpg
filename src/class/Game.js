import { sleep } from "../functions/functions";
import Character from "./Character";
import Knight from "./Knight";
import Mage from "./Mage";
import Rogue from "./Rogue";

class Game {

    XP_STEP = [
      {number: 2, world: 2, xpDefaults: 3},
      {number: 5, world: 3, xpDefaults: 6},
      {number: 10, world: 3, xpDefaults: 10},
    ]

    constructor(type, name) {
      this.character = this.generateCharacter(type, name);
      this.monster = new Rogue();
      this.count = 1;
      this.logs = [];
      this.xpDefaults = 1;
      this.world = 1;
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

    changeWorld(){
      let xpCharacter = this.character.xp
      this.XP_STEP.forEach((step) => {
        if(xpCharacter >= step.number && this.xpDefaults !== step.xpDefaults){
          this.xpDefaults = step.xpDefaults
          this.world = step.world
        }
      })
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
        this.count++;
        this.changeWorld();
        this.monster = new Rogue(this.xpDefaults)
        updateGame({game: this})
      }
    }
}

export default Game