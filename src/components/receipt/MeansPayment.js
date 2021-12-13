export default function MeansPayment() {
	const cS0 = "0"; //cellspacing
	const cP0 = "0"; //cellpadding
	const width575 = "575"; //width

	return (
		<div>
			<table border="0" cellpadding="0" cellspacing="0" width="100%">
				<tr>
					<td colspan="2" valign="top" height="16">
						<table border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td rowspan="2" align="left" valign="top" nowrap>
									ПЛАТЕЖНОЕ ПОРУЧЕНИЕ № ______&nbsp;
								</td>
								<td width="80" height="16" align="center" valign="bottom" style="font-size: 11px;">
									&nbsp;__.__.____&nbsp;
								</td>
								<td width="10">&nbsp;</td>
								<td width="80" height="16" align="center" valign="bottom" style="font-size: 11px;">
									почтой
								</td>
								<td width="40">&nbsp;</td>
							</tr>
							<tr>
								<td width="80" height="16" align="center" valign="top" style="border-top: 1px #000000 solid; font-size: 10px;">
									Дата
								</td>
								<td width="10">&nbsp;</td>
								<td width="80" height="16" align="center" valign="top" style="border-top: 1px #000000 solid; font-size: 10px;" nowrap>
									Вид&nbsp;платежа
								</td>
								<td width="40">&nbsp;</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td width="40" height="40" style="border-right: 1px #000000 solid; font-size: 10px;">
						Сумма<br>прописью</br>
					</td>
					<td colspan="2" height="40" width="100%">
						&nbsp;
					</td>
				</tr>
				<tr>
					<td colspan="2" width="100%" align="center" style="border-top: 1px #000000 solid;">
						<table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
							<tr>
								<td valign="top" rowspan="3" style="border-right: 1px #000000 solid;">
									&nbsp;
								</td>
								<td width="50" style="border-bottom: 1px #000000 solid; border-right: 1px #000000 solid; font-size: 10px;">
									Сумма
								</td>
								<td width="200">&nbsp;</td>
							</tr>
							<tr>
								<td width="50" style="border-bottom: 1px #000000 solid; border-right: 1px #000000 solid; font-size: 10px;">
									&nbsp;
								</td>
								<td width="200" style="border-bottom: 1px #000000 solid;">
									&nbsp;
								</td>
							</tr>
							<tr>
								<td width="50" style="border-bottom: 1px #000000 solid; border-right: 1px #000000 solid; font-size: 10px;">
									Сч. №
								</td>
								<td width="200">&nbsp;</td>
							</tr>
							<tr>
								<td valign="bottom" style="border-bottom: 1px #000000 solid; border-right: 1px #000000 solid; font-size: 10px;">
									Плательщик
								</td>
								<td width="50" style="border-bottom: 1px #000000 solid; border-right: 1px #000000 solid; font-size: 10px;">
									&nbsp;
								</td>
								<td width="200">&nbsp;</td>
							</tr>
							<tr>
								<td rowspan="2" style="border-right: 1px #000000 solid;">
									&nbsp;
								</td>
								<td width="50" style="border-bottom: 1px #000000 solid; border-right: 1px #000000 solid; font-size: 10px;">
									БИК
								</td>
								<td width="200">&nbsp;</td>
							</tr>
							<tr>
								<td width="50" style="border-bottom: 1px #000000 solid; border-right: 1px #000000 solid; font-size: 10px;">
									Сч. №
								</td>
								<td width="200">&nbsp;</td>
							</tr>
							<tr>
								<td valign="bottom" style="border-right: 1px #000000 solid; font-size: 10px;">
									Банк плательщика
								</td>
								<td width="50" style="border-right: 1px #000000 solid; font-size: 10px;">
									&nbsp;
								</td>
								<td width="200">&nbsp;</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td colspan="2" width="100%" align="center" style="border-top: 1px #000000 solid;">
						<table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
							<tr>
								<td rowspan="2" style="border-right: 1px #000000 solid;">
									&nbsp;
								</td>
								<td width="50" style="border-right: 1px #000000 solid; border-bottom: 1px #000000 solid; font-size: 10px;">
									БИК
								</td>
								<td width="200">&nbsp;</td>
							</tr>
							<tr>
								<td width="50" style="border-right: 1px #000000 solid; border-bottom: 1px #000000 solid; font-size: 10px;">
									Сч. №
								</td>
								<td width="200">&nbsp;</td>
							</tr>
							<tr>
								<td valign="bottom" style="border-right: 1px #000000 solid; border-bottom: 1px #000000 solid; font-size: 10px;">
									Банк получателя
								</td>
								<td width="50" style="border-right: 1px #000000 solid; border-bottom: 1px #000000 solid; font-size: 10px;">
									&nbsp;
								</td>
								<td width="200">&nbsp;</td>
							</tr>
							<tr>
								<td rowspan="3" valign="top" style="border-right: 1px #000000 solid;">
									&nbsp;
								</td>
								<td width="50" style="border-right: 1px #000000 solid; border-bottom: 1px #000000 solid; font-size: 10px;">
									Сч. №
								</td>
								<td width="200">&nbsp;</td>
							</tr>
							<tr>
								<td width="50" style="border-right: 1px #000000 solid; border-bottom: 1px #000000 solid; font-size: 10px;">
									&nbsp;
								</td>
								<td width="200" style="border-bottom: 1px #000000 solid;">
									&nbsp;
								</td>
							</tr>
							<tr>
								<td width="250" colspan="2" rowspan="2">
									<table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
										<tr>
											<td width="50" style="border-right: 1px #000000 solid; border-bottom: 1px #000000 solid; font-size: 10px;">
												Вид оп.
											</td>
											<td style="border-right: 1px #000000 solid; font-size: 10px;">&nbsp;01</td>
											<td width="80" style="border-right: 1px #000000 solid; border-bottom: 1px #000000 solid; font-size: 10px;">
												Срок плат.
											</td>
											<td style="font-size: 10px;">&nbsp;</td>
										</tr>
										<tr>
											<td width="50" style="border-right: 1px #000000 solid; border-bottom: 1px #000000 solid; font-size: 10px;">
												Наз. пл.
											</td>
											<td style="border-right: 1px #000000 solid; font-size: 10px;">&nbsp;</td>
											<td width="80" style="border-right: 1px #000000 solid; border-bottom: 1px #000000 solid; font-size: 10px;">
												Очер. плат.
											</td>
											<td style="font-size: 10px;">&nbsp;6</td>
										</tr>
										<tr>
											<td width="50" style="border-right: 1px #000000 solid; border-bottom: 1px #000000 solid; font-size: 10px;">
												Код
											</td>
											<td style="border-right: 1px #000000 solid; font-size: 10px;">&nbsp;</td>
											<td width="80" style="border-right: 1px #000000 solid; border-bottom: 1px #000000 solid; font-size: 10px;">
												Рез. поле
											</td>
											<td style="font-size: 10px;">&nbsp;</td>
										</tr>
										<tr>
											<td width="50" style="border-right: 1px #000000 solid; font-size: 10px;">
												&nbsp;
											</td>
											<td style="border-right: 1px #000000 solid; font-size: 10px;">&nbsp;</td>
											<td width="80" style="border-right: 1px #000000 solid; font-size: 10px;">
												&nbsp;
											</td>
											<td style="font-size: 10px;">&nbsp;</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td valign="bottom" style="border-right: 1px #000000 solid; font-size: 10px;">
									Получатель
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td colspan="2" width="100%" height="16" valign="top" style="border-top: 1px #000000 solid; font-size: 10px;">
						назначение платежа
					</td>
				</tr>
				<tr>
					<td align="left" valign="top" colspan="2" width="100%" style="border-bottom: 1px #000000 solid;">
						Оплата по договору ......<br>Без НДС</br>
					</td>
				</tr>
				<tr>
					<td width="40" height="16">
						&nbsp;
					</td>
					<td height="16">
						<table border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td align="center" valign="top" style="font-size: 10px;">
									Подписи
								</td>
								<td width="250" align="center" valign="top" style="font-size: 10px;" nowrap>
									Отметки банка
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td width="40" align="center">
						М.П.
					</td>
					<td height="60">
						<table border="0" cellpadding="0" cellspacing="0" width="100%" height="60">
							<tr>
								<td width="50">&nbsp;</td>
								<td width="150" style="border-bottom: 1px #000000 solid;">
									&nbsp;
								</td>
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td width="50">&nbsp;</td>
								<td width="150" style="border-bottom: 1px #000000 solid;">
									&nbsp;
								</td>
								<td>&nbsp;</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</div>
	);
}
