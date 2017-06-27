/**
 * Created by Larken on 6/22/2017.
 */
class Goblin extends Actor {
    constructor(x, y) {
        super(x, y, {
            name: "goblin",
            description: "A mean, green goblin!",
            symbol: "g",
            fg: "darkgreen",
            bg: "seagreen",
            visible: true,
            blocked: true,
            chasing: false,
            combat: {
                /* options.combat, dedicated to all things related to combat */
                description: [" attacked "],
                /* max stats */
                maxhp: 10,
                maxmana: 5,
                /* current stats */
                hp: 10,
                mana: 5,
                str: 7,
                def: 1,
                /* misc */
                hostile: true,
                range: 6,
                invulnerable: false,
            }
        });
        let roll = getRandomInt(1,10);
        if (roll <= 2)
            this.addToInventory(createSword(this.x, this.y));
    }

    act() {
        super.act();
        Game.engine.lock();
        if (this.distanceTo(Game.player) < 9) {
            if (!this.chasing) Game.log('A goblin sees you.', 'alert');
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
        if (actor === Game.player) this.attack(actor);
    }

}