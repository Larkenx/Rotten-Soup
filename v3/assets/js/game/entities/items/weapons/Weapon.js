/**
 * Created by Larken on 6/22/2017.
 */
class Weapon extends Item {

    constructor(x, y, options) {
        if (options.combat === null) throw `Error - no options.combat property defined. Bad weapon creation for ${options.name}`;
        options.visible = true;
        options.blocked = false;
        options.combat.equippable = true;
        options.combat.equipped = false;
        options.originalfg = options.fg;
        super(x, y, options);
        this.cb = this.options.combat;
    }

    use() {
        Game.player.equipWeapon(this);
    }

    roll() {
        let dmg = 0;
        for (let i = 0; i < this.cb.rolls; i++) {
            dmg += getRandomInt(1, this.cb.sides);
        }
        return dmg;
    }

    /* Returns this weapon's damage stats */
    damageInfo() {
        return `Damage ${this.cb.rolls}-${this.cb.sides*this.cb.rolls}`
    }
}