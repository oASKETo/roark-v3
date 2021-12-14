import "./CashOrder.css";
import "./MeansPayment.css";
import SideComponents from "../sides/SideComponents";
import ReceiptContext from "../context/ReceiptContext.js";
import {useAppContext, useSideCommons} from "../sides/SideCommons.js";
import Collapsible from "../reusable/Collapsible.js";

//Левое поле
function leftColumnIzv() {
	return (
		<td valign="top" height="248">
			<table cellspacing="10" cellpadding="0" width="158" align="center" border="0">
				<tbody>
					<tr>
						<td align="center">
							<div className="text-sl">ИЗВЕЩЕНИЕ</div>
						</td>
					</tr>
					<tr>
						<td height="200"></td>
					</tr>
					<tr>
						<td align="center" width="118">
							<div className="text-sl">Кассир</div>
						</td>
					</tr>
				</tbody>
			</table>
		</td>
	);
}
function leftColumnKvi() {
	return (
		<td valign="top" height="248">
			<table cellspacing="0" cellpadding="0" width="158" align="center" border="0">
				<tbody>
					<tr valign="bottom">
						<td align="center" height="220">
							<div className="text-sl">
								<strong>КВИТАНЦИЯ</strong>
							</div>
						</td>
					</tr>
					<tr>
						<td height="20"></td>
					</tr>
					<tr>
						<td align="center" width="118">
							<div className="text-sl">Кассир</div>
						</td>
					</tr>
				</tbody>
			</table>
		</td>
	);
}
// Правое поле
function Content() {
	//(наименование получателя платежа)
	//(ИНН получателя платежа)
	const payeeNumber = ""; //(номер счета получателя платежа)
	//(наименование банка получателя платежа)
	// БИК
	//	(номер кор./с банка получателя)
	const paymentDescription = ""; //	(наименование платежа)
	//	(номер лицевого счета (код) плательщика)
	//Ф.И.О. плательщика
	//Адрес плательщика
	const ctx = useAppContext(ReceiptContext, "receipt", "receipt");

	const ctxZaimodavec = useSideCommons("zaimodavec");
	console.log(ctxZaimodavec);
	return (
		<td valign="top">
			<table className="width100" cellspacing="0" cellpadding="0" align="center" border="0">
				<tr align="right">
					<td className="naz" colspan="3">
						Форма № ПД-4
					</td>
				</tr>
				<tr>
					<td valign="bottom" colspan="3" height="20">
						<div className="text-l">{ctx.sideData.namePayeeReceiver}</div>
					</td>
				</tr>
				<tr>
					<td valign="top" align="middle" colspan="3">
						<div className="naz">(наименование получателя платежа)</div>
					</td>
				</tr>
				<tr>
					<td width="203" valign="bottom" height="20">
						<div className="text-l">{ctx.sideData.INN}</div>
					</td>
					<td align="right" width="20">
						<div className="text-sl"></div>
					</td>
					<td valign="bottom" height="20" width="180">
						<div className="text-l">{payeeNumber}</div>
					</td>
				</tr>
				<tr>
					<td className="naz" valign="top" align="middle">
						(ИНН получателя платежа)
					</td>
					<td className="naz" align="middle"></td>
					<td className="naz" valign="top" align="middle">
						(номер счета получателя платежа)
					</td>
				</tr>
			</table>
			<table className="width100" cellspacing="0" cellpadding="0" align="center" border="0">
				<tr>
					<td valign="bottom" height="20">
						<div className="text-l">{ctx.sideData.nameBankPayee}</div>
					</td>
				</tr>
				<tr>
					<td className="naz" valign="top" align="middle">
						(наименование банка получателя платежа)
					</td>
				</tr>
			</table>
			<table className="width100" cellspacing="0" cellpadding="0" align="center" border="0">
				<tr>
					<td className="text-sl" valign="bottom" width="28">
						БИК
					</td>
					<td valign="bottom" height="20" width="128">
						<div className="text-l">{ctx.sideData.BIK}</div>
					</td>
					<td valign="bottom" align="right" width="22">
						<div className="text-sl"></div>
					</td>
					<td valign="bottom" height="20" width="229">
						<div className="text-l">{ctx.sideData.numberKor}</div>
					</td>
				</tr>
				<tr>
					<td height="12"></td>
					<td></td>
					<td></td>
					<td className="naz" valign="top" align="middle">
						(номер кор./с банка получателя)
					</td>
				</tr>
			</table>
			<table className="width100" cellspacing="0" cellpadding="0" align="center" border="0">
				<tr>
					<td valign="bottom" height="20">
						<div className="text-l">{paymentDescription}</div>
					</td>
				</tr>
				<tr>
					<td className="naz" valign="top" align="middle">
						(наименование платежа)
					</td>
				</tr>
				<tr>
					<td valign="bottom" height="20">
						<div className="text-l">{ctx.sideData.accountNumber}</div>
					</td>
				</tr>
				<tr>
					<td className="naz" valign="top" align="middle">
						(номер лицевого счета (код) плательщика)
					</td>
				</tr>
			</table>
			<table className="width100" cellspacing="0" cellpadding="0" align="center" border="0">
				<tr>
					<td valign="bottom" width="130" height="20">
						<div className="text-sl">Ф.И.О. плательщика:</div>
					</td>
					<td valign="bottom" height="20">
						<div className="text-l">
							<Collapsible shown={ctx.sideData.changes === 0} duration="0.1s">
								<div className="text-l">{ctxZaimodavec.sideData.changes.surname}</div>
							</Collapsible>
							<Collapsible shown={ctx.sideData.changes === 1} duration="0.1s">
								<div className="text-l">{ctxZaimodavec.sideData.representative.surname}</div>
							</Collapsible>
						</div>
					</td>
				</tr>
				<tr>
					<td valign="bottom" width="130" height="20">
						<div className="text-sl">Адрес плательщика:</div>
					</td>
					<td valign="bottom" height="20">
						<div className="text-l">
							<Collapsible shown={ctx.sideData.changes === 0} duration="0.1s">
								<div className="text-l">{ctxZaimodavec.sideData.address.value}</div>
							</Collapsible>
							<Collapsible shown={ctx.sideData.changes === 1} duration="0.1s">
								<div className="text-l">{ctxZaimodavec.sideData.representative.address}</div>
							</Collapsible>
						</div>
					</td>
				</tr>
			</table>
			<table className="width100" cellspacing="0" cellpadding="0" align="center" border="0">
				<tr>
					<td align="right" width="209" height="20">
						<div className="text-sl">Сумма платежа:</div>
					</td>
					<td width="87" valign="bottom" align="middle" height="20">
						<div className="text-l" align="center"></div>
					</td>
					<td valign="bottom" align="middle" height="20" width="33">
						<div className="text-sl">руб.</div>
					</td>
					<td valign="bottom" align="middle" height="20" width="42">
						<div className="text-l" align="center"></div>
					</td>
					<td valign="bottom" align="middle" height="20" width="32">
						<div className="text-sl">коп.</div>
					</td>
				</tr>
				<tr>
					<td valign="bottom" align="right" height="20">
						<div className="text-sl">Сумма платы за услуги:</div>
					</td>
					<td valign="bottom" align="middle" height="20">
						<div className="text-l"></div>
					</td>
					<td valign="bottom" align="middle" height="20">
						<div className="text-sl">руб.</div>
					</td>
					<td valign="bottom" align="middle" height="20">
						<div className="text-l"></div>
					</td>
					<td valign="bottom" align="middle" height="20">
						<div className="text-sl">коп.</div>
					</td>
				</tr>
				<tr>
					<td valign="bottom" align="right" height="20">
						<div className="text-sl">Итого:</div>
					</td>
					<td valign="bottom" align="middle" height="20">
						<div className="text-l"></div>
					</td>
					<td valign="bottom" align="middle" height="20">
						<div className="text-sl">руб.</div>
					</td>
					<td valign="bottom" align="middle" height="20">
						<div className="text-l" align="center"></div>
					</td>
					<td valign="bottom" align="middle" height="20">
						<div className="text-sl">коп.</div>
					</td>
				</tr>
			</table>
			<table className="width100" cellspacing="2" cellpadding="0" align="center" border="0">
				<tr>
					<td valign="bottom">
						<div className="naz">С условиями приема указанной в платежном документе суммы, в т.ч. с суммой взимаемой платы за услуги банка ознакомлен и согласен.</div>
					</td>
				</tr>
			</table>
			<table className="width100" cellspacing="0" cellpadding="0" align="center" border="0">
				<tr>
					<td valign="bottom" height="20" width="77">
						<div className="text-sl">Плательщик: </div>
					</td>
					<td valign="bottom" align="middle" height="20" width="119">
						<div className="text-l"></div>
					</td>
					<td valign="bottom" height="20" width="56">
						<div className="text-sl">(подпись)</div>
					</td>
					<td className="text-sl" valign="bottom" align="right" width="151">
						Дата
					</td>
				</tr>
			</table>
		</td>
	);
}
function MeansPayment() {
	const cS0 = "0"; //cellspacing
	const cP0 = "0"; //cellpadding
	const width575 = "575"; //width

	return (
		<div className="font13">
			<table class="duty-template">
				<colgroup>
					<col width="24%" />
					<col width="24%" />
					<col width="60" />
					<col width="20%" />
					<col width="80 " />
					<col />
				</colgroup>
				<tr class="row1">
					<td colspan="6" valign="middle">
						<div class="duty-sum-title">Сумма прописью</div>
						<div class="duty-sum-value">
							<b class="b-postedData">
								<span></span>
							</b>
						</div>
					</td>
				</tr>
				<tr class="row2">
					<td class="left-col-with_border first">
						ИНН <b class="b-postedData"></b>
					</td>
					<td>
						КПП <b class="b-postedData"></b>
					</td>
					<td class="col-center">Сумма</td>
					<td colspan="3">
						<b class="b-postedData">
							<span></span>
						</b>
					</td>
				</tr>
				<tr class="row3">
					<td class="first">
						<b class="b-postedData"></b>
					</td>
					<td></td>
					<td class="col-center">Сч. №</td>
					<td colspan="3">
						<b class="b-postedData"></b>
					</td>
				</tr>
				<tr class="row4">
					<td colspan="2" class="double-left-col first">
						Плательщик
					</td>
					<td class="col-center"></td>
					<td colspan="3"></td>
				</tr>
				<tr class="row5">
					<td class="first">
						<b class="b-postedData"></b>
					</td>
					<td></td>
					<td class="col-center">БИК</td>
					<td colspan="3">
						<b class="b-postedData"></b>
					</td>
				</tr>
				<tr class="row6">
					<td class="first">Банк плательщика</td>
					<td></td>
					<td class="col-center">Сч. №</td>
					<td colspan="3">
						<b class="b-postedData"></b>
					</td>
				</tr>
				<tr class="row7">
					<td class="first" colspan="2">
						ОТДЕЛЕНИЕ КАЛУГА БАНКА РОССИИ//УФК по Калужской области г. Калуга
					</td>
					<td class="col-center">БИК</td>
					<td colspan="3">012908002</td>
				</tr>
				<tr class="row8">
					<td colspan="2" class="double-left-col first">
						Банк получателя
					</td>
					<td class="col-center">Сч. №</td>
					<td colspan="3">40102810045370000030 </td>
				</tr>
				<tr class="row9">
					<td class="left-col-with_border first">ИНН 4027018228</td>
					<td>КПП 402701001</td>
					<td class="col-center">Сч. №</td>
					<td colspan="3">03100643000000013700</td>
				</tr>
				<tr class="row10">
					<td class="first" colspan="2">
						УФК по Калужской области ( ИФНС России по Ленинскому округу города Калуги)
					</td>
					<td class="col-center">Вид оп.</td>
					<td>01</td>
					<td class="col-center">Срок плат.</td>
					<td></td>
				</tr>
				<tr class="row11">
					<td colspan="2"></td>
					<td class="col-center">Наз пл.</td>
					<td></td>
					<td class="col-center">Очер. плат</td>
					<td></td>
				</tr>
				<tr class="row12">
					<td class="first">Получатель</td>
					<td></td>
					<td class="col-center">Код</td>
					<td></td>
					<td class="col-center">Рез. поле</td>
					<td></td>
				</tr>
			</table>

			<table class="duty-template-footer">
				<colgroup>
					<col width="195" />
					<col width="195" />
					<col width="60" />
					<col width="60" />
					<col width="60" />
					<col width="60" />
					<col width="60" />
					<col />
				</colgroup>
				<tr height="20">
					<td class="duty-col duty-col-first"></td>
					<td class="duty-col duty-col-non-boundary"></td>
					<td class="duty-col duty-col-non-boundary"></td>
					<td class="duty-col duty-col-non-boundary"></td>
					<td class="duty-col duty-col-non-boundary"></td>
					<td class="duty-col duty-col-non-boundary"></td>
					<td class="duty-col"></td>
				</tr>
			</table>
		</div>
	);
}
export default function Receipt() {
	return CashOrder();
}
function CashOrder() {
	const ctx = useAppContext(ReceiptContext, "receipt", "receipt");

	const cS0 = "0"; //cellspacing
	const cP0 = "0"; //cellpadding

	return (
		<div text="#000000" bgcolor="#ffffff">
			<table cellspacing={cS0} cellpadding={cP0} align="center" border="0">
				<tr>
					<td>
						<div classNameName="text-sl" align="center">
							КВИТАНЦИЯ НА ОПЛАТУ
						</div>
					</td>
				</tr>
			</table>
			<table className="margin0" cellspacing="0" cellpadding="0" align="center" border="0">
				<tr>
					<td valign="bottom"></td>
					<td>
						<table bordercolor="#000000" cellspacing="0" cellpadding="0" border="1">
							<tr>
								{leftColumnIzv()}
								{Content()}
							</tr>
							<tr>
								{leftColumnKvi()}
								{Content()}
							</tr>
						</table>
					</td>
					<td valign="top"></td>
				</tr>
				<tr>
					<td></td>
					<td align="right"></td>
					<td></td>
				</tr>
			</table>
			<SideComponents.RadioGroup value="changes" ctx={ctx}>
				<SideComponents.RadioLabel text="Госпошлину оплатил истец" />
				<SideComponents.RadioLabel text="Госпошлину оплатил представитель" />
			</SideComponents.RadioGroup>
			{/* <SideComponents.RadioGroup value="changes.changeReason" ctx={ctx}>
				<SideComponents.RadioLabel text="Госпошлину оплатил представитель" />
			</SideComponents.RadioGroup> */}

			<SideComponents.InputField label="Получатель платежа" value="namePayeeReceiver" ctx={ctx} placeholder="" />
			<SideComponents.InputField label="ИНН получателя" value="INN" ctx={ctx} placeholder="" />
			<SideComponents.InputField label="БИК" value="BIK" ctx={ctx} placeholder="" />
			<SideComponents.InputField label="Номер счёта" value="accountNumber" ctx={ctx} placeholder="" />
			<SideComponents.InputField label="Кор/сч" value="numberKor" ctx={ctx} placeholder="" />
			<SideComponents.InputField label="Наименование банка получателя" value="nameBankPayee" ctx={ctx} placeholder="" />
		</div>
	);
}
