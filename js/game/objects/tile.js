import game_object from "./game object.js";
import sprite from "../sprite.js";
// Legacy just use tile 3d
export class tile extends game_object {
    constructor(data) {
        super({
            name: 'a tile',
            ...data
        });
        this.data._type = 'tile';
        this._create();
    }
    _create() {
        new sprite({
            gabeObject: this,
            size: [17, 9]
        });
        this.sprite?.create();
    }
    _delete() {
        console.log('hiiide');
    }
}
export default tile;
