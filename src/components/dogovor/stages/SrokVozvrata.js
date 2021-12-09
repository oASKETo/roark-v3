import React from "react";
import DogovorContext from "../../context/DogovorContext.js";
import ShowWhen from "../../reusable/ShowWhen.js";
import {useAppContext} from "../../sides/SideCommons";
import SideComponents from "../../sides/SideComponents.js";

function LoanCommon({additional, ctx}) {
	return (
		<>
			{additional && (
				<>
					<SideComponents.InputField type="text" label="Размер одного платежа" value="srokVozvrata.hire.amount" ctx={ctx} />
					<SideComponents.InputField type="text" label="День месяца, в который нужно произвести платёж" value="srokVozvrata.hire.day" validator="[0-9]{0,2}" ctx={ctx} />
				</>
			)}
			<SideComponents.InputField type="data" label="Дата последнего платежа" value="srokVozvrata.hire.lastPaymentDate" ctx={ctx} />
			<SideComponents.Label text="Для досрочного возврата всей суммы займа с рассрочкой, Заёмщик должен хотя бы раз нарушить срок внесения очередного платежа. Укажите дату, когда заёмщик не внёс очередной платёж:" />
			<SideComponents.InputField type="data" label="Дата, когда заёмщик не всёс очередной платёж" value="srokVozvrata.hire.failedPaymentDate" ctx={ctx} />
		</>
	);
}

function MissingCommon2({additional, ctx}) {
	const method = ctx.sideData.srokVozvrata.missing.method;
	const subtype = ctx.sideData.srokVozvrata.missing.subtype;
	return (
		<>
			<SideComponents.Select
				label="Я вручил требование следующим способом"
				value="srokVozvrata.missing.method"
				options={[
					["Наручно", "byhand"],
					["Письмом с описью вложения", "letter"],
					["Телеграммой", "telegram"],
					["Электронной почтой", "email"],
					["Транспортной компанией", "delivery"],
				]}
				placeholder={["Выберите", null]}
				ctx={ctx}
			/>
			{method !== null && (
				<SideComponents.InputField
					type="date"
					label={method === "byhand" ? "Дата вручения требования" : "Дата направления требования"}
					value="srokVozvrata.missing.date"
					ctx={ctx}
				/>
			)}
			<ShowWhen value={!!additional} is={false}>
				<SideComponents.Label
					text={`Требование о возврате займа будет составлно автоматически, после заполнения раздела "Договор" и будет доступно во вкладке "Претензионный порядок"`}
				/>
			</ShowWhen>
			<ShowWhen value={!!additional} is={true}>
				<ShowWhen value={method} is={["letter", "telegram", "delivery"]}>
					<SideComponents.RadioGroup value="srokVozvrata.missing.subtype" ctx={ctx}>
						<SideComponents.RadioLabel text="Требование было вручено заёмщику" />
						<ShowWhenMargin value={subtype} is={0}>
							<SideComponents.InputField type="date" label="Дата вручения заёмщику" value="srokVozvrata.missing.deliveryDate" ctx={ctx} />
						</ShowWhenMargin>
						<SideComponents.RadioLabel text="Требование не было вручено заёмщику" />
						<ShowWhenMargin value={subtype} is={1}>
							<SideComponents.InputField
								type="date"
								label="Дата истечения срока хранения отправления/последней попытки вручения"
								value="srokVozvrata.missing.deliveryDate"
								ctx={ctx}
							/>
						</ShowWhenMargin>
					</SideComponents.RadioGroup>
				</ShowWhen>
				<ShowWhen value={method} is={"email"}>
					<SideComponents.Label text="Принадлежность адреса электронной почты заёмщику подтверждается:" />
					<SideComponents.RadioGroup value="srokVozvrata.missing.subtype" ctx={ctx}>
						<SideComponents.RadioLabel text="Реквизитами, указанными в договоре" />
						<SideComponents.RadioLabel text="Бланком организации заёмщика" />
						<SideComponents.RadioLabel text="Электронной перепиской" />
					</SideComponents.RadioGroup>
				</ShowWhen>
			</ShowWhen>
		</>
	);
}

function MissingCommon({ctx}) {
	return (
		<>
			<SideComponents.RadioGroup value="srokVozvrata.missing.type" ctx={ctx}>
				<SideComponents.RadioLabel text="Я направил/вручил требование о возврате займа, и у меня имеются доказательства этого" />
				<ShowWhenMargin value={ctx.sideData.srokVozvrata.missing.type} is={0}>
					<MissingCommon2 additional ctx={ctx} />
				</ShowWhenMargin>
				<SideComponents.RadioLabel text="Я не направлял требования о возврате займа, или я направлял требование, но у меня нет доказательств" />
				<ShowWhenMargin value={ctx.sideData.srokVozvrata.missing.type} is={1}>
					<MissingCommon2 ctx={ctx} />
				</ShowWhenMargin>
			</SideComponents.RadioGroup>
			<SideComponents.InputField type="text" label="Пункт договора" value="srokVozvrata.punkt" ctx={ctx} />
		</>
	);
}

function ShowWhenMargin(props) {
	return (
		<ShowWhen {...props} children={undefined}>
			<div style={{marginLeft: "2em"}}>{props.children}</div>
		</ShowWhen>
	);
}

export default function SrokVozvrata() {
	const ctx = useAppContext(DogovorContext, "dogovor", "dogovor");

	return (
		<>
			<SideComponents.RadioGroup value="srokVozvrata.value" ctx={ctx}>
				<SideComponents.RadioLabel text="Сумма займа подлежит единовременному возврату до конкретной даты" />
				<ShowWhenMargin value={ctx.sideData.srokVozvrata.value} is={0}>
					<SideComponents.InputField type="date" label="Дата, когда сумма займа должна быть возвращена" value="srokVozvrata.setDate.date" ctx={ctx} />
					<SideComponents.InputField type="text" label="Пункт договора" value="srokVozvrata.punkt" ctx={ctx} />
				</ShowWhenMargin>
				<SideComponents.RadioLabel text="Сумма займа предоставлена на опрделённый срок" />
				<ShowWhenMargin value={ctx.sideData.srokVozvrata.value} is={1}>
					<SideComponents.InputField
						type="text"
						label="Займ предоставлен на"
						value="srokVozvrata.timePeriod.amount"
						validator={(str) => /^[0-9]*$/g.test(str)}
						ctx={ctx}
					/>
					<SideComponents.Select
						label="Период"
						value="srokVozvrata.timePeriod.period"
						options={[
							["День", "day"],
							["Неделя", "week"],
							["Месяц", "month"],
							["Год", "year"],
						]}
						ctx={ctx}
					/>
					<SideComponents.InputField type="text" label="Пункт договора" value="srokVozvrata.punkt" ctx={ctx} />
				</ShowWhenMargin>
				<SideComponents.RadioLabel text="Договором займа предусмотрена рассрочка платежа" />
				<ShowWhenMargin value={ctx.sideData.srokVozvrata.value} is={2}>
					<SideComponents.RadioGroup value="srokVozvrata.hire.type" ctx={ctx}>
						<SideComponents.RadioLabel text="Договором займа предусмотрена рассрочка на ежемесячные платежи" />
						<ShowWhenMargin value={ctx.sideData.srokVozvrata.hire.type} is={0}>
							<LoanCommon additional ctx={ctx} />
						</ShowWhenMargin>
						<SideComponents.RadioLabel text="Займ подлежит возврату различными по сумме и датам платежами" />
						<ShowWhenMargin value={ctx.sideData.srokVozvrata.hire.type} is={1}>
							<LoanCommon ctx={ctx} />
						</ShowWhenMargin>
					</SideComponents.RadioGroup>
					<SideComponents.InputField type="text" label="Пункт договора" value="srokVozvrata.punkt" ctx={ctx} />
				</ShowWhenMargin>
				<SideComponents.RadioLabel text="В договоре отсутствует условие о сроке (дате) возврата займа" />
				<ShowWhenMargin value={ctx.sideData.srokVozvrata.value} is={3}>
					<MissingCommon ctx={ctx} />
				</ShowWhenMargin>
				<SideComponents.RadioLabel text="Срок возврата займа определён моментом востребования" />
				<ShowWhenMargin value={ctx.sideData.srokVozvrata.value} is={4}>
					<MissingCommon ctx={ctx} />
				</ShowWhenMargin>
			</SideComponents.RadioGroup>
			<br />
		</>
	);
}
