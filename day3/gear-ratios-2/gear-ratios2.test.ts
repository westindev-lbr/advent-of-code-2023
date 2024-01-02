import * as fs from "node:fs/promises";
import { EngineGearAnalyst, isGearSymbol } from "./gear-ratios2";

// Test Inputs
const bufferTest = await fs.readFile("./day3/input/input-example.txt");
const contentTest = bufferTest.toString();
const contentLines = contentTest.split("\n");
// console.table(contentLines);

describe("Gear Ratios 2", () => {
	it('should return true if the char is a gear symbol "*"', () => {
		let isStar = isGearSymbol(contentLines[1][3]);
		expect(isStar).toBeTruthy();
	});
	it("should return false if the char is not a gear symbol", () => {
		let isStar = isGearSymbol(contentLines[0][3]);
		expect(isStar).toBeFalsy();
	});
	it("should return first NumbersGearAdjacent => [ 467 , 35 ] and ratio equal 16345", () => {
		const engineGearAnalyst = new EngineGearAnalyst(contentLines);
		engineGearAnalyst.setAndExtractGearsData();
		engineGearAnalyst.setAndCheckAdjacentNumberOfGear();
		engineGearAnalyst.filterValidGearData();
		engineGearAnalyst.extractNumberGearAdjacent();
		const result = engineGearAnalyst.numbersGearAdjactent[0];
		expect(result).toStrictEqual({ numbers: [467, 35], gearRatio: 16345 });
	});
	it("should return first NumbersGearAdjacent => [ 755 , 598 ] and ratio equal 451490", () => {
		const engineGearAnalyst = new EngineGearAnalyst(contentLines);
		engineGearAnalyst.setAndExtractGearsData();
		engineGearAnalyst.setAndCheckAdjacentNumberOfGear();
		engineGearAnalyst.filterValidGearData();
		engineGearAnalyst.extractNumberGearAdjacent();
		const result = engineGearAnalyst.numbersGearAdjactent[1];
		expect(result).toStrictEqual({ numbers: [755, 598], gearRatio: 451490 });
	});
	it("should return a sum of 467835", () => {
		const engineGearAnalyst = new EngineGearAnalyst(contentLines);
		engineGearAnalyst.setAndExtractGearsData();
		engineGearAnalyst.setAndCheckAdjacentNumberOfGear();
		engineGearAnalyst.filterValidGearData();
		engineGearAnalyst.extractNumberGearAdjacent();
		const result = engineGearAnalyst.sumOfNumberGearAdjacentRatios();
		expect(result).toBe(467835);
	});
});
