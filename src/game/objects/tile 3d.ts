import glob from "../../dep/glob.js";

import game_object from "./game object.js";
import sprite3d from "../sprite 3d.js";

export class tile extends game_object {
	constructor(data: game_object_literal) {
		super({
			name: 'a tile 3d',
			...data
		});
		this.data._type = 'tile 3d';
	}
	protected override _create() {
		new sprite3d({
			gobj: this,
			size: [17, 9],
			// image: 'unused',
			_scenePresetDepr: 'hex',
			shapeType: 'hex',
			shapeLiteral: {
				gobj: this,
				type: 'regular',
				hexTexture: './img/textures/beach.jpg',
				size: [8, 20, 10]
			}
		});
		this.sprite?.create();
	}
	/*protected override _delete() {
		console.log('delete');
	}*/
}

export default tile;