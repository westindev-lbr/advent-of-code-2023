import {
	CalibrationValue,
	CalibrationValueByLine,
	contentTest,
	contentTestLines,
} from "./trebuchet1";

describe("Trebuchet 1", () => {
	it("should return 12 for the first line", () => {
		const result = CalibrationValueByLine(contentTestLines[0]);
		expect(result).toBe(12);
	});

	it("should return 38 for the second line", () => {
		const result = CalibrationValueByLine(contentTestLines[1]);
		expect(result).toBe(38);
	});
	it("should return 15 for the third line", () => {
		const result = CalibrationValueByLine(contentTestLines[2]);
		expect(result).toBe(15);
	});
	it("should return 77 for the fourth line", () => {
		const result = CalibrationValueByLine(contentTestLines[3]);
		expect(result).toBe(77);
	});
	it("should return 0 for line without number", () => {
		const content = "abc";
		const result = CalibrationValueByLine(content);
		expect(result).toBe(0);
	});
	it("should return 142 for the sum of CalibrationValues", () => {
		const result = CalibrationValue(contentTest);
		expect(result).toBe(142);
	});
});
