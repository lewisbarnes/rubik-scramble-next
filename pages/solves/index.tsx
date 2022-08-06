import type { NextPage } from 'next'
import Head from "next/head";

import { SolveTable } from "../../components/solveTable";
import { Solve } from '../../models/solve';
import { SolveCollection } from '../../models/solveCollection';
import { getSolves } from '../../utils/apiHelper';

const Solves: NextPage<{ data : Array<Solve>}> = ({ data }) => {
	return (
		<div>
			<Head>
				<title>rubik-scramble : solves</title>
				<meta name="description" content="A timer for 3x3 twisty puzzles" />
			</Head>
			<main>
				<div className='flex flex-col items-center text-center'>
					<SolveTable Data={data}/>
				</div>
			</main>
		</div>
	)
}

export async function getStaticProps() {
	let solves = await (await fetch(process.env.SITE_URL + 'api/solves')).json();
	return { props: { data: JSON.parse(JSON.stringify(solves)) } };
}

export default Solves;