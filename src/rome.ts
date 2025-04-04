import app from "./app.js";
import { hooks } from "./dep/hooks.js";
import pipeline from "./core/pipeline.js";
import tileform from "./core/tileform.js";
import tile from "./core/objects/tile.js";
import tile3d from "./core/objects/tile 3d.js";
import wall from "./core/objects/wall.js";
import wall3d from "./core/objects/wall 3d.js";
import sprite from "./core/sprite.js";

import zoom from "./core/components/zoom.js";
import pan from "./core/components/pan.js";
import game_object from "./core/objects/game object.js";
import clod from "./core/clod.js";
import glob from "./dep/glob.js";
import land from "./eye/land.js";
import romanlike from "./eye/romanlike.js";
import light from "./core/objects/light.js";
import pts from "./dep/pts.js";
import game from "./eye/game.js";
import world_manager from "./core/world manager.js";

namespace rome {

	export function sample(a) {
		return a[Math.floor(Math.random() * a.length)];
	}

	export function clamp(val, min, max) {
		return val > max ? max : val < min ? min : val;
	}

	export async function init() {
		console.log(' init ');
		glob.rome = rome;
		glob.reprerender = true;
		glob.dirtyObjects = true;
		glob.randomSpriteColor = false;
		glob.scale = 1;
		glob.hexSize = [17, 9];
		glob.gameobjects = [0, 0];
		await preload_basic_textures();
		await pipeline.init();
		await tileform.init();
		romanlike.init();
		world_manager.init();
		game.init();
		app;
		makeTestingChamber();
		zoom.register();
		pan.register();
		// new sprite({ size: [12, 8] });
		// What might this do
	}

	async function preload_basic_textures() {
		await pipeline.preloadTextureAsync('./img/hex/tile.png', 'nearest');
		await pipeline.preloadTextureAsync('./img/hex/wall.png', 'nearest');
		await pipeline.preloadTextureAsync('./img/hex/post.png', 'nearest');
	}

	let gameObjects: game_object[] = []

	export function makeTestingChamber() {
		let gobjs: game_object[] = [];
		function collect(gobj: game_object) {
			gobjs.push(gobj);
			gameObjects.push(gobj);
		}
		collect(new tile3d({ _type: 'direct', colorOverride: 'pink', _wpos: [-1, 0, 0] }, 'cobblestone'));
		collect(new tile3d({ _type: 'direct', colorOverride: 'salmon', _wpos: [-1, -1, 0] }));
		collect(new tile3d({ _type: 'direct', colorOverride: 'cyan', _wpos: [0, -1, 0] }));
		collect(new tile3d({ _type: 'direct', colorOverride: 'yellow', _wpos: [-1, 1, 0] }));
		collect(new tile3d({ _type: 'direct', colorOverride: 'yellow', _wpos: [0, 1, 0] }));
		collect(new tile3d({ _type: 'direct', colorOverride: 'salmon', _wpos: [0, 2, 0] }));
		collect(new tile3d({ _type: 'direct', colorOverride: 'yellow', _wpos: [0, 3, 0] }));
		collect(new tile3d({ _type: 'direct', colorOverride: 'orange', _wpos: [0, 4, 0] }));
		collect(new tile3d({ _type: 'direct', colorOverride: 'red', _wpos: [0, 5, 0] }));
		collect(new tile3d({ _type: 'direct', colorOverride: 'blue', _wpos: [0, 6, 0] }));
		collect(new tile3d({ _type: 'direct', colorOverride: 'wheat', _wpos: [0, 7, 0] }));
		collect(new tile3d({ _type: 'direct', colorOverride: 'lavender', _wpos: [0, 8, 0] }));
		collect(new tile3d({ _type: 'direct', colorOverride: 'cyan', _wpos: [0, 9, 0] }));
		/*collect(new tile({ _type: 'direct', colorOverride: 'orange', _wpos: [1, -1, 0] }));
		collect(new tile({ _type: 'direct', colorOverride: 'red', _wpos: [0, 0, 0] }));
		collect(new tile({ _type: 'direct', colorOverride: 'pink', _wpos: [1, 0, 0] }));
		collect(new tile({ _type: 'direct', colorOverride: 'blue', _wpos: [0, 1, 0] }));
		collect(new tile({ _type: 'direct', _wpos: [1, 1, 0] }));
		collect(new tile({ _type: 'direct', _wpos: [0, 2, 0] }));
		collect(new tile({ _type: 'direct', _wpos: [1, 0, 0] }));
		collect(new tile({ _type: 'direct', _wpos: [2, 0, 0] }));
		collect(new tile({ _type: 'direct', _wpos: [3, 0, 0] }));
		collect(new tile({ _type: 'direct', _wpos: [4, 0, 0] }));
		collect(new tile({ _type: 'direct', _wpos: [5, 0, 0] }));
		collect(new tile({ _type: 'direct', _wpos: [6, 0, 0] }));
		collect(new tile({ _type: 'direct', _wpos: [7, 0, 0] }));*/
		collect(new wall3d({ _type: 'direct', colorOverride: 'green', _wpos: [2, 1, 0] }));
		collect(new wall3d({ _type: 'direct', colorOverride: 'lavender', _wpos: [2, 3, 0] }));
		collect(new wall3d({ _type: 'direct', colorOverride: 'magenta', _wpos: [3, 1, 0] }));
		collect(new wall3d({ _type: 'direct', colorOverride: 'pink', _wpos: [3, 2, 0] }));
		collect(new wall3d({ _type: 'direct', colorOverride: 'blue', _wpos: [3, 3, 0] }));
		collect(new wall3d({ _type: 'direct', colorOverride: 'red', _wpos: [4, 3, 0] }));
		collect(new wall3d({ _type: 'direct', colorOverride: 'purple', _wpos: [5, 3, 0] }));
		// collect(new tile({ _type: 'direct', _wpos: [4, 2, 0] }));
		collect(new light({ _type: 'direct', _wpos: [2, 2, 0] }));
		collect(new light({ _type: 'direct', _wpos: [-11, 6, 0] }));
		collect(new light({ _type: 'direct', _wpos: [9, 2, 0] }));
		collect(new wall3d({ _type: 'direct', colorOverride: 'magenta', _wpos: [1, 2, 0] }));
		collect(new wall3d({ _type: 'direct', colorOverride: 'pink', _wpos: [1, 3, 0] }));
		collect(new wall3d({ _type: 'direct', colorOverride: 'blue', _wpos: [1, 4, 0] }));
		collect(new wall3d({ _type: 'direct', colorOverride: 'red', _wpos: [1, 5, 0] }));
		collect(new wall3d({ _type: 'direct', colorOverride: 'purple', _wpos: [1, 6, 0] }));
		collect(new wall3d({ _type: 'direct', colorOverride: 'purple', _wpos: [1, 7, 0] }));
		collect(new wall3d({ _type: 'direct', colorOverride: 'purple', _wpos: [1, 8, 0] }));
		// collect(new wall({ _type: 'direct', _wpos: [4, 1, 0] }));
		// collect(new wall({ _type: 'direct', _wpos: [5, 1, 0] }));
		world_manager.addMergeLot(gobjs, 1);
		// land.fill();
	}

	function build_then_output_stats() {
		document.querySelector('rome-stats')!.innerHTML = `
			DOTS_PER_INCH_CORRECTED_RENDER_TARGET: ${pipeline.DOTS_PER_INCH_CORRECTED_RENDER_TARGET}
			<br />&#9;ROUND_UP_DOTS_PER_INCH: ${pipeline.ROUND_UP_DOTS_PER_INCH}
			<br />&#9;USE_SCENE3: ${pipeline.USE_SCENE3}
			<br />--
			<br />&#9;TOGGLE_TOP_DOWN_MODE (f1): ${tileform.TOGGLE_TOP_DOWN_MODE}
			<br />&#9;TOGGLE_RENDER_AXES (f2): ${tileform.TOGGLE_RENDER_AXES}
			<br />&#9;TOGGLE_NORMAL_MAPS (f3): ${tileform.TOGGLE_NORMAL_MAPS}
			<br />&#9;TOGGLE_SUN_CAMERA (f4): ${tileform.TOGGLE_SUN_CAMERA}
			<br />--
			<br />&#9;randomSpriteColor (h): ${glob.randomSpriteColor}
			<br />dither, color correction (d, z): ${pipeline.dithering}, ${pipeline.compression}
			<br />render scale (-, =): ${glob.scale}
			<br />zoom scale (r, f): ${zoom.scale()}
			<br />grid (t, g): ${world_manager.world.grid.spread} / ${world_manager.world.grid.outside}
			<br />hex size ([, ]): ${tileform.hex_size}
			<br />--
			<br />fps: ${glob.fps?.toFixed(2)} ${glob.delta?.toFixed(3)}
			<br />reprerender: ${glob.reprerender}
			<br />dirtyObjects: ${glob.dirtyObjects}
			<br />&#9;hex size (q, a): ${pts.to_string_fixed(glob.hexSize)}
			<!--<br />cameraMode: ${pipeline.cameraMode}-->
			<br />chunk span size: ${clod.chunk_span} x ${clod.chunk_span}
			<br />gobjs: ${glob.gameobjects[0]} / ${glob.gameobjects[1]}
			<br />chunks: ${clod.numbers.chunks[0]} / ${clod.numbers.chunks[1]}
			<br />pan wpos, rpos: ${pts.to_string_fixed(pan.wpos)} (${pts.to_string_fixed(pan.rpos)})
			`;
	}

	export function purgeRemake() {
		console.warn(' purgeRemake ');

		const chunks = clod.helpers.get_every_chunk(world_manager.world);
		for (const chunk of chunks) {
			chunk.nuke();
		}
		glob.reprerender = true;
		glob.dirtyObjects = true;
		world_manager.init();
		world_manager.repopulate();
		game.repopulate();
		makeTestingChamber();
	}

	export function step() {
		hooks.emit('romeComponents', 1);
		hooks.emit('romeStep', 0);
		keys();
		build_then_output_stats();
		world_manager.update();
		game.update();
		glob.reprerender = false;
	}

	function keys() {
		if (app.key('h') == 1) {
			glob.randomSpriteColor = !glob.randomSpriteColor;
			purgeRemake();
		}
		if (app.key('-') == 1) {
			if (glob.scale > 1)
				glob.scale -= 1;
			// Our wpos is still correct, but our rpos is now outdated
			pan.rpos = pts.mult(pts.project(pan.wpos), glob.scale);
			console.log(glob.scale);
			purgeRemake();
		}
		if (app.key('=') == 1) {
			glob.scale += 1;
			// Our wpos is still correct, but our rpos is now outdated
			pan.rpos = pts.mult(pts.project(pan.wpos), glob.scale);
			console.log(glob.scale);
			purgeRemake();
		}
		if (app.key('c') == 1) {
			const chunks = clod.helpers.get_every_chunk(world_manager.world);
			console.log('chunks', chunks);
		}
		if (app.key('a') == 1) {
			console.log('arrays', world_manager.world.arrays);
		}
		if (app.key('t') == 1) {
			world_manager.world.grid.shrink();
			glob.reprerender = true;
			glob.dirtyObjects = true;
		}
		if (app.key('g') == 1) {
			world_manager.world.grid.grow();
			glob.reprerender = true;
			glob.dirtyObjects = true;
		}
		if (app.key('[') == 1) {
			tileform.hex_size -= .1;
			console.log(tileform.hex_size);
			purgeRemake();
		}
		if (app.key(']') == 1) {
			tileform.hex_size += .1;
			console.log(tileform.hex_size);
			purgeRemake();
		}


	}

}

export default rome;