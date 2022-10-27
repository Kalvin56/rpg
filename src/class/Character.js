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
    static ANIMATION_SORT = "sort";

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
      this.power = power + ((xp-1)*10);
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
      if(dammage >= this.hp){
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

    async tackle(enemy, attackType, updateCharacter){
      let logs = [];

      // puissance de l'attaque
      let power = attackType === Character.ATTACK_SPECIAL ? this.power*Character.ATTACK_SPECIAL_MULTIPLICATE : this.power

      // vérification énergie suffisante
      let energieNeed = this.energieNeed(attackType);
      if(energieNeed > this.energie && attackType !== Character.NEXT){
        logs.push(`
          [${this.name}] Energie insuffisante
        `);
        return logs;
      }

      if(attackType === Character.NEXT){
        // PASSER -> augmentation de l'énergie
        this.winEnergie(Character.ENERGIE_RETRIEVE)
        logs.push(`
          [${this.name}] Energie +${Character.ENERGIE_RETRIEVE}
        `)
      }else if(attackType === Character.ATTACK_SORT){
        // SORT -> sort propre à chaque personnage
        // MAGE -> augmentation de la santé
        // KNIGHT -> augmentation de la puissance
        let log = this.sort();
        logs.push(`
          [${this.name}] ${log}
        `)
        this.animation = Character.ANIMATION_SORT;
        await sleep(1000);
        // Perte énergie
        this.lostEnergie(Character.ENERGIE_CONSUME_SORT)
      }else{
        // ATTAQUE NORMALE OU ATTAQUE SPECIALE
        this.animation = this.getAnimation(attackType)
        enemy.animation = Character.ANIMATION_HIT
        updateCharacter(this);
        await sleep(2500);
        enemy.lostHp(power);
        logs.push(`[${this.name}] Attaque (${power} dégats)`);
        this.animation = Character.ANIMATION_IDLE
        if(enemy.state !== Character.STATE_DIE){
          enemy.animation = Character.ANIMATION_IDLE
        }else{
          logs.push(`[${enemy.name}] Mort`);
          this.xpUpgrade();
        }
        // Perte énergie
        if(attackType === Character.ATTACK_SPECIAL){
          this.lostEnergie(Character.ENERGIE_CONSUME_SPECIAL)
        }else{
          this.lostEnergie(Character.ENERGIE_CONSUME)
        }
      }
      updateCharacter(this);
      return logs;
    }
}

export default Character