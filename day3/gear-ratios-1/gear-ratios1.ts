import * as fs from "node:fs/promises";

const buffer = await fs.readFile("./day3/input/input.txt");
const content = buffer.toString();
const contentLines = content.split("\n");

export interface NumberCustom {
	number: number;
	numLine: number;
	startIndex: number;
	endIndex: number;
	isValid: boolean;
}

export function digitsNum(num: number): number {
	let count = 0;
	while (num > 0) {
		num = Math.floor(num / 10);
		count++;
	}
	return count;
}

export function isPoint(char: string): boolean {
	return char === ".";
}

export function isNumber(char: string): boolean {
	return /\d/.test(char);
}

export function isNotNumberAndNotPoint(char: string): boolean {
	if (isPoint(char) || isNumber(char)) {
		return false;
	}
	return true;
}

export function extractNumberInString(contentLines: string[]): NumberCustom[] {
	let arrayNumberCustom: NumberCustom[] = [];
	let buildNum = "";
	for (let i = 0; i < contentLines.length; i++) {
		// Vraiment moche mais bon pas le choix sans modifier l'input en rajoutant un char à la fin
		if (buildNum) {
			let currentNumber: NumberCustom = {
				number: parseInt(buildNum),
				numLine: i - 1,
				startIndex: contentLines.length - 1 - digitsNum(parseInt(buildNum)),
				endIndex: contentLines.length - 1,
				isValid: false,
			};
			arrayNumberCustom = [...arrayNumberCustom, currentNumber];
			buildNum = "";
		}
		for (let j = 0; j < contentLines.length; j++) {
			if (/\d/.test(contentLines[i][j])) {
				buildNum += contentLines[i][j];
			} else {
				if (buildNum) {
					let currentNumber: NumberCustom = {
						number: parseInt(buildNum),
						numLine: i,
						startIndex: j - digitsNum(parseInt(buildNum)),
						endIndex: j,
						isValid: false,
					};
					arrayNumberCustom = [...arrayNumberCustom, currentNumber];
					buildNum = "";
				} else {
					continue;
				}
			}
		}
	}
	return arrayNumberCustom;
}

export function arrayOfNumberValid(arrayNumberCustom: NumberCustom[]): number[] {
	let arrayNumValid: number[] = [];
	arrayNumValid = arrayNumberCustom.filter((e) => e.isValid).map((e) => e.number);
	return arrayNumValid;
}

export function checkNumberValid(contentLines: string[], arrayNumberCustom: NumberCustom[]): void {
	const size = contentLines[0].length;
	for (const number of arrayNumberCustom) {
		for (let j = number.startIndex; j < number.endIndex && !number.isValid; j++) {
			if (/\d/.test(contentLines[number.numLine][j])) {
				let m = size * number.numLine + j;
				// inspect WEST
				if (j > 0) {
					number.isValid = isNotNumberAndNotPoint(contentLines[number.numLine][j - 1]);
					if (number.isValid) continue;
				}
				// inspect EAST
				if (j < size - 1) {
					number.isValid = isNotNumberAndNotPoint(contentLines[number.numLine][j + 1]);
					if (number.isValid) continue;
				}
				// inspect NORTH
				if (number.numLine > 0) {
					number.isValid = isNotNumberAndNotPoint(contentLines[number.numLine - 1][j]);
					if (number.isValid) continue;

					// inspect NORTH-WEST
					if (j > 0) {
						number.isValid = isNotNumberAndNotPoint(
							contentLines[number.numLine - 1][j - 1]
						);
						if (number.isValid) continue;
					}
					// inspect NORTH-EAST
					if (j < size - 1) {
						number.isValid = isNotNumberAndNotPoint(
							contentLines[number.numLine - 1][j + 1]
						);
						if (number.isValid) continue;
					}
				}
				// inspect SOUTH
				if (number.numLine < size - 1) {
					number.isValid = isNotNumberAndNotPoint(contentLines[number.numLine + 1][j]);
					if (number.isValid) continue;

					// inspect SOUTH-WEST
					if (j > 0) {
						number.isValid = isNotNumberAndNotPoint(
							contentLines[number.numLine + 1][j - 1]
						);
						if (number.isValid) continue;
					}
					// inspect SOUTH-EAST
					if (j < size - 1) {
						number.isValid = isNotNumberAndNotPoint(
							contentLines[number.numLine + 1][j + 1]
						);
						if (number.isValid) continue;
					}
				}
			}
		}
	}
}

export function sumOfValidNumbers(arrayNumbers: number[]): number {
	return arrayNumbers.reduce((acc, currentVal) => acc + currentVal, 0);
}

const arrayNumbers = extractNumberInString(contentLines);
checkNumberValid(contentLines, arrayNumbers);
const arrayValidNumbers = arrayOfNumberValid(arrayNumbers);
const result = sumOfValidNumbers(arrayValidNumbers);
console.log("Sum of Valid Number : ", result);
