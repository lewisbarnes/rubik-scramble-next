import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useRef } from 'react'
import { useState } from 'react'
import { NavMenu } from '../components/navMenu'
import { NavButton } from '../components/navButton'

import { ScrambleGen } from '../components/scrambleGen'
import { SolveList } from '../components/solveList'
import { Timer } from '../components/timer'
import { Solve } from '../types/solve'
import { Help } from '../components/help'
import { Settings } from '../components/settings'
import { About } from '../components/about'

const RubikScramble: NextPage = () => {
	let [mode, setMode] = useState('timer');
	let [numScrambles, setNumScrambles] = useState(1);
	let [solves, setSolves] = useState(new Array<Solve>);
	let [currentScramble, setCurrentScramble] = useState(new Array<string>);
	let scrambleGenElement =  useRef<ScrambleGen>(null);
	let solvesElement = useRef<SolveList>(null);
	let [solvesVisible, setSolvesVisible] = useState(false);
	return (
		<div>
			<Head>
				<title>rubik-scramble</title>
				<meta name="description" content="A timer for 3x3 twisty puzzles" />
				<link rel="icon" href="/img/cube.png" />
			</Head>

			<main className="flex flex-col dark:bg-black min-h-screen items-center caret-transparent">
				<button className="bg-slate-800/90 min-h-screen min-w-full absolute z-10 hidden">
					<div className='z-50 max-w-48  dark:bg-black dark:text-white text-center'>
						<h2 className='font-fira text-xl m-4'>help</h2>
					</div>
				</button>
				<div id="header" className="mt-8 text-center mb-10 dark:text-white">
				</div>
				<div id="container" className='container flex-grow h-full px-1 text-center dark:text-white'>
					<ScrambleGen ref={scrambleGenElement} numScrambles={numScrambles} mode={mode} hidden={!(mode == 'scramble' || mode == 'timer') ? true : false} scrambleCallback={scrambleCallback} />
					{mode == 'timer' ? <Timer stopCallback={timerStopCallback} /> : ''}
					{mode == 'timer' ? <SolveList solves={solves} /> : ''}
					{mode == 'help' ? <Help /> : ''}
					{mode == 'settings' ? <Settings /> : ''}
					{mode == 'about' ? <About /> : ''}
				</div>
				<NavMenu>
					<NavButton label='timer' active={mode == 'timer' ? true : false} callback={() => { setMode('timer'); setNumScrambles(1) }} />
					<NavButton label='scrambles' active={mode == 'scramble' ? true : false} callback={() => { setMode('scramble'); setNumScrambles(25) }} />
					<NavButton label='solves' active={mode == 'solves' ? true : false} callback={() => { setMode('solves'); }} />
					<NavButton label='help' active={mode == 'help' ? true : false} callback={() => { setMode('help'); }} />
					<NavButton label='settings' active={mode == 'settings' ? true : false} callback={() => { setMode('settings'); }} />
					<NavButton label='about' active={mode == 'about' ? true : false} callback={() => { setMode('about'); }} />
				</NavMenu>
			</main>
		</div>
	)

	function timerMode() {
		setMode('timer');
		setNumScrambles(1);
	}

	function timerStopCallback(time: number) {
		solves.push({ scramble: currentScramble, time: time})
		setSolves(solves);
		scrambleGenElement.current?.generate();
	}
	
	function scrambleCallback(scramble: Array<string>) {
		setCurrentScramble(scramble);
	}
}

export default RubikScramble
