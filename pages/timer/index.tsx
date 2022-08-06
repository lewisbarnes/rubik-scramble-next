import type { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React, { useRef } from 'react'
import ScrambleGeneratorComponent from '../../components/scrambleGenerator'
import { TimerComponent } from '../../components/timer'
import { TimeStatsComponent } from '../../components/timeStats'
import { Solve }  from '../../models/solve'
import { SolveCollection } from '../../models/solveCollection'

const Timer: NextPage<{ data : Array<Solve>}> = ({ data }) => {
	let scrambleGenerator =  useRef<ScrambleGeneratorComponent>(null);
	let timeStat =  useRef<TimeStatsComponent>(null);
	return (
		<div className='max-w-full'>
			<Head>
				<title>rubik-scramble : timer</title>
				<meta name="description" content="A timer for 3x3 twisty puzzles" />
			</Head>
			<div className='flex flex-col items-center max-h-full text-center'>
				<ScrambleGeneratorComponent ref={scrambleGenerator} numScrambles={25} hidden={false} displaySingle={true}/>
				<TimerComponent stopCallback={timerStopCallback} />
				<TimeStatsComponent key={data.length} Data={data} ref={timeStat}/>
			</div>
		</div>
	)

	async function timerStopCallback(time: number) {
			let scramble = ''
			if(scrambleGenerator.current) {
				scramble = scrambleGenerator.current.popScramble();
			}
			if(timeStat.current) {
				timeStat.current.add(new Solve(scramble, time));
			}
	}
}

export async function getStaticProps() {
	let solves = await (await fetch(process.env.SITE_URL + 'api/solves')).json();
	return { props: { data: JSON.parse(JSON.stringify(solves)) } };
}

export default Timer