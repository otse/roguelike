/// Made for Used By hex walls

import area2 from "../dep/area2.js";

class staggered_area extends area2 {
	data: object[] = []
	constructor(area: area2) {
		super(area.base); // calls unnecessary extract
		this._stagger();
	}
	// do(func: (pos: point) => void) 
	_stagger() {
		this.data = [];
		this.points = [];
		let i = 0;
		for (let y = this.base.min[1]; y < this.base.max[1]; y++) {
			let x_ = 0;
			let shift = 0;
			for (let x = this.base.min[0]; x < this.base.max[0]; x++) {
				if (x_++ % 2 === 1) {
					shift += 1;
				}
				const isBorder = x === this.base.min[0] || x === this.base.max[0] - 1 || y === this.base.min[1] || y === this.base.max[1] - 1;
				const isUneven = x_ % 2 === 0;
				this.points.push({ pos: [x, y - shift], isBorder, isUneven });
			}
		}
	}
}

export default staggered_area;