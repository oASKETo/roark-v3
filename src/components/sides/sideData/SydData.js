export default class SydData {
	radio_level_1 = null;
	radio_level_2 = null;
	name = null;
	nameSyd = "Название суда по умолчанию";
	punkt = null;
	adres = "Адрес суда по умолчанию";
	titleDocument = null;
	regionCode = null;

	dateApplication = null;
	dateCancelOrder = null;
	dateDocument = null;
	caseNumber = null;

	constructor() {
		Object.seal(this);
	}
}
