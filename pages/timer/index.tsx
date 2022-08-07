import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useRef } from 'react'
import ScrambleGeneratorComponent from '../../components/scrambleGenerator'
import { TimerComponent } from '../../components/timer'
import { TimeStatsComponent } from '../../components/timeStats'
import { Solve }  from '../../models/solve'

const Timer: NextPage = () => {
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
				<TimeStatsComponent key={1} ref={timeStat}/>
			</div>
		</div>
	)

	async function timerStopCallback(time: number) {
			let scramble = ''
			if(scrambleGenerator.current) {
				scramble = scrambleGenerator.current.popScramble();
			}
			if(timeStat.current) {
				timeStat.current.add(new Solve(scramble, time, timeStat.current.state.userHash));
			}
	}
}

export default Timer