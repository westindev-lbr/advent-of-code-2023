import * as fs from "node:fs/promises";
import {
	Bag,
	Color,
	Game,
	arrayOfGames,
	gameSeqToGame,
	gameSequencesToString,
	isValidGame,
	setBagWithCubes,
	sumOfValidGamesIds,
} from "./cube-conundrum1";

// Test Inputs
const bufferTest = await fs.readFile("./day2/input/input-example.txt");
const contentTest = bufferTest.toString();
const contentLines = contentTest.split("\n");

const bag: Bag = setBagWithCubes(12, 13, 14);
const games: Game[] = arrayOfGames(contentLines);

describe("Cube Conundrum", () => {
	it("should Game 1 is valid", () => {
		const result = isValidGame(games[0], bag);
		expect(result).toBeTruthy();
	});
	it("should Game 2 is valid", () => {
		const result = isValidGame(games[1], bag);
		expect(result).toBeTruthy();
	});
	it("should Game 1 return list of 4 sequences", () => {
		const currentGameLine = contentLines[0];
		const list = gameSequencesToString(currentGameLine);
		expect(list.length).toBe(4);
	});
	it("should Game 1 return an objet of type Game with id, red, green, blue", () => {
		const currentGameLine = contentLines[0];
		const list = gameSequencesToString(currentGameLine);
		const game1 = gameSeqToGame(list);
		expect(game1).toEqual({
			id: 1,
			sequences: [
				{ red: 4, green: 0, blue: 3 },
				{ red: 1, green: 2, blue: 6 },
				{ red: 0, green: 2, blue: 0 },
			],
		});
	});
	it("should return an array of 5 Games", () => {
		expect(games.length).toBe(5);
	});

	it("should Game 3 is not valid", () => {
		const result = isValidGame(games[2], bag);
		expect(result).toBeFalsy();
	});
	it("should Game 4 is not valid", () => {
		const result = isValidGame(games[3], bag);
		expect(result).toBeFalsy();
	});

	it("should return a Bag of cubes", () => {
		const bag: Bag = setBagWithCubes(12, 13, 14);
		expect(bag).toEqual({ redCubes: 12, greenCubes: 13, blueCubes: 14 });
	});

	it("should return 8 for the Sum of the IDs of valid games", () => {
		const result: number = sumOfValidGamesIds(games, bag);
		expect(result).toBe(8);
	});
});
