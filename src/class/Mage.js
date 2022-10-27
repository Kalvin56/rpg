import Character from "./Character";

class Mage extends Character {
    constructor(name) {
      super(name, 200, 50, 1, 10, 100);
      this.type = Character.TYPE_MAGE;
    }

    sort(){
      this.hp += 2*this.hp;
      if(this.hp > this.hpMax){
        this.hp = this.hpMax
      }
      return "Regain santé + 200%"
    }
}

export default Mage