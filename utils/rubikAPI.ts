import { Console } from "console";
import { NextPageContext } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Solve } from "../models/solve";
import { SolveCollection } from "../models/solveCollection";

namespace RubikAPI {
	export class Helper {

		static dev = process.env.NODE_ENV !== 'production';
		static server = this.dev ? 'http://localhost:3000' : 'https://rubik-scramble.vercel.app';
		
		static async findAllSolves(footprint: string) {
			return await (await fetch(`${this.server}/api/solves/${footprint}`)).json();
		}

		static async addSolve(solve: Solve, footprint: string) {
			fetch(`${this.server}/api/solves/${footprint}/add`, { method: 'POST', body: JSON.stringify({solve: solve, footprint: footprint}), headers: { 'Content-Type': 'application/json' }});
		}

		static async createUser() {
			return await fetch(`${this.server}/api/users`,{method: 'POST', body: JSON.stringify({ footprint: 'null-fp' })});
		}

		static async getUser(footprint: string) {
			return await fetch(`${this.server}/api/users/${footprint}`,{method: 'PATCH'});
		}

		static async getFootprint(ctx: NextPageContext) {
			let cookies = ctx.req?.headers.cookie?.split(';');
			let session = cookies?.find(x => x.trim().startsWith('rs-session'))?.split('=')[1];
			let footprint = cookies?.find(x => x.trim().startsWith('rs-fp'))?.split('=')[1];
			let fpJSON;
			if(session === undefined) {
				let sessionCookie = `rs-session=${Date.now()};`;
				if(footprint) {
					let req = await RubikAPI.Helper.getUser(footprint);
					fpJSON = await req.json();
				} else {
					let req = await RubikAPI.Helper.createUser();
					fpJSON = await req.json();
				}
				footprint = fpJSON.footprint;
				let d = new Date();
				let footprintCookie = `rs-fp=${footprint};expires=${new Date(d.getFullYear() + 1,d.getMonth(),d.getDate())};`;
				ctx.res?.setHeader('Set-Cookie',[sessionCookie,footprintCookie]);
			}
			return footprint;
		}
	}
}

export default RubikAPI;





