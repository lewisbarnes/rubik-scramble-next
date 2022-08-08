import type { NextPage, NextPageContext } from 'next'
import Head from "next/head";

import { SolveTable } from "../../components/solveTable";
import { Solve } from '../../models/solve';
import RubikAPI from '../../utils/rubikAPI';

interface Props {
	footprint: string;
	solveData: Array<Solve>;
}

const Solves: NextPage<Props> = ({ footprint, solveData }) => {
	return (
		<div>
			<Head>
				<title>rubik-scramble : solves</title>
				<meta name="description" content="A timer for 3x3 twisty puzzles" />
			</Head>
			<main>
				<div className='flex flex-col items-center text-center'>
					<SolveTable footprint={footprint} data={solveData}/>
				</div>
			</main>
		</div>
	)
}

export async function getServerSideProps(ctx: NextPageContext) {
	let footprint = await RubikAPI.Helper.getFootprint(ctx);
	let solveData;
	if(footprint) {
		solveData = await RubikAPI.Helper.findAllSolves(footprint);
	}
	return {props: { footprint, solveData }};
}

export default Solves;