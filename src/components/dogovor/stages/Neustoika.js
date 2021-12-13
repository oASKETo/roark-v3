import {useState} from "react";
import DogovorContext from "../../context/DogovorContext";
import ShowWhen from "../../reusable/ShowWhen";
import {useAppContext} from "../../sides/SideCommons";
import SideComponents from "../../sides/SideComponents";
import Button from "../../reusable/Button";

function AmountShared({type, ctx}) {
	return (
		<>
			<SideComponents.InputField type="text" label={"Размер неустойки" + (type === 1 ? " в процентах" : "")} value="neustoika.amount" ctx={ctx} />
			<SideComponents.Select
				label="Период"
				value="neustoika.period"
				options={[
					["День", "day"],
					["Неделя", "week"],
					["Месяц", "month"],
					["Год", "year"],
					["Весь период", "all"],
				]}
				ctx={ctx}
			/>
			<SideComponents.InputField type="text" label="Пункт договора с данным условием" value="neustoika.punkt" ctx={ctx} />
		</>
	);
}

export default function Neustoika() {
	const ctx = useAppContext(DogovorContext, "dogovor", "dogovor");

	const value = ctx.sideData.neustoika.value;

	return (
		<>
			<SideComponents.RadioGroup value="neustoika.value" ctx={ctx}>
				<SideComponents.RadioLabel text="Условия о начислении неустойки в договоре отсутствуют" />
				<SideComponents.RadioLabel text="Стороны согласовали начисление неустойки в процентах" />
				<ShowWhen value={value} is={1} margin>
					<AmountShared type={value} ctx={ctx} />
				</ShowWhen>
				<SideComponents.RadioLabel text="Стороны согласовали начисление неустойки в твёрдой денежной сумме" />
				<ShowWhen value={value} is={2} margin>
					<AmountShared type={value} ctx={ctx} />
				</ShowWhen>
				<SideComponents.RadioLabel text="Договором предусмотрено, что начисление неустойки недопускается" />
				<SideComponents.RadioLabel text="Неустойка начисляется по ставке ЦБ" />
				<ShowWhen value={value} is={4} margin>
					<SideComponents.CheckboxLabel text="1/300 ставки ЦБ за каждый день просрочки" value="neustoika.one300" ctx={ctx} />
				</ShowWhen>
				<br />
				<SideComponents.RadioLabel text="В договоре имеется условие о предельном размере неустойки" />
				<ShowWhen value={value} is={5} margin>
					<SideComponents.RadioGroup value="neustoika.maxType" ctx={ctx}>
						<SideComponents.RadioLabel text="Предельный размер неустойки выражен в твёрдой денежной сумме" />
						<ShowWhen value={ctx.sideData.neustoika.maxType} is={0} margin>
							<SideComponents.InputField type="text" label="Предельный размер неустойки" value="neustoika.maxAmountPercent" ctx={ctx} />
						</ShowWhen>
						<SideComponents.RadioLabel text="Предельный размер неустойки выражен в процентном соотношении к сумме займа" />
						<ShowWhen value={ctx.sideData.neustoika.maxType} is={1} margin>
							<SideComponents.InputField type="text" label="Предельный размер неустойки" value="neustoika.maxAmountMoney" ctx={ctx} />
						</ShowWhen>
					</SideComponents.RadioGroup>
				</ShowWhen>
			</SideComponents.RadioGroup>
			<br />
		</>
	);
}
