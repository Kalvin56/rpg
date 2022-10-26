import Character from "./Character";

class Knight extends Character {
    constructor(name) {
      super(name, 100, 150, 1, 10, 100)
      this.type = Character.TYPE_KNIGHT
    }

    sort(){
      this.power += 0.20*this.power;
      return "Puissance + 20%"
    }
}

export default Knight