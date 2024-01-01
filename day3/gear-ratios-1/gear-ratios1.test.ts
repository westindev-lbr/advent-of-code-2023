import * as fs from "node:fs/promises";
import {
	arrayOfNumberValid,
	checkNumberValid,
	extractNumberInString,
	isPoint,
	sumOfValidNumbers,
} from "./gear-ratios1";

// Test Inputs
const bufferTest = await fs.readFile("./day3/input/input-example.txt");
const contentTest = bufferTest.toString();
const contentLines = contentTest.split("\n");
const content2D = contentLines.map((e) => e.split(""));
console.table(content2D);

describe("Gear Ratios 1", () => {
	it("should return true when we find '.'", () => {
		const result = isPoint(contentLines[0][3]);
		expect(result).toBeTruthy();
	});
	it("should return false when we find a different symbol that '.'", () => {
		const result = isPoint(contentLines[0][2]);
		expect(result).toBeFalsy();
	});
	it("should return [467, 35, 633, 617, 592, 755, 664, 598] valid numbers in test input", () => {
		const arrayNumbers = extractNumberInString(contentLines);
		console.log(arrayNumbers);
		checkNumberValid(contentLines, arrayNumbers);
		const result = arrayOfNumberValid(arrayNumbers);
		expect(result).toStrictEqual([467, 35, 633, 617, 592, 755, 664, 598]);
	});
	it("should return 4361 sum of valid numbers", () => {
		const arrayNumbers = extractNumberInString(contentLines);
		checkNumberValid(contentLines, arrayNumbers);
		const arrayValidNumbers = arrayOfNumberValid(arrayNumbers);
		const result = sumOfValidNumbers(arrayValidNumbers);
		expect(result).toBe(4361);
	});
});
