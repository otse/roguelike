import game_object from "./game object.js";
import sprite3d from "../sprite 3d.js";
import direction_adapter from "../direction adapter.js";
export class wall3d extends game_object {
    directionAdapter;
    constructor(data) {
        super({
            name: 'a wall 3d',
            ...data,
        });
        this.data._type = 'wall 3d';
        // This code runs after _create
        // because the super adds this object to the clod
    }
    _create() {
        this.directionAdapter = new direction_adapter(this);
        // Had to move the DA to the creator, because the super constructor
        // would add the object to the CLOD who would call CREATE
        // before we instantiated our adapter
        new sprite3d({
            gobj: this,
            size: [17 * 3, 9 * 3],
            // image: 'unused',
            _scenePresetDepr: 'wall',
            shapeType: 'wall',
            shapeLiteral: {
                gobj: this,
                type: 'regular',
                texture: './img/textures/cliffs.jpg',
                size: [17, 10, 17]
            }
        });
        this.directionAdapter.search(['wall 3d']);
        this.sprite?.create();
    }
    /*protected override _delete() {
        console.log('delete');
    }*/
    _step() {
        super._step();
        this.sprite?.step();
    }
}
export default wall3d;
