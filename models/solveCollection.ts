import { Solve } from './solve'
import { averageTime } from '../utils/time';
import Cookies from 'universal-cookie';

export class SolveCollection {
	solves: Array<Solve>;
	currentAOFive: number;
	currentAOTwelve: number;
	lastTime: number;
	bestTime: number;
	constructor(solves: Solve[] = new Array<Solve>()) {
		this.solves = solves;
		this.lastTime = 0;
		this.bestTime = 0;
		this.currentAOFive = 0;
		this.currentAOTwelve = 0;
		this.assignSolves();
		this.calculateStatistics();
	}

	calculateStatistics() {
		if(this.solves.length == 0) {
			return;
		}
		this.solves.reverse();
		this.solves = this.solves.map((x, i) => {return new Solve(x.scramble, x.time, x.userHash, this.getAverage(5, i), this.getAverage(12, i), x._id)});
		let lastSolve = this.solves[0];
		if(lastSolve) {
			this.currentAOFive = lastSolve.averageOfFive;
			this.currentAOTwelve = lastSolve.averageOfTwelve;
			this.lastTime = lastSolve.time;

			let sortedSolves = this.solves.slice();
			sortedSolves.sort((a, b) => { return a.time <= b.time ? -1 : 1})
			let bestTime = sortedSolves[0];
			if(bestTime) {
				this.bestTime = bestTime.time;
			}
		}
	}

	getAverage(num: number, startIndex: number) {
		if(this.solves.length < num) {
			return 0;
		}
		let timeSubset = this.solves.slice(startIndex,(startIndex+num)+1);
		if(timeSubset.length < num) {
			return 0;
		}
		timeSubset.sort((a, b) => { return a.time < b.time ? -1 : 1});
		let bestNum = Math.ceil(timeSubset.length * 0.05);
		let bestN = timeSubset.slice(bestNum,num-bestNum);
		return averageTime(bestN.map(x => x.time));
	}

	assignSolves() {
		this.solves = this.solves.map((x) => { let temp = new Solve(); Object.assign(temp, x); return temp});
	}

	async addSolve(solve: Solve, toDB: boolean = false) {
		this.solves.push(solve);
		if(toDB) {
			fetch(`api/solves`, { method: 'POST', body: JSON.stringify(solve)});
		}
		this.calculateStatistics();
		return this;
	}
}