import type { NextPage } from 'next'
import Head from "next/head";

import { SolveTable } from "../../components/solveTable";

const Solves: NextPage = () => {
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