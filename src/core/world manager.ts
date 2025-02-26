import pan from "./components/pan.js";
import clod from "./clod.js";
import game_object from "./objects/game object.js";
import sprite3d from "./sprite 3d.js";
import glob from "../dep/glob.js";

/// 🌍 WorldManager (clean and direct)

enum mergeMode {
	dont = 0, merge, replace
}

class world_manager {
	static world: clod.world;

	static init() {
		this.world = clod.init();
		glob.world = this.world;
	}

	static update() {
		this.world.update(pan.wpos);
	}

	static repopulate() {

	}

	static getObjectsAt(target: game_object) {
		const { wpos: pos } = target;
		return world_manager.world.chunkatwpos(pos).objectsatwpos(pos) as game_object[];
	}

	static addGobj(gobj: game_object) {
		clod.add(world_manager.world, gobj);
	}

	static removeGobj(gobj: game_object) {
		clod.remove(gobj);
	}

	// These are the most normal mergers,
	// like when you put a wall on a tile,
	// or a tile on a wall
	static merge_ideally(target: game_object) {
		let objects = this.getObjectsAt(target);
		let needsAdding = false;
		for (let object of objects) {
			// Rare situation where we want to adapt a wall 3d to a tile 3d
			if (
				object.data._type == 'wall 3d' &&
				target.data._type == 'tile 3d'
			) {
				object.sprite3dliteral = {
					...object.sprite3dliteral!,
					groundPreset: target.sprite3dliteral?.groundPreset,
				};
				console.log(' water! ', object.data._type, target.data._type);
				needsAdding = true;
			}
			// When we put a wall 3d onto a tile 3d
			// but want to keep the ground
			else if (
				object.data._type == 'tile 3d' &&
				target.data._type == 'wall 3d'
			) {
				target.sprite3dliteral = {
					...target.sprite3dliteral!,
					groundPreset: object.sprite3dliteral?.groundPreset,
				};
				clod.remove(object);
				needsAdding = false;
			}
			else if (
				object.data._type == 'wall' ||
				object.data._type == 'tile'
			) {
				needsAdding = true;
			}
		}
		if (!needsAdding) {
			clod.addWait(world_manager.world, target);
		}
	}

	static _replace(target: game_object) {
		const objects = this.getObjectsAt(target);
		for (const gobj of objects) {
			clod.remove(gobj);
		}
		clod.addWait(world_manager.world, target);
	}

	// To merge means to respect what's already there

	static addMergeLot(gobjs: game_object[], mode: mergeMode | number) {
		// wall3ds render both walls and hex tiles at the same time
		// this saves a render but requires this merge function
		for (const gobj of gobjs) {
			if (mode === mergeMode.merge)
				this.merge_ideally(gobj);
			else if (mode === mergeMode.replace)
				this._replace(gobj);
			else if (mode === mergeMode.dont)
				clod.addWait(world_manager.world, gobj);
		}
		// Now show
		for (const gobj of gobjs) {
			if (gobj.chunk?.active)
				gobj.show();
		}
	}
}

export default world_manager;