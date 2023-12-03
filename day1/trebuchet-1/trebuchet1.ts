import * as fs from "node:fs/promises";

export const bufferTest = await fs.readFile("./day1/trebuchet-1/input-example.txt");
export const buffer = await fs.readFile("./day1/trebuchet-1/input.txt");
export const contentTest = bufferTest.toString();
export const content = buffer.toString();
export const contentTestLines = contentTest.split("\n");

export const CalibrationValueByLine = (line: string): number => {
	const reg = /\d/g;
	let calibValsTab: string[] = [];
	let occurNumbers = line.match(reg);
	if (occurNumbers && occurNumbers.length > 0) {
		calibValsTab = [
			...calibValsTab,
			`${occurNumbers[0]}${occurNumbers[occurNumbers.length - 1]}`,
		];
		return parseInt(calibValsTab[0]);
	}
	return 0;
};

export const CalibrationValue = (content: string): number => {
	if (content !== undefined) {
		const lines: string[] = content.split("\n");
		return lines
			.map((l) => CalibrationValueByLine(l))
			.reduce((acc, current) => acc + current, 0);
	} else {
		throw new Error("Error : content is undefined");
	}
};

const result = CalibrationValue(content);
console.log(result);
