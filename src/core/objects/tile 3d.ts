import glob from "../../dep/glob.js";

import game_object from "./game object.js";
import sprite3d from "../sprite 3d.js";

export class tile3d extends game_object {
	preset
	constructor(data: game_object_literal, preset = 'default') {
		super({
			name: 'a tile 3d',
			...data
		});
		this.preset = presets[preset] || presets['default'];
		this.data._type = 'tile 3d';
	}
	protected override _create() {
		new sprite3d({
			...this.preset,
			gobj: this,
			spriteSize: glob.hexSize,
			shapeSize: [1, 1, 1],
			shapeType: 'hex',
		});
		this.sprite?.create();
	}
	/*protected override _delete() {
		console.log('delete');
	}*/
}

const presets: { [index: string]: sprite3d.literaltype } = {
	default: {
		gobj: {} as any,
		shapeGroundTexture: './img/textures/beach.jpg',
		shapeGroundTextureNormal: './img/textures/beachnormal.jpg',
	},
	stonemixed: {
		gobj: {} as any,
		shapeGroundTexture: './img/textures/stonemixed2.jpg',
		shapeGroundTextureNormal: './img/textures/stonemixed2normal.jpg',
	},
	cobblestone: {
		gobj: {} as any,
		shapeGroundTexture: './img/textures/cobblestone3.jpg',
		shapeGroundTextureNormal: './img/textures/cobblestone3normal.jpg',
	}
}

export default tile3d;