import glob from "../dep/glob.js";
import pts from "../dep/pts.js";
import pipeline from "./pipeline.js";
import sprite from "./sprite.js";
import tileform from "./tileform.js";
;
export class sprite3d extends sprite {
    rerender = true;
    target;
    shape3d;
    data_; // Hack
    constructor(data) {
        super({
            shapeType: 'nothing',
            shapeLiteral: {
                hexTexture: '',
                texture: '',
                size: [0, 0]
            },
            ...data
        });
        this.data_ = this.data;
    }
    _create() {
        super._create();
        this.shape3d = tileform.shapeMaker(this.data_.shapeType, this.data_.shapeLiteral);
        this.shape3d?.create();
        this.prerender();
    }
    _step() {
        super._step();
        this.shape3d?.step();
        this.prerender();
    }
    prerender() {
        if (!this.rerender && !glob.rerender) // If both are false
            return;
        this._make_target();
        this._render();
        this.material.map = this.target.texture;
        this.material.needsUpdate = true;
        this.rerender = false;
    }
    _make_target() {
        let { size } = this.data;
        size = pts.mult(size, glob.scale);
        this.target = pipeline.makeRenderTarget(size[0], size[1]);
    }
    _render() {
        tileform.stage.prepare(this);
        tileform.stage.render();
    }
}
export default sprite3d;
