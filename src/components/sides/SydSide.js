import React, {useState} from "react";
import SideComponents from "./SideComponents.js";
import {useSydSide} from "./SideCommons.js";
import Collapsible from "../reusable/Collapsible.js";
import {tryFuncOr} from "../reusable/Funcs.js";
import "./SydSide.css";

//Исковое производство
function ActionProduction() {
	const ctx = useSydSide("sydSideData");
	const table = [
		{
			id: 1,
			text: "В суд подается исковое заявление",
		},
		{
			id: 2,
			text: "Исковые заявления рассматриваются в Арбитражном суде региона",
		},
		{
			id: 3,
			text: "Сумма исковых требований: превышает 400 тысяч рублей",
		},
		{
			id: 4,
			text: "По делу проводятся судебные заседания",
		},
		{
			id: 5,
			text:
				"Решение суда является окончательным, вступает в силу по истечении" +
				"месяца со дня вынесения. Либо сразу после рассмотрения апелляционной " +
				"жалобы ответчика, если он обратиться с соответствующей жалобой.",
		},
	];
	const tableProps = table.map((table) => <li className="sydside-li"> {table.text}</li>);

	return (
		<>
			<div className="sydside-split-text">
				<ul className="icon sydside-ul">{tableProps}</ul>
				<div className="sydside-app-tema">Подсудность</div>
				<SideComponents.RadioGroup value="radio_level_1" ctx={ctx}>
					<SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />
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
//упрощенное производство
function SimplifiedProduction() {
	const ctx = useSydSide("sydSideData");
	const table = [
		{
			id: 1,
			text: "Сумма исковых требований не превышает для юр. лиц 800'000 рублей, 400'000 для ИП",
		},
		{
			id: 2,
			text: "В суд подаётся исковое заявление",
		},
		{
			id: 3,
			text: "По делу не проводятся судебные заседания",
		},
		{
			id: 4,
			text: "Исковые заявления рассматриваются в Арбитражном суде региона",
		},
		{
			id: 5,
			text:
				"Решение суда является окончательным, вступает в силу по истечении 15 дней со дня вынесения. " +
				+"Либо сразу после рассмотрения апелляционной жалобы ответчика, если он" +
				+"обратиться с соответствующей жалобой.",
		},
	];
	const tableProps = table.map((table) => <li className="sydside-li"> {table.text}</li>);

	return (
		<>
			<div className="sydside-split-text">
				<ul className="icon sydside-ul">{tableProps}</ul>
				<div className="sydside-app-tema">Подсудность</div>
				<SideComponents.RadioGroup value="radio_level_1" ctx={ctx}>
					<SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />
					<SideComponents.RadioLabel text="В договоре указан конкретный суд, в котором рассматриваются споры по договору" />
					<Collapsible shown={ctx.sideData.radio_level_1 === 1} duration="0.1s">
						<div className="sydside-app ">
							<SideComponents.InputField label="Наименование суда:" value="nameSyd" ctx={ctx} placeholder="Наименование суда" />
							<SideComponents.InputField label="Пункт договора, с данным условием:" value="punkt" ctx={ctx} placeholder="Пункт договора" />
						</div>
					</Collapsible>
					<SideComponents.RadioLabel text="В договоре указано, что дело рассматривается по месту нахождения/жительства истца" />
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
							<SideComponents.InputField label="Адрес места исполнения договора:" value="adres" ctx={ctx} placeholder="Адрес" />
							<SideComponents.InputField label="Пункт договора, с данным условием:" value="punkt" ctx={ctx} placeholder="Пункт договора" />
						</div>
					</Collapsible>
				</SideComponents.RadioGroup>
			</div>
		</>
	);
}
//Приказное производство
function OrderProduction() {
	const ctx = useSydSide("sydSideData");
	const table = [
		{
			id: 1,
			text: "Сумма исковых требований: не превышает 500'000 рублей ",
		},
		{
			id: 2,
			text: "Подаётся заявление о вынесении судебного приказа",
		},
		{
			id: 3,
			text: "Оплата госпошлины в размере 50%  от госпошлины по иску",
		},
		{
			id: 4,
			text: "Судебные заседания не проводится",
		},
		{
			id: 5,
			text: "Судебный приказ отменяется в случае подачи возражений должником после чего необходимо обращаться с исковым заявлением",
		},
	];
	const tableProps = table.map((table) => <li className="sydside-li"> {table.text}</li>);

	return (
		<>
			<div className="sydside-split-text">
				<ul className="icon sydside-ul">{tableProps}</ul>
				<SideComponents.RadioGroup value="radio_level_2" ctx={ctx}>
					<SideComponents.RadioLabel text="Обратиться за вынесением судебного приказа" />
					<Collapsible
						shown={
							ctx.sideData.radio_level_2 !== 1 &&
							ctx.sideData.radio_level_2 !== 2 &&
							ctx.sideData.radio_level_2 !== 3 &&
							(ctx.sideData.radio_level_1 === 0 ||
								ctx.sideData.radio_level_1 === 1 ||
								ctx.sideData.radio_level_1 === 2 ||
								ctx.sideData.radio_level_1 === 3 ||
								ctx.sideData.radio_level_1 === 4)
						}
						duration="0.1s"
					>
						<div className="sydside-app">
							<SideComponents.RadioGroup value="radio_level_1" ctx={ctx}>
								<SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />
								<SideComponents.RadioLabel text="В договоре указан конкретный суд, в котором рассматриваются споры по договору" />
								<Collapsible shown={ctx.sideData.radio_level_1 === 1} duration="0.1s">
									<div className="sydside-app ">
										<SideComponents.InputField label="Наименование суда:" value="nameSyd" ctx={ctx} placeholder="Наименование суда" />
										<SideComponents.InputField label="Пункт договора, с данным условием:" value="punkt" ctx={ctx} placeholder="Пункт договора" />
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
					<SideComponents.RadioLabel
						text="Я уже обращался с заявлением о вынесении судебного приказа, однако Арбитражный суд вынес 
                    определение  об отказе в принятии заявления о вынесении судебного приказа"
					/>
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
//Исковое производство у мировых судей
function ActionProductionJusties() {
	const ctx = useSydSide("sydSideData");
	const table = [
		{
			id: 1,
			text: "Сумма исковых требований не превышает 50'000 рублей",
		},
		{
			id: 2,
			text: "В суд подааётся исковое заявление",
		},
		{
			id: 3,
			text: "По делу проводятся судебные заседания",
		},
		{
			id: 4,
			text: "Исковое заявление рассматривается мировым судьёй",
		},
		{
			id: 5,
			text:
				"Решение суда является окончательным, вступает в силу по истечении" +
				"месяца со дня вынесения. Либо сразу после рассмотрения апелляционной " +
				"жалобы ответчика, если он обратиться с соответствующей жалобой.",
		},
	];
	const tableProps = table.map((table) => <li className="sydside-li"> {table.text}</li>);
	return (
		<>
			<div className="sydside-split-text">
				<ul className="icon sydside-ul">{tableProps}</ul>
				<div className="sydside-app-tema">Подсудность</div>
				<SideComponents.RadioGroup value="radio_level_1" ctx={ctx}>
					<SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />
					<SideComponents.RadioLabel text="В договоре указан конкретный суд, в котором рассматриваются споры по договору" />
					<Collapsible shown={ctx.sideData.radio_level_1 === 1} duration="0.1s">
						<div className="sydside-app ">
							<SideComponents.InputField label="Наименование суда:" value="nameSyd" ctx={ctx} placeholder="Наименование суда" />
							<SideComponents.InputField label="Пункт договора, с данным условием:" value="punkt" ctx={ctx} placeholder="Пункт договора" />
						</div>
					</Collapsible>
					<SideComponents.RadioLabel text="В договоре указано, что дело рассматривается по месту нахождения/жительства истца" />
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
		</>
	);
}
//Исковое производство в суде общей юрисдикции
function ActionProductionJurisdiction() {
	const ctx = useSydSide("sydSideData");
	const table = [
		{
			id: 1,
			text: "Сумма исковых требований не превышает 500'000 рублей",
		},
		{
			id: 2,
			text: "В суд подааётся исковое заявление",
		},
		{
			id: 3,
			text: "По делу проводятся судебные заседания",
		},
		{
			id: 4,
			text: "Исковое заявление рассматривается в районном/городском суде",
		},
		{
			id: 5,
			text:
				"Решение суда является окончательным, вступает в силу по истечении" +
				"месяца со дня вынесения. Либо сразу после рассмотрения апелляционной " +
				"жалобы ответчика, если он обратиться с соответствующей жалобой.",
		},
	];
	const tableProps = table.map((table) => <li className="sydside-li"> {table.text}</li>);
	return (
		<>
			<div className="sydside-split-text">
				<ul className="icon sydside-ul">{tableProps}</ul>
				<div className="sydside-app-tema">Подсудность</div>
				<SideComponents.RadioGroup value="radio_level_1" ctx={ctx}>
					<SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />
					<SideComponents.RadioLabel text="В договоре указан конкретный суд, в котором рассматриваются споры по договору" />
					<Collapsible shown={ctx.sideData.radio_level_1 === 1} duration="0.1s">
						<div className="sydside-app ">
							<SideComponents.InputField label="Наименование суда:" value="nameSyd" ctx={ctx} placeholder="Наименование суда" />
							<SideComponents.InputField label="Пункт договора, с данным условием:" value="punkt" ctx={ctx} placeholder="Пункт договора" />
						</div>
					</Collapsible>
					<SideComponents.RadioLabel text="В договоре указано, что дело рассматривается по месту нахождения/жительства истца" />
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
		</>
	);
}
//Упрощенное производство в суде общей юрисдикции
function SimplifiedProductionJurisdiction() {
	const ctx = useSydSide("sydSideData");
	const table = [
		{
			id: 1,
			text: "Сумма исковых требований не превышает 100'000 рублей",
		},
		{
			id: 2,
			text: "В суд подаётся исковое заявление",
		},
		{
			id: 3,
			text: "По делу не проводятся судебные заседания",
		},
		{
			id: 4,
			text: "Исковые заявления рассматриваются в районном/городском суде",
		},
		{
			id: 5,
			text:
				"Решение суда является окончательным, вступает в силу по истечении 15 дней со дня вынесения. " +
				+"Либо сразу после рассмотрения апелляционной жалобы ответчика, если он" +
				+"обратиться с соответствующей жалобой.",
		},
	];
	const tableProps = table.map((table) => <li className="sydside-li"> {table.text}</li>);

	return (
		<>
			<div className="sydside-split-text">
				<ul className="icon sydside-ul">{tableProps}</ul>
				<div className="sydside-app-tema">Подсудность</div>
				<SideComponents.RadioGroup value="radio_level_1" ctx={ctx}>
					<SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />
					<SideComponents.RadioLabel text="В договоре указан конкретный суд, в котором рассматриваются споры по договору" />
					<Collapsible shown={ctx.sideData.radio_level_1 === 1} duration="0.1s">
						<div className="sydside-app ">
							<SideComponents.InputField label="Наименование суда:" value="nameSyd" ctx={ctx} placeholder="Наименование суда" />
							<SideComponents.InputField label="Пункт договора, с данным условием:" value="punkt" ctx={ctx} placeholder="Пункт договора" />
						</div>
					</Collapsible>
					<SideComponents.RadioLabel text="В договоре указано, что дело рассматривается по месту нахождения/жительства истца" />
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
		</>
	);
}
//Приказное производство у мирового судьи
function OrderProductionJusties() {
	const ctx = useSydSide("sydSideData");
	const table = [
		{
			id: 1,
			text: "Сумма исковых требований: не превышает 500'000 рублей ",
		},
		{
			id: 2,
			text: "Подаётся заявление о вынесении судебного приказа",
		},
		{
			id: 3,
			text: "Оплата госпошлины в размере 50%  от госпошлины по иску",
		},
		{
			id: 4,
			text: "Судебные заседания не проводится",
		},
		{
			id: 5,
			text: "Судебный приказ отменяется в случае подачи возражений должником после чего необходимо обращаться с исковым заявлением",
		},
	];
	const tableProps = table.map((table) => <li className="sydside-li"> {table.text}</li>);

	return (
		<>
			<div className="sydside-split-text">
				<ul className="icon sydside-ul">{tableProps}</ul>
				<SideComponents.RadioGroup value="radio_level_2" ctx={ctx}>
					<SideComponents.RadioLabel text="Обратиться за вынесением судебного приказа" />
					<Collapsible
						shown={
							ctx.sideData.radio_level_1 === 0 ||
							ctx.sideData.radio_level_1 === 1 ||
							ctx.sideData.radio_level_1 === 2 ||
							ctx.sideData.radio_level_1 === 3 ||
							ctx.sideData.radio_level_1 === 4 ||
							ctx.sideData.radio_level_2 === 0
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
										<SideComponents.InputField label="Двухзначный код региона:" value="nameSyd" ctx={ctx} placeholder="Код региона" />
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
								<SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора." />
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
					<SideComponents.RadioLabel
						text="Я уже обращался с заявлением о вынесении судебного приказа, однако Мировой судья вынес 
                    определение  об отказе в принятии заявления о вынесении судебного приказа"
					/>
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
							<SideComponents.InputField type="date" label="Дата определение об отмене судебного приказа:" value="dateCancelOrder" ctx={ctx} />
							<SideComponents.InputField label="Номер дела из картотеки арбитражных дел:" value="caseNumber" ctx={ctx} placeholder="Номер дела" />
						</div>
					</Collapsible>
				</SideComponents.RadioGroup>
			</div>
		</>
	);
}
export default function SydSide() {
	//const ctx = useAppContext(SydContext, "syd");

	// Эквивалентно:
	// const {sideObject, update, ctx} = useSideCommons("zaemshik");
	// const zaemshik = sideObject;

	const [page, setCount] = useState(0);

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
			<div class="sydside">
				<img className="sydside-app-img" src="/sides/hammer.jpg" alt="xd" />

				<div class="sydside-app-tema-variables">
					<label>Суд:</label>
				</div>

				<div class="sydside-app-tema-variables">
					<label>Адрес суда:</label>
				</div>
			</div>

			{page === 1 && <div class="sydside-app-tema">Вид производства: Исковое производство в Арбитражном суде</div>}
			{page === 2 && "Вид производства: Упрощенное производство в Арбитражном суде"}
			{page === 3 && "Вид производства: Приказное производство в Арбитражном суде"}
			{page === 4 && "Вид производства: Исковое производство у мировых судей"}
			{page === 5 && "Вид производства: Исковое производство в суде общей юрисдикции"}
			{page === 6 && "Вид производства: Упрощенное производство в суде общей юрисдикции"}
			{page === 7 && "Вид производства: Приказное производство у мирового судьи"}
			{page === 1 && <ActionProduction />}
			{page === 2 && <SimplifiedProduction />}
			{page === 3 && <OrderProduction />}
			{page === 4 && <ActionProductionJusties />}
			{page === 5 && <ActionProductionJurisdiction />}
			{page === 6 && <SimplifiedProductionJurisdiction />}
			{page === 7 && <OrderProductionJusties />}
		</div>
	);
}
