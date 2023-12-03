import { convertCalValToNumeric, reg, sumOfCalibrationValues } from "./trebuchet2";
import * as fs from "node:fs/promises";

// Test Inputs
const bufferTest = await fs.readFile("./day1/trebuchet-2/input-example.txt");
const contentTest = bufferTest.toString();
const contentTestLines = contentTest.split("\n");

describe("Trebuchet 2", () => {
	it("should return 29 for the first line", () => {
		const result = convertCalValToNumeric(contentTestLines[0], reg);
		expect(result).toBe(29);
	});
	it("should return 83 for the second line", () => {
		const result = convertCalValToNumeric(contentTestLines[1], reg);
		expect(result).toBe(83);
	});
	it("should return 13 for the third line", () => {
		const result = convertCalValToNumeric(contentTestLines[2], reg);
		expect(result).toBe(13);
	});
	it("should return 24 for the fourth line", () => {
		const result = convertCalValToNumeric(contentTestLines[3], reg);
		expect(result).toBe(24);
	});
	it("should return 42 for the fifth line", () => {
		const result = convertCalValToNumeric(contentTestLines[4], reg);
		expect(result).toBe(42);
	});
	it("should return 14 for the sixth line", () => {
		const result = convertCalValToNumeric(contentTestLines[5], reg);
		expect(result).toBe(14);
	});
	it("should return 76 for the seventh line", () => {
		const result = convertCalValToNumeric(contentTestLines[6], reg);
		expect(result).toBe(76);
	});
	it("should return 12 for the first line", () => {
		const result = convertCalValToNumeric(contentTestLines[7], reg);
		expect(result).toBe(12);
	});

	it("should return 38 for the second line", () => {
		const result = convertCalValToNumeric(contentTestLines[8], reg);
		expect(result).toBe(38);
	});
	it("should return 15 for the third line", () => {
		const result = convertCalValToNumeric(contentTestLines[9], reg);
		expect(result).toBe(15);
	});
	it("should return 77 for the fourth line", () => {
		const result = convertCalValToNumeric(contentTestLines[10], reg);
		expect(result).toBe(77);
	});
	it("should return 51 for complex line number", () => {
		const result = convertCalValToNumeric(contentTestLines[11], reg);
		expect(result).toBe(51);
	});
	it("should return 474 for the sum of calibration values", () => {
		const result = sumOfCalibrationValues(contentTest, reg);
		expect(result).toBe(474);
	});
});
