import "./CashOrder.css";
import SideComponents from "../sides/SideComponents";
import ReceiptContext from "../context/ReceiptContext.js";
import {useAppContext, useSideCommons} from "../sides/SideCommons.js";

//Левое поле
function leftColumnIzv() {
	return (
		<td valign="top" width="158" height="248">
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
	return (
		<td valign="top" width="411">
			<table cellspacing="0" cellpadding="0" width="403" align="center" border="0">
				<tbody>
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
							<div className="text-l">{ctx.sideData.namePayeeReceiver}</div>
						</td>
						<td align="right" width="20">
							<div className="text-sl"></div>
						</td>
						<td valign="bottom" align="middle" height="20" width="180">
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
				</tbody>
			</table>
			<table cellspacing="0" cellpadding="0" width="403" align="center" border="0">
				<tbody>
					<tr>
						<td valign="bottom" align="middle" height="20">
							<div className="text-l">{ctx.sideData.nameBankPayee}</div>
						</td>
					</tr>
					<tr>
						<td className="naz" valign="top" align="middle">
							(наименование банка получателя платежа)
						</td>
					</tr>
				</tbody>
			</table>
			<table cellspacing="0" cellpadding="0" width="403" align="center" border="0">
				<tbody>
					<tr>
						<td className="text-sl" valign="bottom" width="24">
							БИК
						</td>
						<td valign="bottom" align="middle" height="20" width="128">
							<div className="text-l">{ctx.sideData.BIK}</div>
						</td>
						<td valign="bottom" align="right" width="22">
							<div className="text-sl"></div>
						</td>
						<td valign="bottom" align="middle" height="20" width="229">
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
				</tbody>
			</table>
			<table cellspacing="0" cellpadding="0" width="403" align="center" border="0">
				<tbody>
					<tr>
						<td valign="bottom" align="middle" height="20">
							<div className="text-l">{paymentDescription}</div>
						</td>
					</tr>
					<tr>
						<td className="naz" valign="top" align="middle">
							(наименование платежа)
						</td>
					</tr>
					<tr>
						<td valign="bottom" align="middle" height="20">
							<div className="text-l">{ctx.sideData.accountNumber}</div>
						</td>
					</tr>
					<tr>
						<td className="naz" valign="top" align="middle">
							(номер лицевого счета (код) плательщика)
						</td>
					</tr>
				</tbody>
			</table>
			<table cellspacing="0" cellpadding="0" width="403" align="center" border="0">
				<tbody>
					<tr>
						<td valign="bottom" width="130" height="20">
							<div className="text-sl">Ф.И.О. плательщика:</div>
						</td>
						<td valign="bottom" height="20">
							<div className="text-l">{ctxZaimodavec.sideData.surname} </div>
						</td>
					</tr>
					<tr>
						<td valign="bottom" width="130" height="20">
							<div className="text-sl">Адрес плательщика:</div>
						</td>
						<td valign="bottom" height="20">
							<div className="text-l">{ctxZaimodavec.sideData.address.value}</div>
						</td>
					</tr>
				</tbody>
			</table>
			<table cellspacing="0" cellpadding="0" width="403" align="center" border="0">
				<tbody>
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
				</tbody>
			</table>
			<table cellspacing="2" cellpadding="0" width="403" align="center" border="0">
				<tbody>
					<tr>
						<td valign="bottom">
							<div className="naz">
								С условиями приема указанной в платежном документе суммы, в т.ч. с суммой взимаемой платы за услуги банка ознакомлен и согласен.
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<table cellspacing="0" cellpadding="0" width="403" align="center" border="0">
				<tbody>
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
				</tbody>
			</table>
		</td>
	);
}

export default function CashOrder() {
	const ctx = useAppContext(ReceiptContext, "receipt", "receipt");

	const cS0 = "0"; //cellspacing
	const cP0 = "0"; //cellpadding
	const width575 = "575"; //width

	return (
		<div text="#000000" bgcolor="#ffffff">
			<table cellspacing={cS0} cellpadding={cP0} width="575" align="center" border="0">
				<tbody>
					<tr>
						<td>
							<div classNameName="text-sl" align="center">
								КВИТАНЦИЯ НА ОПЛАТУ
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<table cellspacing="0" cellpadding="0" align="center" border="0">
				<tbody>
					<tr>
						<td valign="bottom"></td>
						<td>
							<table bordercolor="#000000" cellspacing="0" cellpadding="0" width="575" border="1">
								<tbody>
									<tr>
										{leftColumnIzv()}
										{Content()}
									</tr>
									<tr>
										{leftColumnKvi()}
										{Content()}
									</tr>
								</tbody>
							</table>
						</td>
						<td valign="top"></td>
					</tr>
					<tr>
						<td></td>
						<td align="right"></td>
						<td></td>
					</tr>
				</tbody>
			</table>

			<SideComponents.InputField label="Получатель платежа" value="namePayeeReceiver" ctx={ctx} placeholder="" />
			<SideComponents.InputField label="ИНН получателя" value="INN" ctx={ctx} placeholder="" />
			<SideComponents.InputField label="БИК" value="BIK" ctx={ctx} placeholder="" />
			<SideComponents.InputField label="Номер счёта" value="accountNumber" ctx={ctx} placeholder="" />
			<SideComponents.InputField label="Кор/сч" value="numberKor" ctx={ctx} placeholder="" />
			<SideComponents.InputField label="Наименование банка получателя" value="nameBankPayee" ctx={ctx} placeholder="" />
		</div>
	);
}
