import game_object from "./game object.js";
import sprite from "../sprite.js";
// Legacy just use wall 3d
export class wall extends game_object {
    constructor(data) {
        super({
            name: 'a wall',
            ...data,
        });
        this.data._type = 'wall';
    }
    _create() {
        new sprite({
            gobj: this,
            bottomSort: true,
            size: [17, 21],
            image: 'hex/wall.png',
            color: 'blue'
        });
        this.sprite?.create();
    }
}
export default wall;
