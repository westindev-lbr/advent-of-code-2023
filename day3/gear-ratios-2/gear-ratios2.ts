import * as fs from "node:fs/promises";
import { NumberCustom, extractNumberInString, isNumber } from "../gear-ratios-1/gear-ratios1";

const buffer = await fs.readFile("./day3/input/input.txt");
const content = buffer.toString();
const contentLines = content.split("\n");

export class EngineGearAnalyst {
	numbersGearAdjactent: NumbersGearAdjacent[] = [];
	arrayNumberCustom: NumberCustom[] = [];
	gearsData: GearData[] = [];
	validGears: GearData[] = [];

	constructor(private contentLines: string[]) {
		this.arrayNumberCustom = extractNumberInString(contentLines);
	}

	setAndExtractGearsData(): void {
		for (let i = 0; i < this.contentLines.length; i++) {
			for (let j = 0; j < this.contentLines.length; j++) {
				if (isGearSymbol(this.contentLines[i][j])) {
					let gear: GearData = {
						numLine: i,
						numCol: j,
						hasTwoNumAdjacent: false,
						nbAdjacentNum: 0,
						dirFirstAdj: undefined,
						dirSecondAdj: undefined,
					};
					this.gearsData = [...this.gearsData, gear];
				}
			}
		}
	}

	#updateGearData(contentLines: string[], gear: GearData, dir: Direction): void {
		if (isNumber(contentLines[gear.numLine + dir.y][gear.numCol + dir.x])) {
			gear.nbAdjacentNum++;
			gear.nbAdjacentNum < 2 ? (gear.dirFirstAdj = dir) : (gear.dirSecondAdj = dir);
		}
		if (gear.nbAdjacentNum === 2) gear.hasTwoNumAdjacent = true;
	}

	setAndCheckAdjacentNumberOfGear(): void {
		const size = this.contentLines.length;
		for (const gear of this.gearsData) {
			// inspect WEST
			if (gear.numCol > 0) {
				this.#updateGearData(this.contentLines, gear, Direction.WE);
			}
			// inspect EAST
			if (gear.numCol < size - 1) {
				this.#updateGearData(this.contentLines, gear, Direction.EA);
			}
			// inspect NORTH
			if (gear.numLine > 0) {
				// inspect NORTH
				this.#updateGearData(this.contentLines, gear, Direction.NO);

				if (gear.dirFirstAdj !== Direction.NO && gear.dirSecondAdj !== Direction.NO) {
					// inspect NORTH-WEST
					if (gear.numCol > 0) {
						this.#updateGearData(this.contentLines, gear, Direction.NW);
					}
					// inspect NORTH-EAST
					if (gear.numCol < size - 1) {
						this.#updateGearData(this.contentLines, gear, Direction.NE);
					}
				}
			}
			// inspect SOUTH
			if (gear.numLine < size - 1) {
				// inspect SOUTH
				this.#updateGearData(this.contentLines, gear, Direction.SO);

				if (gear.dirFirstAdj !== Direction.SO && gear.dirSecondAdj !== Direction.SO) {
					// inspect SOUTH-EAST
					if (gear.numCol < size - 1) {
						this.#updateGearData(this.contentLines, gear, Direction.SE);
					}
					// inspect SOUTH-WEST
					if (gear.numCol > 0) {
						this.#updateGearData(this.contentLines, gear, Direction.SW);
					}
				}
			}
		}
	}

	filterValidGearData(): void {
		this.validGears = this.gearsData.filter((g) => g.hasTwoNumAdjacent === true);
	}

	extractNumberGearAdjacent(): void {
		for (const gear of this.validGears) {
			let firstNum = this.arrayNumberCustom.find(
				(num) =>
					gear.numLine + gear.dirFirstAdj!.y === num.numLine &&
					gear.numCol + gear.dirFirstAdj!.x >= num.startIndex &&
					gear.numCol + gear.dirFirstAdj!.x <= num.endIndex
			);
			let secondNum = this.arrayNumberCustom.find(
				(num) =>
					gear.numLine + gear.dirSecondAdj!.y === num.numLine &&
					gear.numCol + gear.dirSecondAdj!.x >= num.startIndex &&
					gear.numCol + gear.dirSecondAdj!.x <= num.endIndex
			);
			if (firstNum && secondNum) {
				let currentNumGearAdjacent: NumbersGearAdjacent = {
					numbers: [firstNum!.number, secondNum!.number],
					gearRatio: firstNum?.number * secondNum?.number,
				};
				this.numbersGearAdjactent = [...this.numbersGearAdjactent, currentNumGearAdjacent];
			} else {
				console.log("Erreur recherche nombre adjacents");
			}
		}
	}
	sumOfNumberGearAdjacentRatios(): number {
		return this.numbersGearAdjactent.reduce((acc, currentVal) => acc + currentVal.gearRatio, 0);
	}
}

export interface NumbersGearAdjacent {
	numbers: number[];
	gearRatio: number;
}

export interface GearData {
	numLine: number;
	numCol: number;
	dirFirstAdj: Direction | undefined;
	dirSecondAdj: Direction | undefined;
	hasTwoNumAdjacent: boolean;
	nbAdjacentNum: number;
}

const Direction = {
	WE: { x: -1, y: 0 },
	NW: { x: -1, y: -1 },
	NO: { x: 0, y: -1 },
	NE: { x: 1, y: -1 },
	EA: { x: 1, y: 0 },
	SE: { x: 1, y: 1 },
	SO: { x: 0, y: 1 },
	SW: { x: -1, y: 1 },
} as const;

type Direction = (typeof Direction)[keyof typeof Direction];

export function isGearSymbol(char: string): boolean {
	return char === "*";
}

const engineGearAnalyst = new EngineGearAnalyst(contentLines);
engineGearAnalyst.setAndExtractGearsData();
engineGearAnalyst.setAndCheckAdjacentNumberOfGear();
engineGearAnalyst.filterValidGearData();
engineGearAnalyst.extractNumberGearAdjacent();
const result = engineGearAnalyst.sumOfNumberGearAdjacentRatios();
console.log(`Sum of ratio's Number Gear Adjacent : ${result}`);
