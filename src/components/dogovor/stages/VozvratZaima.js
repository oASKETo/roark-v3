import {useState} from "react";
import DogovorContext from "../../context/DogovorContext";
import ShowWhen from "../../reusable/ShowWhen";
import {useAppContext} from "../../sides/SideCommons";
import SideComponents from "../../sides/SideComponents";
import Button from "../../reusable/Button";

function PaymentAdder({variable, ctx}) {
	const payments = ctx.sideData.vozvratZaima[variable].payments;
	const [doc, setDoc] = useState({date: null, amount: null});
	const updateState = (path, val) => {
		const cpy = {...doc};
		cpy[path] = val;
		setDoc(cpy);
		console.log(cpy);
	};
	const addPayment = () => {
		if (doc.date && doc.amount) {
			console.log("add payment", doc);
			if (payments) {
				ctx.update(`vozvratZaima.${variable}.payments`, [...payments, doc]);
			} else {
				console.log(`vozvratZaima.${variable}.payments`);
				ctx.update(`vozvratZaima.${variable}.payments`, [doc]);
			}
			setDoc({date: null, amount: null});
		}
	};
	const removePayment = (index) => {
		console.log("remove payment", index, payments);
		if (payments) {
			ctx.update(
				`vozvratZaima.${variable}.payments`,
				payments.filter((_, i) => i !== index)
			);
		}
	};
	const adderCtx = {sideData: doc, update: updateState};

	console.log(payments);
	return (
		<>
			<SideComponents.InputField label="Дата платежа" type="date" value="date" ctx={adderCtx} />
			<SideComponents.InputField type="text" label="Сумма платежа" value="amount" ctx={adderCtx} />
			<div style={{width: "30%", marginLeft: "auto", marginBottom: "4px"}}>
				<Button text="Добавить" variant="normal" onClick={addPayment} />
			</div>
			<ul style={{marginTop: 0}}>
				{payments &&
					payments.map((payment, i) => {
						return (
							<li style={{display: "grid", gridTemplateColumns: "4fr 1fr 4fr", marginBottom: "4px"}}>
								<div>
									{new Date(payment.date).toLocaleDateString("ru")} - {payment.amount}
								</div>
								<button onClick={() => removePayment(i)}>x</button>
							</li>
						);
					})}
			</ul>
		</>
	);
}

export default function VozvratZaima() {
	const ctx = useAppContext(DogovorContext, "dogovor", "dogovor");

	const type = ctx.sideData.vozvratZaima.value;

	return (
		<>
			<SideComponents.RadioGroup value="vozvratZaima.value" ctx={ctx}>
				<SideComponents.RadioLabel text="Заёмщик, и его правопреемники ни разу не производили оплату по договору займа" />
				<SideComponents.RadioLabel text="Заёмщик частчно платил по договору спорному договору займа" />
				<ShowWhen value={type} is={1} margin>
					<SideComponents.CheckboxLabel
						text="У меня имеется оригинал или копия документа о возврате части задолженности Заёмщиком"
						value="vozvratZaima.first.checked"
						ctx={ctx}
					/>
					<ShowWhen value={ctx.sideData.vozvratZaima.first.checked} is={true} margin></ShowWhen>
					<SideComponents.CheckboxLabel text="Документ об оплате части задолженности находится у Заёмщика" value="vozvratZaima.second.checked" ctx={ctx} />
					<ShowWhen value={ctx.sideData.vozvratZaima.second.checked} is={true} margin>
						<PaymentAdder variable="second" ctx={ctx} />
					</ShowWhen>
					<SideComponents.CheckboxLabel
						text="Часть задолженности мне была возвращена, но соответствующий документ не был составлен"
						value="vozvratZaima.third.checked"
						ctx={ctx}
					/>
					<ShowWhen value={ctx.sideData.vozvratZaima.third.checked} is={true} margin>
						<PaymentAdder variable="third" ctx={ctx} />
					</ShowWhen>
				</ShowWhen>
			</SideComponents.RadioGroup>
			<br />
		</>
	);
}
