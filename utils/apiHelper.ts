import { Console } from "console";
import { Solve } from "../models/solve";
import { SolveCollection } from "../models/solveCollection";

export async function getSolves(): Promise<SolveCollection> {
	try {
		let res = await fetch('api/solves');
		if(res.status == 200) {
			let data = await res.json() as Array<Solve>;
			data = data.map(x => x = new Solve(x.scramble, x.time,0,0,x._id));
			return new SolveCollection(data);
		}
	} catch(error) {
		console.log(error);
	}
	return new SolveCollection(new Array<Solve>());
}

export async function addSolve(solve: Solve) {
	let res = await fetch('api/solves');
	
}

