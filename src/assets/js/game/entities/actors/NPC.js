/**
 * Created by larken on 7/12/17.
 */
class NPC extends Actor {
    constructor(x,y,id) {
        super(x,y,{
            id: id,
            visible: true,
            blocked: true,
            combat : {
                hostile: false
            }
        });
    }
}