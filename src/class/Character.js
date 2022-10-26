import { sleep } from "../functions/functions";

class Character {

    static TYPE_MAGE = "mage";
    static TYPE_KNIGHT = "knight";
    static TYPE_ROGUE = "rogue";

    static ATTACK_SPECIAL = 0;
    static ATTACK = 1;
    static NEXT = 2;
    static ATTACK_SORT = 3;

    static ANIMATION_IDLE = "idle";
    static ANIMATION_ATTACK = "attack";
    static ANIMATION_HIT = "hit";
    static ANIMATION_ATTACK_SPECIAL = "attack2";
    static ANIMATION_DEATH = "death";

    static ENERGIE_CONSUME = 10;
    static ENERGIE_CONSUME_SPECIAL = 30;
    static ENERGIE_CONSUME_SORT = 30;
    static ENERGIE_RETRIEVE = 50;
    static ATTACK_SPECIAL_MULTIPLICATE = 2;

    static STATE_ALIVE = 1;
    static STATE_DIE = 2;

    constructor(name, hpMax, power, xp, xpMax, energie, animation="idle", state=Character.STATE_ALIVE) {
      this.name = name;
      this.hp = hpMax;
      this.hpMax = hpMax;
      this.power = power;
      this.xp = xp;
      this.xpMax = xpMax;
      this.energie = energie;
      this.animation = animation;
      this.state = state;
    }

    xpUpgrade(){
      if(this.xp < this.xpMax){
        this.xp++
        this.power += 10
      }
    }

    lostHp(dammage){
      if(dammage > this.hp){
        this.hp = 0
        this.state = Character.STATE_DIE
        this.animation = Character.ANIMATION_DEATH
      }else{
        this.hp -= dammage
      }
    }

    lostEnergie(nb){
      if(this.energie - nb < 0){
        this.energie = 0
      }else{
        this.energie -= nb
      }
    }

    winEnergie(nb){
      if(this.energie + nb > 100){
        this.energie = 100
      }else{
        this.energie += nb
      }
    }

    getAnimation(attackType){
      switch (attackType) {
        case Character.ATTACK_SPECIAL:
          return Character.ANIMATION_ATTACK_SPECIAL
        case Character.ATTACK:
          return Character.ANIMATION_ATTACK
        default:
          return Character.ANIMATION_ATTACK
      }
    }

    energieNeed(attackType){
      switch (attackType) {
        case Character.ATTACK_SPECIAL:
          return Character.ENERGIE_CONSUME_SPECIAL
        case Character.ATTACK:
          return Character.ENERGIE_CONSUME
        case Character.ATTACK_SORT:
          return Character.ENERGIE_CONSUME_SORT
        default:
          return Character.ENERGIE_CONSUME
      }
    }

    async tackle(ennemy, attackType, updateCharacter){
      let logs = [];
      let energieNeed = this.energieNeed(attackType);
      if(energieNeed > this.energie){
        logs.push(`[${this.name}] - Energie insuffisante`);
        return logs;
      }
      let power = attackType === Character.ATTACK_SPECIAL ? this.power*Character.ATTACK_SPECIAL_MULTIPLICATE : this.power
      if(attackType === Character.NEXT){
        this.winEnergie(Character.ENERGIE_RETRIEVE)
        logs.push(`[${this.name}] - Energie + ${Character.ENERGIE_RETRIEVE}`)
      }else if(attackType === Character.ATTACK_SORT){
        this.sort();
      }else{
        this.animation = this.getAnimation(attackType)
        ennemy.animation = Character.ANIMATION_HIT
        updateCharacter(this);
        await sleep(2500);
        ennemy.lostHp(power);
        logs.push(`[${ennemy.name}] - ${power} dégats`);
        this.animation = Character.ANIMATION_IDLE
        if(ennemy.state !== Character.STATE_DIE){
          ennemy.animation = Character.ANIMATION_IDLE
        }else{
          logs.push(`[${ennemy.name}] - Mort`);
          this.xpUpgrade();
        }
      }
      this.lostEnergie(Character.ENERGIE_CONSUME)
      updateCharacter(this);
      return logs;
    }
}

export default Character