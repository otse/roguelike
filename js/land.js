import tile3d from "./core/objects/tile 3d.js";
import game from "./eye/game.js";
/// generates land
// https://github.com/josephg/noisejs
var land;
(function (land) {
    function init() {
    }
    land.init = init;
    class perlin_area {
        scale;
        // perlin does not repeat but is repeatable
        constructor(seed, scale) {
            this.scale = scale;
            this._set(seed);
        }
        _set(seed) {
            noise.seed(seed);
        }
        get_simplex2(x, y) {
            const point = noise.simplex2(x / this.scale[0], y / this.scale[1]);
            return point;
        }
    }
    function make() {
        // woo
        noise.seed(28); // 1 to 65536
        const gobjs = [];
        const populate = [100, 100];
        const area = new perlin_area(28, [10, 10]);
        for (let y = 0; y < populate[0]; y++) {
            for (let x = 0; x < populate[1]; x++) {
                const point = area.get_simplex2(x, y);
                let tilePreset = 'default';
                if (point < 0) {
                    if (point < -0.6) {
                        tilePreset = 'cobblestone';
                    }
                    else if (point < -0.3) {
                        tilePreset = 'stonemixed';
                    }
                    const tile = new tile3d({
                        _type: 'direct',
                        _wpos: [(-populate[0] / 2) + x, (-populate[1] / 2) + y, 0]
                    }, tilePreset);
                    gobjs.push(tile);
                }
            }
        }
        game.addMerge(gobjs, 1);
    }
    land.make = make;
    function test_fill() {
        const gobjs = [];
        const baseWidth = 100;
        const baseHeight = 100;
        const width = 10;
        const height = 10;
        for (let y = 0; y < baseWidth; y++) {
            for (let x = 0; x < baseHeight; x++) {
                let tilePreset = 'default'; // rome.sample(['default', 'cobblestone', 'stonemixed']);
                const tile = new tile3d({
                    _type: 'direct',
                    _wpos: [(-baseWidth / 2) + x, (-baseHeight / 2) + y, 0]
                }, tilePreset);
                gobjs.push(tile);
            }
        }
        game.addMerge(gobjs, 1);
    }
    land.test_fill = test_fill;
    function make_bodies_of_water() {
        noise.seed(29); // 1 to 65536
    }
    land.make_bodies_of_water = make_bodies_of_water;
})(land || (land = {}));
export default land;
