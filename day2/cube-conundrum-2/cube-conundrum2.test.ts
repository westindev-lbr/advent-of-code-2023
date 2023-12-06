import * as fs from "node:fs/promises";
import {
	Game,
	arrayOfGames,
	fewestNbOfCubesEachColor,
	powerOfSet,
	sumOfPowerOfSets,
} from "./cube-conundrum2";

// Test Inputs
const bufferTest = await fs.readFile("./day2/input/input-example.txt");
const contentTest = bufferTest.toString();
const contentLines = contentTest.split("\n");

const games: Game[] = arrayOfGames(contentLines);

describe("Cube Conundrum 2", () => {
	it("should return set {red:4 , green: 2, blue: 6} for Game 1 ", () => {
		const colorSet = fewestNbOfCubesEachColor(games[0]);
		expect(colorSet).toEqual({ red: 4, green: 2, blue: 6 });
	});
	it("should return 48 for power of the set of Game 1 ", () => {
		const colorSet = fewestNbOfCubesEachColor(games[0]);
		const result = powerOfSet(colorSet);
		expect(result).toBe(48);
	});
	it("should return 12 for power of the set of Game 2 ", () => {
		const colorSet = fewestNbOfCubesEachColor(games[1]);
		const result = powerOfSet(colorSet);
		expect(result).toBe(12);
	});
	it("should return 1560 for power of the set of Game 3 ", () => {
		const colorSet = fewestNbOfCubesEachColor(games[2]);
		const result = powerOfSet(colorSet);
		expect(result).toBe(1560);
	});
	it("should return 630 for power of the set of Game 4 ", () => {
		const colorSet = fewestNbOfCubesEachColor(games[3]);
		const result = powerOfSet(colorSet);
		expect(result).toBe(630);
	});
	it("should return 36 for power of the set of Game 5 ", () => {
		const colorSet = fewestNbOfCubesEachColor(games[4]);
		const result = powerOfSet(colorSet);
		expect(result).toBe(36);
	});
	it("should return 2286 for sum of the power of these sets", () => {
		const result = sumOfPowerOfSets(games);
		expect(result).toBe(2286);
	});
});
