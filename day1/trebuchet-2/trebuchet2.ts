import * as fs from "node:fs/promises";

export const buffer = await fs.readFile("./day1/trebuchet-2/input.txt");
export const content = buffer.toString();

export const regDigit = new RegExp(/\d/);
export const regNumLetter = new RegExp(/one|two|three|four|five|six|seven|eight|nine/);
export const reg = new RegExp(regDigit.source + "|" + regNumLetter.source, "g");

const numberWords: string[] = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];

export const convertCalValToNumeric = (contentLine: string, reg: RegExp): number => {
	const matches: string[] = [];
	let calibValsTab: string[] = [];
	let match: RegExpMatchArray;
	let cpy: string = contentLine;
	while (cpy) {
		match = [...cpy.matchAll(reg)][0];
		if (!match) break;
		matches.push(match[0]);
		cpy = cpy.substring(match.index! + 1);
	}

	if (matches) {
		calibValsTab = [...transformNumWordsToDigit(matches)];
		return parseInt(extractCalibrationValues(calibValsTab));
	}
	return 0;
};

export const transformNumWordsToDigit = (regexArray: string[]): string[] => {
	if (regexArray.length <= 0) {
		return [];
	}
	return regexArray.map((elt) =>
		regDigit.test(elt) ? elt : numberWords.indexOf(elt).toString()
	);
};

export const extractCalibrationValues = (regexArray: string[]): string => {
	return `${regexArray[0]}${regexArray[regexArray.length - 1]}`;
};

export const sumOfCalibrationValues = (content: string, reg: RegExp): number => {
	if (content !== undefined) {
		const lines: string[] = content.split("\n");
		return lines
			.map((l) => convertCalValToNumeric(l, reg))
			.reduce((acc, current) => acc + current, 0);
	} else {
		throw new Error("Error : content is undefined");
	}
};

const result = sumOfCalibrationValues(content, reg);
console.log("Sum of Calibration Values : " + result);
