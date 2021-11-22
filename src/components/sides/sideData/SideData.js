const constructDefendant = () => {
	const keys = ["birthDate", "birthPlace", "workPlace"];
	const defendant = {};
	keys.forEach((key) => {
		defendant[key] = null;
	});
	defendant.passport = {
		series: null,
		number: null,
		issuer: null,
		issueDate: null,
	};
	defendant.driverLicense = {
		series: null,
		number: null,
	};
	defendant.vehicleRegistration = {
		series: null,
		number: null,
		issuer: null,
		issueDate: null,
	};
	defendant.noData = false;

	Object.keys(defendant).forEach((key) => Object.seal(defendant[key]));
	Object.seal(defendant);

	return defendant;
};

export default class SideData {
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
		okato: null,
		inn: null,
	});

	representative = Object.seal({name: null, surname: null, paternal: null, address: null, phone: null, POADate: null, POANumber: null}); // zaimodavec
	defendant = constructDefendant(); // zaemshik
}
