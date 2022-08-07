import type { NextPage } from 'next'
import Head from "next/head";

import { SolveTable } from "../../components/solveTable";
import { Solve } from '../../models/solve';

const Solves: NextPage<{ data : Array<Solve>}> = ({ data }) => {
	return (
		<div>
			<Head>
				<title>rubik-scramble : solves</title>
				<meta name="description" content="A timer for 3x3 twisty puzzles" />
			</Head>
			<main>
				<div className='flex flex-col items-center text-center'>
					<SolveTable/>
				</div>
			</main>
		</div>
	)
}

export default Solves;