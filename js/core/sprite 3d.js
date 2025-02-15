import glob from "../dep/glob.js";
import pts from "../dep/pts.js";
import pipeline from "./pipeline.js";
import sprite from "./sprite.js";
import tileform from "./tileform.js";
;
export class sprite3d extends sprite {
    rerender;
    target;
    shape3d;
    data_;
    constructor(data) {
        super({
            shapeType: 'nothing',
            shapeTexture: './img/textures/stonemixed.jpg',
            shapeGroundTexture: './img/textures/overgrown.jpg',
            shapeSize: [10, 10],
            bottomSort: false,
            ...data
        });
        this.data_ = this.data;
        this.rerender = true;
    }
    _delete() {
        super._delete();
        this.shape3d?.delete();
    }
    _create() {
        super._create();
        this.shape3d = tileform.shapeMaker(this.data_.shapeType, this.data_);
        this.shape3d?.create();
        this._make_target();
        this.prerender();
    }
    _step() {
        super._step();
        this.shape3d?.step();
        this.prerender();
    }
    prerender() {
        // If both are false guard
        if (!this.rerender && !glob.rerender)
            return;
        this._render();
        this.material.map = this.target.texture;
        this.material.needsUpdate = true;
        this.rerender = false;
    }
    _make_target() {
        let { spriteSize } = this.data;
        spriteSize = pts.mult(spriteSize, glob.scale);
        this.target = pipeline.makeRenderTarget(spriteSize[0], spriteSize[1]);
    }
    _render() {
        tileform.stage.prepare(this);
        tileform.stage.render();
    }
}
export default sprite3d;
