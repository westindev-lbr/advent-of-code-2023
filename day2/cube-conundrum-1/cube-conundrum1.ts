import * as fs from "node:fs/promises";

const buffer = await fs.readFile("./day2/input/input.txt");
const content = buffer.toString();
const contentLines = content.split("\n");

const bag: Bag = setBagWithCubes(12, 13, 14);
const games: Game[] = arrayOfGames(contentLines);

export interface Game {
	id: number;
	sequences: Color[];
}

export interface Color {
	red: number;
	green: number;
	blue: number;
}

export interface Bag {
	redCubes: number;
	greenCubes: number;
	blueCubes: number;
}

export function isValidGame(currentGame: Game, bag: Bag): boolean {
	for (const seq of currentGame.sequences) {
		if (seq.red > bag.redCubes) return false;
		if (seq.green > bag.greenCubes) return false;
		if (seq.blue > bag.blueCubes) return false;
	}
	return true;
}

export function gameSequencesToString(gameLine: string): string[] {
	return gameLine.split(/[:;\n]/);
}

export function gameSeqToGame(gameSeq: string[]): Game {
	const reg = /\d+/;
	const red = /\d+(?= red)/;
	const green = /\d+(?= green)/;
	const blue = /\d+(?= blue)/;
	const game: Game = {
		id: 0,
		sequences: [],
	};
	let matchId = gameSeq[0].match(reg);
	if (matchId) {
		game.id = parseInt(matchId[0]);
		gameSeq.map((seq) => {
			if (gameSeq.indexOf(seq) != 0) {
				const color: Color = {
					red: 0,
					green: 0,
					blue: 0,
				};
				let redVal = seq.match(red);
				color.red = redVal ? parseInt(redVal[0]) : 0;
				let greenVal = seq.match(green);
				color.green = greenVal ? parseInt(greenVal[0]) : 0;
				let blueVal = seq.match(blue);
				color.blue = blueVal ? parseInt(blueVal[0]) : 0;
				game.sequences = [...game.sequences, color];
			}
		});
	}

	return game;
}

export function arrayOfGames(contentLines: string[]): Game[] {
	let array: Game[] = [];
	contentLines.map((line) => {
		array = [...array, gameSeqToGame(gameSequencesToString(line))];
	});
	return array;
}

export function setBagWithCubes(redCubes: number, greenCubes: number, blueCubes: number): Bag {
	return <Bag>{
		redCubes: redCubes,
		greenCubes: greenCubes,
		blueCubes: blueCubes,
	};
}

export function sumOfValidGamesIds(games: Game[], bag: Bag): number {
	let result: number = 0;
	result = games
		.filter((game) => isValidGame(game, bag))
		.reduce((acc, current) => acc + current.id, 0);
	return result;
}

const result = sumOfValidGamesIds(games, bag);
console.log("Sum of valid games IDs is : ", result);
