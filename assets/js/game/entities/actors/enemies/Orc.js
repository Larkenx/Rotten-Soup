/**
 * Created by Larken on 7/5/2017.
 */
class Orc extends Actor {
    constructor(x, y, id, empowered=false) {
        super(x, y, {
            id: id,
            name: "orc",
            description: "All bronze and no brains!",
            visible: true,
            blocked: true,
            chasing: false,
            combat: {
                /* options.combat, dedicated to all things related to combat */
                description: [" attacked "],
                /* max stats */
                maxhp: 30,
                maxmana: 5,
                /* current stats */
                hp: 30,
                mana: 5,
                str: 20,
                def: 1,
                /* misc */
                hostile: true,
                range: 5,
                invulnerable: false,
                empowered: empowered,
            }
        });
        let roll = getRandomInt(1,10);
        if (roll <= 2)
            this.addToInventory(new Sword(this.x, this.y, 3, 7, "Thrasher", 33));
    }

    act() {
        super.act();
        Game.engine.lock();
        if (this.distanceTo(Game.player) < 9) {
            if (!this.chasing) {
                let msg = this.cb.empowered ? 'An empowered orc sees you.' : 'An orc sees you.';
                Game.log(msg, 'alert');
            }

            this.chasing = true;
            let pathToPlayer = [];
            Game.player.path.compute(this.x, this.y, function (x, y) {
                pathToPlayer.push([x, y]);
            });
            if (pathToPlayer.length >= 2) {
                let newPos = pathToPlayer[1]; // 1 past the current position
                this.tryMove(newPos[0], newPos[1]);
            }
        }
        Game.engine.unlock();
    }

    interact(actor) {
        if (actor === Game.player) {
            let dmg = this.attack(actor);
            if (this.cb.empowered) {
                let amtHealed = Math.floor(dmg / 2);
                Game.log(`The empowered orc steals your health and regenerates ${amtHealed} health!`, "alert");
                this.heal(amtHealed);
            }
        }

    }

}