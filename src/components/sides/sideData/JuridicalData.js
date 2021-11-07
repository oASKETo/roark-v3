import SideData from "./SideData.js";

export default class JuridicalData extends SideData {
	inn = null;
	name = null;
	address = null;
    kladr = null;
    okato = null;
	oktmo = null;
	autofillAddress = true; // always true
	filial = Object.seal({name: null});

	constructor() {
		super();
		Object.seal(this);
		this.type = 2;
	}
}
