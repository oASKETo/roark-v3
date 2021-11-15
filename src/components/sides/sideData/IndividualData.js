import SideData from "./SideData.js";

export default class IndividualData extends SideData {
	surname = null;
	paternal = null;
	ogrnip = null;
	changes = Object.seal({name: null, surname: null, paternal: null, date: null, changeReason: null, reasonDate: null});
	liquidationDate = null;

	constructor() {
		super();
		Object.seal(this);
        this.type = 1;
	}
}
