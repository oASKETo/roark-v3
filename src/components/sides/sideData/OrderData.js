export default class OrderData {
	radio_level_1 = null;
	radio_level_2 = null;
	type = null;
	name = null;
	phone = null;
	email = null;

	address = Object.seal({
		type: null,
		value: null,
		realestate: null,
		kladr: null,
		oktmo: null,
		inn: null,
	});

	representative = Object.seal({name: null, surname: null, paternal: null, address: null, phone: null, POADate: null, POANumber: null}); // zaimodavec
}
