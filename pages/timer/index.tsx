import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import React, { useRef } from 'react'
import ScrambleList from '../../components/scrambleList'
import TimerComponent from '../../components/timer'
import { TimeStatsComponent } from '../../components/timeStats'
import { Solve }  from '../../models/solve'
import RubikAPI from '../../utils/rubikAPI'
import Cookies from 'universal-cookie';

interface Props {
	footprint: string;
	solveData: Array<Solve>;
}

const Timer: NextPage<Props> = ({ footprint, solveData }) => {
	let scrambleGenerator =  useRef<ScrambleList>(null);
	let timeStat =  useRef<TimeStatsComponent>(null);

	return (
		<div className='max-w-full h-full '>
			<Head>
				<title>rubik-scramble : timer</title>
				<meta name="description" content="A timer for 3x3 twisty puzzles" />
			</Head>
			<div className='flex flex-col items-center h-full place-content-center text-center'>
				<ScrambleList key={1} ref={scrambleGenerator} hidden={false} displaySingle={true}/>
				<TimerComponent key={1} stopCallback={timerStopCallback} />
				<TimeStatsComponent key={1} footprint={footprint} data={solveData} ref={timeStat}/>
			</div>
		</div>
	)

	async function timerStopCallback(time: number, method: string) {
		let scramble = '';
		if(scrambleGenerator.current) {
			scramble = scrambleGenerator.current.nextScramble();
		}
		if(timeStat.current) {
			let solve = new Solve(scramble, time, method);
			RubikAPI.Helper.addSolve(solve, footprint);
			timeStat.current.add(solve);
		}
	}
}

export async function getServerSideProps(ctx: NextPageContext) {
	let footprint = await RubikAPI.Helper.getFootprint(ctx);
	let solveData;
	if(footprint) {
		solveData = await RubikAPI.Helper.findAllSolves(footprint);
	}
	return {props: { footprint, solveData }};
}

export default Timer