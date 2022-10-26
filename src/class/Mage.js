import Character from "./Character";

class Mage extends Character {
    constructor(name) {
      super(name, 150, 50, 1, 10, 100);
      this.type = Character.TYPE_MAGE;
    }

    sort(){
      this.hp += 0.50*this.hp;
      if(this.hp > this.hpMax){
        this.hp = this.hpMax
      }
    }
}

export default Mage