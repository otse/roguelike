
import game_object from "./game object.js";
import tile from "./tile.js";
import wall from "./wall.js";

// Objects come in as data from the network
// It is friendlier to use string types than import a large number of class files

export function gameObjectMaker(data: game_object_literal): game_object | undefined {
	let gobj: game_object | undefined;
	switch (data._type) {
		case 'dud':
		case 'direct':
			console.warn(' unset type passed to factory ');
			break;
		case 'tile':
			gobj = new tile(data);
			break;
		case 'wall':
			gobj = new wall(data);
			break;
	}
	return gobj;
}

export default gameObjectMaker;