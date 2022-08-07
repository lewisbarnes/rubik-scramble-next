import { Console } from "console";
import { Solve } from "../models/solve";
import { SolveCollection } from "../models/solveCollection";

namespace RubikAPI {
	export class Helper {

		static dev = process.env.NODE_ENV !== 'production';
		static server = this.dev ? 'http://localhost:3000' : 'https://rubik-scramble.vercel.app';
		
		static async findAllSolves() {
			return await (await fetch(`${this.server}/api/solves`)).json();
		}

		static async addSolve() {
			return await (await fetch(`${this.server}/api/solves`)).json();
		}

		static async createUser() {
			return await fetch(`${this.server}/api/users`,{method: 'POST', body: JSON.stringify({ userID: 'newUser'}) });
		}
	}
}
export default RubikAPI;





