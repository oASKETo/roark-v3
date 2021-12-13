class Neustoika {
	value = null;
	amount = null;
	period = null;
	punkt = null;
	one300 = false;
	maxType = null;
	maxAmountPercent = null;
    maxAmountMoney = null;
}

class VozvratZaima {
	value = null;
	// placeholders
	first = Object.seal({
		checked: false,
		documents: [], // TODO
	});
	second = Object.seal({
		checked: false,
		payments: [],
	});
	third = Object.seal({
		checked: false,
		payments: [],
	});
}

class Percent {
	value = null;
	punkt = null;

	// Both % and p.
	percent = Object.seal({
		amount: null,
		period: null,
	});
	returnMore = null;
}

class SrokVozvrata {
	value = null;
	punkt = null;

	setDate = Object.seal({
		date: null,
	});
	timePeriod = Object.seal({
		amount: null,
		/** @type {null|"day"|"week"|"month"|"year"} */
		period: null,
	});
	hire = Object.seal({
		type: 0, // or 1
		amount: null,
		day: null,
		lastPaymentDate: null,
		failedPaymentDate: null,
	});
	missing = Object.seal({
		type: 0, // or 1
		method: null, // string
		date: null,
		deliveryDate: null,
		subtype: 0,
	});
	// last object is identical to 'missing'

	constructor() {
		Object.seal(this);
	}
}

export default class DogovorData {
	name = Object.seal({name: null, number: null, noNumber: false});
	date = null;
	amount = null;
	punkt = null;
	proofs = [];

	srokVozvrata = new SrokVozvrata();
	percent = new Percent();
	vozvratZaima = new VozvratZaima();
	neustoika = new Neustoika();

	constructor() {
		Object.seal(this);
	}
}
