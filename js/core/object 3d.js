import game from "../eye/game.js";
import tileform from "./tileform.js";
;
export class object3d {
    data;
    gobj;
    shape;
    data_;
    constructor(data) {
        this.data = data;
        let groundData = game.groundPresets[data.gobj.object3dmerge?.groundPreset || data.groundPreset];
        this.data = {
            ...data,
            ...groundData,
            ...data.gobj.object3dmerge
        };
        this.gobj = this.data.gobj;
        this.gobj.object3d = this;
    }
    delete() {
        this.shape?.delete();
    }
    create() {
        this.shape = tileform.shapeMaker(this.data.shapeType, this.data);
        this.shape?.create();
    }
    step() {
        this.shape?.step();
    }
}
// this data should be owned by the game
// and maybe attached to glob. or us a hooks?
export default object3d;
