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
				<TimeStatsComponent ref={timeStat}/>
			</div>
		</div>
	)
	function timerStopCallback(time: number) {
		if(timeStat.current != null) {
			let scramble = ''
			if(scrambleGenerator.current != null) {
				scramble = scrambleGenerator.current.popScramble();
			}
			timeStat.current.addSolve(new Solve(scramble, time, timeStat.current ? timeStat.current.average(5) : 0, timeStat.current ? timeStat.current.average(12) : 0));
		}
	}
}

export default Timer