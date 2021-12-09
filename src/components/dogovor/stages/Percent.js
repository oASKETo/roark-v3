import DogovorContext from "../../context/DogovorContext";
import ShowWhen from "../../reusable/ShowWhen";
import {useAppContext} from "../../sides/SideCommons";
import SideComponents from "../../sides/SideComponents";

function AmountShared({type, ctx}) {
	return (
		<>
			{" "}
			<SideComponents.InputField label={type === 0 ? "Размер процентной ставки" : "Размер процента в твёрдой денежной сумме"} value="percent.percent.amount" ctx={ctx} />
			<SideComponents.Select
				label="Период"
				value="percent.percent.period"
				options={[
					["День", "day"],
					["Неделя", "week"],
					["Месяц", "month"],
					["Год", "year"],
				]}
				ctx={ctx}
			/>
			<SideComponents.InputField type="text" label="Пункт договора" value="percent.punkt" ctx={ctx} />
		</>
	);
}

export default function Percent() {
	const ctx = useAppContext(DogovorContext, "dogovor", "dogovor");

	const type = ctx.sideData.percent.value;

	return (
		<>
			<SideComponents.RadioGroup value="percent.value" ctx={ctx}>
				<SideComponents.RadioLabel text="Стороны согласовали начисление процентов за пользование займом в процентах" />
				<ShowWhen value={type} is={0} margin>
					<AmountShared type={type} ctx={ctx} />
				</ShowWhen>
				<SideComponents.RadioLabel text="Стороны согласовали начисление процентов в твёрдой денежной сумме" />
				<ShowWhen value={type} is={1} margin>
					<AmountShared type={type} ctx={ctx} />
				</ShowWhen>
				<SideComponents.RadioLabel text="Условие о начислении процентов в договоре отсутствует" />
				<ShowWhen value={type} is={2} margin>
					<SideComponents.Label text="Тогда, при сумме займа от 100'000 рублей, или в случае, если одной из сторон по договору (расписке) является юридическое лицо; процент за пользование займом определяется по действующей ставке ЦБ РФ, Или займ считается беспроцентным, в случае если он заключен на сумму менее 100'000 рублей, либо между физическими лицами и индивидуальными предпринимателями." />
				</ShowWhen>
				<SideComponents.RadioLabel text="Заёмщик обязался возвратить сумму займа большую, чем взятая в долг" />
				<ShowWhen value={type} is={3} margin>
					<SideComponents.InputField type="text" label="Сумма, которую обязался возвратить Заёмщик" value="srokVozvrata.returnMore" ctx={ctx} />
					<SideComponents.InputField type="text" label="Пункт договора" value="percent.punkt" ctx={ctx} />
				</ShowWhen>
				<SideComponents.RadioLabel text="В договоре указано на беспроцентный займ" />
			</SideComponents.RadioGroup>
			<br />
		</>
	);
}
