import {saveAs} from "file-saver";

export function generateDocx(parties) {
	if (!(parties && parties.zaimodavec.name && parties.zaemshik.name)) {
		return;
	}
	console.log(parties, parties.zaimodavec, parties.zaemshik);
	const {zaimodavec: zd, zaemshik: za} = parties;
	import("docx").then((docx) => {
		const {Document, Packer, Paragraph, TextRun} = docx;

		let doc = new Document({
			sections: [],
			styles: {
				paragraphStyles: [
					{
						id: "wellSpaced",
						name: "Well Spaced",
						basedOn: "Normal",
						quickFormat: true,
						paragraph: {
							spacing: {after: 25},
							indent: {left: 4252},
						},
					},
				],
			},
		});
		let children = [];
		const addParagraph = (...text) => {
			children.push(
				new Paragraph({
					style: "wellSpaced",
					children: text.map((obj) => {
						return new TextRun({text: obj[0], bold: obj[1], size: "22pt", font: {name: "Arial"}}); // Font doesnt work smh
					}),
				})
			);
		};
		addParagraph(["Шапка:", true]);
		addParagraph([` `]);

		const makeAddressObj = (addressUnrestricted) => {
			const arr = addressUnrestricted.split(",");
			return {
				postalCode: arr[0],
				region: arr[1],
				city: arr[2],
				street: arr[3],
				building: arr[4],
			};
		};
		const address = {
			zd: makeAddressObj(zd.address.value),
			za: makeAddressObj(za.address.value),
		};

		console.log(zd);

		/////////////////////////////////////////////////////

		const arb = true;
		if (arb) {
			addParagraph([`В Арбитражный суд ${address.zd.region}`]);
		} else {
			addParagraph([`В `, true], ["<court name>"]);
		}
		addParagraph([`Адрес: `, true], ["суда"]);

		// if (zd.type !== 2) {
		addParagraph([`Истец: `, true], [`${zd.changes.surname ?? zd.surname} ${zd.changes.name ?? zd.name} ${zd.changes.paternal ?? zd.paternal}`]);
		// } else {
		// addParagraph([`Истец: `, true], [`${val["zd_jpyesname_text"] ? `"${val["zd_jpyesname_text"].value}"` : ""} ${val["zd_orf_text"].value}`]);
		// }
		addParagraph(
			[`Адрес: `, true],
			[`${address.zd.postalCode ?? ""} ${address.zd.region ?? ""} ${address.zd.city ?? ""} ${address.zd.street ?? ""} ${address.zd.building ?? ""}`]
		);
		const ogrnipzd = zd.ogrnip;
		if (ogrnipzd) {
			addParagraph([`ОРГНИП: `, true], [`${ogrnipzd}`]);
		}
		const innzd = zd.inn;
		if (innzd) {
			addParagraph([`ИНН: `, true], [`${innzd}`]);
		}
		const phonezd = zd.phone;
		if (phonezd) {
			addParagraph([`Телефон: `, true], [`${phonezd}`]);
		}

		let representative = zd.representative;
		if (Object.values(representative).some((v) => v !== null)) {
			addParagraph([`Представитель истца: `, true], [`${representative.surname} ${representative.name} ${representative.paternal}`]);
			addParagraph([`Адрес: `, true], [`${representative.address}`]);
			addParagraph([`Телефон: `, true], [`${representative.phone}`]);
		}

		addParagraph([""]);

		if (za.type !== 2) {
			addParagraph([`Ответчик: `, true], [`${za.surname} ${za.name} ${za.paternal}`]);
		} else {
			addParagraph([`Ответчик: `, true], [`${za.name}`]);
			addParagraph([`ИНН: `, true], [`${za.inn}`]);
		}

		// 			addParagraph([`Ответчик: `, true], [`${val2["za_surname_text"].value} ${val2["za_name_text"].value} ${val2["za_paternal_text"].value}`]);
		// 		} else {
		// 			addParagraph([`Ответчик: `, true], [`${val2["za_jpyesname_text"] ? `"${val2["za_jpyesname_text"].value}"` : ""} ${val2["za_orf_text"].value}`]);
		// 		}

		// 	const val2 = this.state.za ? this.state.za[this.state.za.length - 1] : null;
		// 	if (val2) {
		// 		console.log("val2", val2);
		// 		if (val2.za_person_select && val2.za_person_select.show !== 3) {
		// 			addParagraph([`Ответчик: `, true], [`${val2["za_surname_text"].value} ${val2["za_name_text"].value} ${val2["za_paternal_text"].value}`]);
		// 		} else {
		// 			addParagraph([`Ответчик: `, true], [`${val2["za_jpyesname_text"] ? `"${val2["za_jpyesname_text"].value}"` : ""} ${val2["za_orf_text"].value}`]);
		// 		}
		// 		addParagraph(
		// 			[`Последний известный адрес: `, true],
		// 			[
		// 				`${val2["zaaddress_txt_Код региона, Индекс"] || ""} ${val2["zaaddress_txt_Регион"] || ""} ${val2["zaaddress_txt_Город"] || ""} ${
		// 					val2["zaaddress_txt_Улица"] || ""
		// 				} ${val2["zaaddress_txt_Улица"] || ""} ${val2["zaaddress_txt_Дом"] || ""} ${val2["zaaddress_txt_Квартира/Офис"] || ""}`,
		// 			]
		// 		);
		// 		addParagraph([`Паспорт РФ: `, true], [`<серия> <номер> <кем выдан>`]);
		// 		addParagraph([`Дата рождения: `, true], [`<date>`]);
		// 		addParagraph([`Цена иска: `, true], [`<price> (<words>)`]);
		// 	}

		doc.addSection({
			children,
		});
		Packer.toBlob(doc).then((blob) => {
			saveAs(blob, "document.docx");
		});
	});
}
