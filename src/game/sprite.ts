import pipeline from "./pipeline.js";

interface sprite_literal {
	size: vec2;
	data?: number;
};

export namespace sprite {
	export type params = sprite['data'];
};

const doWireFrames = false;

export class sprite {
	uvTransform
	mesh
	geometry
	material
	constructor(
		public readonly data: sprite_literal
	) {
		this.uvTransform = new THREE.Matrix3;
		this.uvTransform.setUvTransform(0, 0, 1, 1, 0, 0, 1);
		let defines = {} as any;
		// defines.MASKED = 1;
		this.material = SpriteMaterial({
			map: pipeline.load_texture(`img/hex/tile.png`, 0),
			transparent: true,
			depthWrite: false,
			depthTest: false,
		}, {
			myUvTransform: this.uvTransform,
			masked: false,
			maskColor: new THREE.Vector3(1, 1, 1),
			bool: true
		}, defines);
		this.geometry = new THREE.PlaneGeometry(this.data.size[0], this.data.size[1], 1, 1)
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		pipeline.groups.major.add(this.mesh);
	}
};

export function SpriteMaterial(parameters, uniforms: any, defines: any = {}) {
	let material = new THREE.MeshLambertMaterial(parameters)
	material.customProgramCacheKey = function () {
		return 'romespritemat';
	}
	material.name = "romespritemat";
	material.defines = defines;
	material.onBeforeCompile = function (shader) {
		// material.shader = shader; // Hack
		shader.uniforms.myUvTransform = { value: uniforms.myUvTransform }
		shader.uniforms.bool = { value: uniforms.bool }
		if (uniforms.masked) {
			shader.uniforms.tMask = { value: pipeline.targetMask.texture }
			shader.uniforms.maskColor = { value: uniforms.maskColor }
			console.log('add tmask');
		}
		shader.vertexShader = shader.vertexShader.replace(
			`#include <common>`,
			`#include <common>
			varying vec2 myPosition;
			uniform mat3 myUvTransform;
			`
		);
		shader.vertexShader = shader.vertexShader.replace(
			`#include <worldpos_vertex>`,
			`#include <worldpos_vertex>
			myPosition = (projectionMatrix * mvPosition).xy / 2.0 + vec2(0.5, 0.5);
			`
		);
		shader.vertexShader = shader.vertexShader.replace(
			`#include <uv_vertex>`,
			`
			#ifdef USE_MAP
				vMapUv = ( myUvTransform * vec3( uv, 1 ) ).xy;
			#endif
			`
		);
		shader.fragmentShader = shader.fragmentShader.replace(
			`#include <map_pars_fragment>`,
			`
			#include <map_pars_fragment>
			varying vec2 myPosition;
			uniform sampler2D tMask;
			uniform vec3 maskColor;
			uniform bool uniball;
			`
		);
		shader.fragmentShader = shader.fragmentShader.replace(
			`#include <map_fragment>`,
			`
			#include <map_fragment>

			#ifdef MASKED
				vec4 texelColor = texture2D( tMask, myPosition );
				texelColor.rgb = mix(texelColor.rgb, maskColor, 0.7);
				if (texelColor.a > 0.5)
				diffuseColor.rgb = texelColor.rgb;
			#endif
			`
		);
	}
	return material;
}

export default sprite;