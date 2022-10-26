import Character from "./Character";

class Rogue extends Character {
    constructor(name) {
      super(name, 250, 10, 1, 10, 100);
      this.type = Character.TYPE_ROGUE;
    }

    sort(){
      this.hp += 0.50*this.hp;
      if(this.hp > this.hpMax){
        this.hp = this.hpMax
      }
    }
}

export default Rogue