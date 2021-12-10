import React, {useState} from "react";
import SideComponents from "./SideComponents.js";
import {useSydSide, useSideCommons} from "./SideCommons.js";
import Collapsible from "../reusable/Collapsible.js";
import "./SydSide.css";

//Объединение 1,2,4,5,6 окна
function Production(window) {
	const ctx = useSydSide("sydSideData");
	const table = [
		{
			id: 0,
			text: [
				{
					idMenu: 0,
					text: "В суд подается исковое заявление;",
				},
				{
					idMenu: 1,
					text: "Исковые заявления рассматриваются в Арбитражном суде региона;",
				},
				{
					idMenu: 2,
					text: "Сумма исковых требований: превышает 400 тысяч рублей;",
				},
				{
					idMenu: 3,
					text: "По делу проводятся судебные заседания;",
				},
				{
					idMenu: 4,
					text: "Решение суда является окончательным, вступает в силу по истечении месяца со дня вынесения. Либо сразу после рассмотрения апелляционной жалобы ответчика, если он обратиться с соответствующей жалобой.",
				},
			],
		},
		{
			id: 1,
			text: [
				{
					idMenu: 0,
					text: "Сумма исковых требований не превышает для юр. лиц 800'000 рублей, 400'000 для ИП;",
				},
				{
					idMenu: 1,
					text: "В суд подаётся исковое заявление;",
				},
				{
					idMenu: 2,
					text: "По делу не проводятся судебные заседания;",
				},
				{
					idMenu: 3,
					text: "Исковые заявления рассматриваются в Арбитражном суде региона;",
				},
				{
					idMenu: 4,
					text: "Решение суда является окончательным, вступает в силу по истечении 15 дней со дня вынесения. Либо сразу после рассмотрения апелляционной жалобы ответчика, если он обратиться с соответствующей жалобой.",
				},
			],
		},
		{
			id: 2,
			text: [
				{
					idMenu: 0,
					text: "Сумма исковых требований не превышает 50'000 рублей;",
				},
				{
					idMenu: 1,
					text: "В суд подааётся исковое заявление;",
				},
				{
					idMenu: 2,
					text: "По делу проводятся судебные заседания;",
				},
				{
					idMenu: 3,
					text: "Исковое заявление рассматривается мировым судьёй;",
				},
				{
					idMenu: 4,
					text: "Решение суда является окончательным, вступает в силу по истечении месяца со дня вынесения. Либо сразу после рассмотрения апелляционной жалобы ответчика, если он обратиться с соответствующей жалобой.",
				},
			],
		},
		{
			id: 3,
			text: [
				{
					idMenu: 0,
					text: "Сумма исковых требований не превышает 500'000 рублей;",
				},
				{
					idMenu: 1,
					text: "В суд подааётся исковое заявление;",
				},
				{
					idMenu: 2,
					text: "По делу проводятся судебные заседания;",
				},
				{
					idMenu: 3,
					text: "Исковое заявление рассматривается в районном/городском суде;",
				},
				{
					idMenu: 4,
					text: "Решение суда является окончательным, вступает в силу по истечении месяца со дня вынесения. Либо сразу после рассмотрения апелляционной жалобы ответчика, если он обратиться с соответствующей жалобой.",
				},
			],
		},
		{
			id: 4,
			text: [
				{
					idMenu: 0,
					text: "Сумма исковых требований не превышает 100'000 рублей;",
				},
				{
					idMenu: 1,
					text: "В суд подаётся исковое заявление;",
				},
				{
					idMenu: 2,
					text: "По делу не проводятся судебные заседания;",
				},
				{
					idMenu: 3,
					text: "Исковые заявления рассматриваются в районном/городском суде;",
				},
				{
					idMenu: 4,
					text: "Решение суда является окончательным, вступает в силу по истечении 15 дней со дня вынесения. Либо сразу после рассмотрения апелляционной жалобы ответчика, если он обратиться с соответствующей жалобой.",
				},
			],
		},
	];

	let mass = [];
	for (let i = 0; i < table[window].text.length; i++) {
		mass = table[window].text;
	}
	const tableProps = mass.map((mass) => <li className="sydside-li"> {mass.text}</li>);
	return (
		<>
			<div className="sydside-split-text">
				<ul className="icon sydside-ul">{tableProps}</ul>
				<div className="sydside-app-tema">Подсудность</div>
				<SideComponents.RadioGroup value="radio_level_1" ctx={ctx}>
					<SideComponents.RadioLabel text="Исковое заявление будет подано по месту жительства/нахождения ответчика (по умолчанию)" />
					<SideComponents.RadioLabel text="В договоре указан конкретный суд, в котором рассматриваются споры по договору" />

					<Collapsible shown={ctx.sideData.radio_level_1 === 1} duration="0.1s">
						<div className="sydside-app ">
							<SideComponents.InputField label="Наименование суда:" value="nameSyd" ctx={ctx} placeholder="Наименование суда" />

							<SideComponents.InputField label="Пункт договора" value="punkt" ctx={ctx} placeholder="Пункт договора" />
						</div>
					</Collapsible>
					<SideComponents.RadioLabel text="В договоре укзаано, что дело рассматривается по месту нахождения/жительства истца" />

					<Collapsible shown={ctx.sideData.radio_level_1 === 2} duration="0.1s">
						<div className="sydside-app ">
							<SideComponents.InputField label="Пункт договора, с данным условием" value="punkt" ctx={ctx} placeholder="Пункт договора" />
						</div>
					</Collapsible>
					<SideComponents.RadioLabel text="В договоре указано, что дело рассматривается по месту нахождения/жительства Займодавца" />

					<Collapsible shown={ctx.sideData.radio_level_1 === 3} duration="0.1s">
						<div className="sydside-app ">
							<SideComponents.InputField label="Пункт договора, с данным условием" value="punkt" ctx={ctx} placeholder="Пункт договора" />
						</div>
					</Collapsible>
					<SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора" />

					<Collapsible shown={ctx.sideData.radio_level_1 === 4} duration="0.1s">
						<div className="sydside-app">
							<SideComponents.InputField label="Адрес места исполнения договора:" value="adres" ctx={ctx} placeholder="Адрес" />
							<SideComponents.InputField label="Пункт договора, с данным условием:" value="punkt" ctx={ctx} placeholder="Пункт договора" />
						</div>
					</Collapsible>
				</SideComponents.RadioGroup>
			</div>
		</>
	);
}
//Объединение 3.7 окна
function OrderProduction(window) {
	const ctx = useSydSide("sydSideData");
	const table = [
		{
			id: 1,
			text: "Сумма исковых требований: не превышает 500'000 рублей;",
		},
		{
			id: 2,
			text: "Подаётся заявление о вынесении судебного приказа;",
		},
		{
			id: 3,
			text: "Оплата госпошлины в размере 50%  от госпошлины по иску;",
		},
		{
			id: 4,
			text: "Судебные заседания не проводится;",
		},
		{
			id: 5,
			text: "Судебный приказ отменяется в случае подачи возражений должником после чего необходимо обращаться с исковым заявлением",
		},
	];
	const tableProps = table.map((table) => <li className="sydside-li"> {table.text}</li>);
	const radio = [
		<SideComponents.InputField label="Пункт договора, с данным условием:" value="punkt" ctx={ctx} placeholder="Пункт договора" />,
		<SideComponents.InputField label="Двухзначный код региона:" value="regionCode" ctx={ctx} placeholder="Код региона" />,
	];
	const syd = ["Арбитражный суд", "Мировой судья"];
	const sydText =
		"Я уже обращался с заявлением о вынесении судебного приказа, однако " + syd[window] + " вынес определение  об отказе в принятии заявления о вынесении судебного приказа";
	return (
		<>
			<div className="sydside-split-text">
				<ul className="icon sydside-ul">{tableProps}</ul>
				<SideComponents.RadioGroup value="radio_level_2" ctx={ctx}>
					<SideComponents.RadioLabel text="Обратиться за вынесением судебного приказа" />
					<Collapsible
						shown={
							ctx.sideData.radio_level_2 === 0 ||
							ctx.sideData.radio_level_1 === 0 ||
							ctx.sideData.radio_level_1 === 1 ||
							ctx.sideData.radio_level_1 === 2 ||
							ctx.sideData.radio_level_1 === 3 ||
							ctx.sideData.radio_level_1 === 4
						}
						duration="0.1s"
					>
						<div className="sydside-app">
							<SideComponents.RadioGroup value="radio_level_1" ctx={ctx}>
								<SideComponents.RadioLabel text="Исковое заявление будет подано по месту жительства/нахождения ответчика (по умолчанию)" />
								<SideComponents.RadioLabel text="В договоре указан конкретный суд, в котором рассматриваются споры по договору" />
								<Collapsible shown={ctx.sideData.radio_level_1 === 1} duration="0.1s">
									<div className="sydside-app ">
										<SideComponents.InputField label="Наименование суда:" value="nameSyd" ctx={ctx} placeholder="Наименование суда" />
										{radio[window]}
									</div>
								</Collapsible>
								<SideComponents.RadioLabel text="В договоре укзаано, что дело рассматривается по месту нахождения/жительства истца" />
								<Collapsible shown={ctx.sideData.radio_level_1 === 2} duration="0.1s">
									<div className="sydside-app ">
										<SideComponents.InputField label="Пункт договора, с данным условием:" value="punkt" ctx={ctx} placeholder="Пункт договора" />
									</div>
								</Collapsible>
								<SideComponents.RadioLabel text="В договоре указано, что дело рассматривается по месту нахождения/жительства Займодавца" />
								<Collapsible shown={ctx.sideData.radio_level_1 === 3} duration="0.1s">
									<div className="sydside-app ">
										<SideComponents.InputField label="Пункт договора, с данным условием:" value="punkt" ctx={ctx} placeholder="Пункт договора" />
									</div>
								</Collapsible>
								<SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора" />
								<Collapsible shown={ctx.sideData.radio_level_1 === 4} duration="0.1s">
									<div className="sydside-app ">
										<SideComponents.InputField label="Пункт договора, с данным условием:" value="punkt" ctx={ctx} placeholder="Пункт договора" />
										<SideComponents.InputField label="Адрес места исполнения договора:" value="adres" ctx={ctx} placeholder="Адрес" />
									</div>
								</Collapsible>
							</SideComponents.RadioGroup>
						</div>
					</Collapsible>
					<SideComponents.RadioLabel text="У меня имеются письменные возражения заёмщика относительно спорной задолженности." />
					<Collapsible shown={ctx.sideData.radio_level_2 === 1} duration="0.1s">
						<div className="sydside-app ">
							<SideComponents.InputField label="Наименование документа:" value="titleDocument" ctx={ctx} placeholder="Наименование" />
							<SideComponents.InputField type="date" label="Дата документа:" value="dateDocument" ctx={ctx} />
						</div>
					</Collapsible>
					<SideComponents.RadioLabel text={sydText} />
					<Collapsible shown={ctx.sideData.radio_level_2 === 2} duration="0.1s">
						<div className="sydside-app ">
							<SideComponents.InputField type="date" label="Дата обращения с заявлением о вынесении судебного приказа:" value="dateApplication" ctx={ctx} />
							<SideComponents.InputField type="date" label="Дата определения об отмене судебного приказа:" value="dateCancelOrder" ctx={ctx} />
							<SideComponents.InputField label="Номер дела из картотеки арбитражных дел:" value="caseNumber" ctx={ctx} placeholder="Номер дела" />
						</div>
					</Collapsible>
					<SideComponents.RadioLabel text="Я уже обращался с заявлением о вынесении судебного приказа, однако судебный приказ был отменён в связи с подачей возражений должника." />
					<Collapsible shown={ctx.sideData.radio_level_2 === 3} duration="0.1s">
						<div className="sydside-app ">
							<SideComponents.InputField type="date" label="Дата обращения с заявлением о вынесении судебного приказа:" value="dateApplication" ctx={ctx} />
							<SideComponents.InputField type="date" label="Дата определения об отмене судебного приказа:" value="dateCancelOrder" ctx={ctx} />
							<SideComponents.InputField label="Номер дела из картотеки арбитражных дел:" value="caseNumber" ctx={ctx} placeholder="Номер дела" />
						</div>
					</Collapsible>
				</SideComponents.RadioGroup>
			</div>
		</>
	);
}
//Главная функция
export default function SydSide() {
	const ctx = useSydSide("sydSideData");
	// Эквивалентно:
	// const {sideObject, update, ctx} = useSideCommons("zaemshik");
	// const zaemshik = sideObject;

	const [page, setCount] = useState(0);
	const table = [
		{
			id: 1,
			text: "Вид производства: Исковое производство в Арбитражном суде",
		},
		{
			id: 2,
			text: "Вид производства: Упрощенное производство в Арбитражном суде",
		},
		{
			id: 3,
			text: "Вид производства: Приказное производство в Арбитражном суде",
		},
		{
			id: 4,
			text: "Вид производства: Исковое производство у мировых судей",
		},
		{
			id: 5,
			text: "Вид производства: Исковое производство в суде общей юрисдикции",
		},
		{
			id: 6,
			text: "Вид производства: Упрощенное производство в суде общей юрисдикции",
		},
		{
			id: 7,
			text: "Вид производства: Приказное производство у мирового судьи",
		},
	];
	return (
		<div className="App">
			<div className="sydside-split-button">
				<input type="button" className={"sydside-button-route"} value="1" onClick={() => setCount(1)}></input>
				<input type="button" className="sydside-button-route" value="2" onClick={() => setCount(2)}></input>
				<input type="button" className="sydside-button-route" value="3" onClick={() => setCount(3)}></input>
				<input type="button" className="sydside-button-route" value="4" onClick={() => setCount(4)}></input>
				<input type="button" className="sydside-button-route" value="5" onClick={() => setCount(5)}></input>
				<input type="button" className="sydside-button-route" value="6" onClick={() => setCount(6)}></input>
				<input type="button" className="sydside-button-route" value="7" onClick={() => setCount(7)}></input>
			</div>
			<div className="sydside">
				<img className="sydside-app-img" src="/sides/hammer.jpg" alt="xd" />

				<div className="sydside-app-tema-variables">
					<label>Суд: </label>
					<label>{ctx.sideData.nameSyd}</label>
				</div>

				<div className="sydside-app-tema-variables">
					<label>Адрес суда: </label>
					<label>{ctx.sideData.adres}</label>
				</div>
			</div>

			{page === 1 && <div className="sydside-app-tema">{table[0].text}</div>}
			{page === 2 && <div className="sydside-app-tema">{table[1].text}</div>}
			{page === 3 && <div className="sydside-app-tema">{table[2].text}</div>}
			{page === 4 && <div className="sydside-app-tema">{table[3].text}</div>}
			{page === 5 && <div className="sydside-app-tema">{table[4].text}</div>}
			{page === 6 && <div className="sydside-app-tema">{table[5].text}</div>}
			{page === 7 && <div className="sydside-app-tema">{table[6].text}</div>}
			{page === 1 && Production(0)}
			{page === 2 && Production(1)}
			{page === 3 && OrderProduction(0)}
			{page === 4 && Production(2)}
			{page === 5 && Production(3)}
			{page === 6 && Production(4)}
			{page === 7 && OrderProduction(1)}
		</div>
	);
}
