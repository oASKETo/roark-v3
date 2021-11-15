import SideData from "./SideData.js";

export default class PhysicalData extends SideData {
	surname = null;
	paternal = null;
	changes = Object.seal({name: null, surname: null, paternal: null, date: null, changeReason: null, reasonDate: null});

	constructor() {
		super();
		Object.seal(this);
		this.type = 0;
	}
}
