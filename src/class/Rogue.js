import Character from "./Character";

class Rogue extends Character {
    constructor(name, xp=1) {
      super(name, 250, 10, xp, 10, 100);
      this.type = Character.TYPE_ROGUE;
    }
}

export default Rogue