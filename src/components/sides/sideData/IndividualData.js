import SideData from "./SideData.js";

export default class IndividualData extends SideData {
	name = null;
	surname = null;
	paternal = null;
	address = null;
	ogrnip = null;
	changes = Object.seal({name: null, surname: null, paternal: null, date: null, changeReason: null, reasonDate: null});
	liquidationDate = null;

	constructor() {
		super();
		Object.seal(this);
	}
}
