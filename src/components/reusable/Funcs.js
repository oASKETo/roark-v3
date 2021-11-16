import dayjs from "dayjs";

// parse path within object
export function parsePackage(path, obj) {
	let split = path.split(".");
	let val = obj;
	split.forEach((pk) => (val = val[pk]));
	return val;
}
export function nullUndefFix(v, ifYes) {
	return v === null || v === undefined ? ifYes : v;
}
export function tryFuncOr(func, or) {
	try {
		return func();
	} catch (error) {
		return or;
	}
}
export function isNullUndef(value) {
	return value === undefined || value === null;
}

export function isNotNullOrEmptyObject(val) {
	let result = false;
	const isTruthful = (v) => !!v;
	if (typeof val === "object" && val !== null) {
		result = Object.values(val).some(isTruthful);
	} else {
		result = isTruthful(val);
	}
	return result;
}

export function checkInn(value) {
	if (typeof value !== "string" || (value.length !== 10 && value.length !== 12) || value.split("").some((symbol) => isNaN(Number(symbol)))) return false;
	if (value.length === 10) {
		return (
			Number(value[9]) ===
			(value
				.split("")
				.slice(0, -1)
				.reduce((summ, symbol, index) => [2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) + summ, 0) %
				11) %
				10
		);
	} else if (value.length === 12) {
		let checkSumOne =
			(value
				.split("")
				.slice(0, -2)
				.reduce((summ, symbol, index) => [7, 2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) + summ, 0) %
				11) %
			10;

		let checkSumTwo =
			(value
				.split("")
				.slice(0, -1)
				.reduce((summ, symbol, index) => [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) + summ, 0) %
				11) %
			10;

		return checkSumOne === Number(value[10]) && checkSumTwo === Number(value[11]);
	}
}

export function getSortaISODateTime() {
	return dayjs().format("YYYY-MM-DD-HH:mm:ss");
}

export async function catchFetchStatusCode(response) {
	if (!response.ok) {
		console.debug("fetch returned http", response.status);
		console.debug(await response.json());
	}
	return response;
}
export function chain(...funcs) {
	return (...args) => {
		funcs.forEach((f) => typeof f === "function" && f(...args));
	};
}
