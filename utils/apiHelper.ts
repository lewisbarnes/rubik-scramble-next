import { Console } from "console";
import { Solve } from "../models/solve";
import clientPromise from "./mongodb";

export async function getSolves(): Promise<Array<Solve>> {
	try {
		let res = await fetch('api/solves');
		if(res.status == 200) {
			let data = await res.json() as Array<Solve>;
			data = data.map(x => x = new Solve(x.scramble, x.time, x.averageOfFive, x.averageOfTwelve, x._id));
			return data;
		}
		return new Array<Solve>();
	} catch(error) {
		console.log(error);
	}
	return new Array<Solve>();
}

