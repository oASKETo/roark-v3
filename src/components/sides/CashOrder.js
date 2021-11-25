import "./CashOrder.css";

function getTable(Original) {
	const output = [];
	for (var i = 0, len = Original.length; i < len; i += 1) {
		output.push(+Original.charAt(i));
	}
	const getTables = output.map((output) => <td class="table-css">{output}</td>);
	return getTables;
}
export default function CashOrder() {
	const recipientsName = "УФК по Калужской области ( ИФНС России по Ленинскому округу города Калуги)";
	const bank = "ГРКЦ ГУ Банка России по Тюменской обл.";
	const kpp = "402701001";

	const budgetСlassification = "Код бюджетной Классификации";
	const stateDuty = "Госпошлина в суд";
	const paymentDescription = "(наименование платежа)";
	const fio = "Ф.И.О. плательщика";
	const payersAddress = "Адрес плательщика";
	const amountPayment = "Сумма платежа";
	const information = "С условием приема указанной в платёжном документе суммы, в т.ч. с суммой взаимной платы за услуги банка, ознакомлен и согласен ";

	const bik = "012908002";
	const budgetClassificationCode = "182 1 08 01000 01 1050 110";

	//Разбиваем полученный ИНН из базы
	const innOriginal = "4027018228";

	const inn = getTable(innOriginal);
	//Разбиваем полученный номер счёта из базы
	const accountNumberOriginal = "03100643000000013700";
	const accountNumber = getTable(accountNumberOriginal);
	return (
		<div class="b-blankContainer b-blankContainer--invoice">
			<div class="b-blank-invoice ppf">
				<div class="right-col">
					<div class="label1">Квитанция</div>
					<div class="label2">Кассир</div>
				</div>
				<div class="left-col">
					<div class="label1-1">
						<div class="label1-1-text">{recipientsName}</div>
					</div>
					<div class="label1">(наименование получателя)</div>
					<div class="label2">(ИНН получателя платежа)</div>

					<div class="table-bottom">
						<table>{inn}</table>
					</div>

					{/* <div class="label2-1">{inn}</div> */}
					<div class="label3">(номер счета получателя платежа)</div>

					<div class="table-bottom table-left">
						<table>{accountNumber}</table>
					</div>

					<div class="label-bank">{bank}</div>
					<div class="label-budget-classification">{budgetСlassification}</div>
					<div class="label-state-duty">{stateDuty}</div>
					<div class="label-payment-description">{paymentDescription}</div>
					<div class="label-fio">{fio}</div>
					<div class="label-payers-address">{payersAddress}</div>
					<div class="label-amount-payment">{amountPayment}</div>
					<div class="label-information">{information}</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	);
}

// export default function CashOrder() {
// 	const recipientsName = "УФК по Калужской области ( ИФНС России по Ленинскому округу города Калуги)";
// 	const inn = "4027018228";
// 	const kpp = "402701001";
// 	const accountNumber = "03100643000000013700";
// 	const bank = "ОТДЕЛЕНИЕ КАЛУГА БАНКА РОССИИ//УФК по Калужской области г. Калуга";
// 	const bik = "012908002";
// 	const budgetClassificationCode = "182 1 08 01000 01 1050 110";
// 	return (
// 		<div class="b-blankContainer b-blankContainer--invoice">
// 			<div class="b-blank-invoice ppf">
// 				<div class="right-col">
// 					<div class="label1">Квитанция</div>
// 					<div class="label2">Кассир</div>
// 				</div>
// 				<div class="left-col">
// 					<div class="label1-1">
// 						<div class="label1-1-text">{recipientsName}</div>
// 					</div>
// 					<div class="label1">(наименование получателя)</div>
// 					<div class="label2">(ИНН получателя платежа)</div>
// 					<div class="label2-1">{inn}</div>
// 					<div class="label17">(КПП получателя платежа)</div>
// 					<div class="label17-1">{kpp}</div>
// 					<div class="label3">(номер счета получателя платежа)</div>
// 					<div class="label3-1">{accountNumber}</div>
// 					<div class="label4">В</div>
// 					<div class="label4-1">
// 						<div class="label4-1-text">{bank}</div>
// 					</div>
// 					<div class="label5">(наименование банка получателя платежа)</div>
// 					<div class="label6">(БИК получателя платежа)</div>
// 					<div class="label6-1">{bik}</div>
// 					<div class="label7">Кор./сч.</div>
// 					<div class="label7-1">40102810045370000030 </div>
// 					<div class="label18">(Код ОКТМО)</div>
// 					<div class="label18-1">29701000</div>
// 					<div class="label8">(наименование платежа плательщика)</div>
// 					<div class="label8-1" id="duty_nameRes"></div>
// 					<div class="label9">(код бюджетной классификации)</div>
// 					<div class="label9-1" id="duty_cbc">
// 						{budgetClassificationCode}
// 					</div>
// 					<div class="label10">Ф.И.О. плательщика</div>
// 					<div class="label10-1" id="duty_namePayer"></div>
// 					<div class="label11">Адрес плательщика</div>
// 					<div class="label11-1" id="duty_payerAccount"></div>
// 					<div class="label12">Сумма иска</div>
// 					<div class="label12-1" id="duty_summ">
// 						0р.
// 					</div>
// 					<div class="label13">Сумма гос. пошлины</div>
// 					<div class="label13-1" id="duty_duty">
// 						0р.
// 					</div>
// 					<div class="label14">Итого</div>
// 					<div class="label14-1" id="duty_duty_full">
// 						0р.
// 					</div>
// 					<div class="label14-2" id="duty_date"></div>
// 					<div class="label15">С условиями приема указанной в платежном документе суммы, в т.ч. с суммой взимаемой платы за услуги банка, ознакомлен и согласен.</div>
// 					<div class="label16">Подпись плательщика</div>
// 				</div>
// 				<div class="clear"></div>
// 			</div>
// 		</div>
// 	);
// }
