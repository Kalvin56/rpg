import Character from "./Character";

class Rogue extends Character {
    constructor(xp=1) {
      const NAMES = ["Apophis", "Ammit", "Demon", "Amut", "Mummy", "Duat", "Phoenix"]
      let name = NAMES[Math.floor(Math.random()*NAMES.length)]
      super(name, 100, 50, xp, 10, 100);
      this.type = Character.TYPE_ROGUE;
    }
}

export default Rogue