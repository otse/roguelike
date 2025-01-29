
import game_object from "./game object.js";
import sprite3d from "../sprite 3d.js";
import glob from "../../dep/glob.js";
import direction_adapter from "../direction adapter.js";

export class wall3d extends game_object {
	directionAdapter: direction_adapter
	declare sprite?: sprite3d // why declare

	constructor(data: game_object_literal) {
		super({
			name: 'a wall 3d',
			...data,
		});
		this.data._type = 'wall 3d';
		this.directionAdapter = new direction_adapter(this);
	}
	protected override _create() {
		new sprite3d({
			gabeObject: this,
			size: [34, 34],
			name: 'unused',
			_scenePresetDepr: 'wall',
			shapeType: 'wall',
			shapeLiteral: {
				gabeObject: this,
				type: 'regular',
				texture: './img/textures/cobblestone2.jpg',
				size: [17, 10, 17]
			}
		});
		this.directionAdapter.search(['wall 3d']);
		this.sprite?.create();
	}
	/*protected override _delete() {
		console.log('delete');
	}*/
	protected override _step() {
		super._step();
		this.sprite?.step();
	}
}

export default wall3d;