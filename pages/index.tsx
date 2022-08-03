import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useRef } from 'react'
import { useState } from 'react'
import { ScrambleGen } from '../components/scrambleGen'
import { SolveDisplay } from '../components/solveDisplay'
import { Timer } from '../components/timer'
import { Solve } from '../types/solve'

const Home: NextPage = () => {
	let [mode, setMode] = useState('timer');
	let [numScrambles, setNumScrambles] = useState(1);
	let [solves, setSolves] = useState(new Array<Solve>);
	let [currentScramble, setCurrentScramble] = useState(new Array<string>);
	let scrambleGenElement =  useRef<ScrambleGen>(null);
	let solvesElement = useRef<SolveDisplay>(null);
	let [solvesVisible, setSolvesVisible] = useState(false);
	return (
		<div>
			<Head>
				<title>rubik-scramble</title>
				<meta name="description" content="A timer for 3x3 twisty puzzles" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex flex-col bg-black min-h-screen items-center caret-transparent">
				<div id="header" className="mt-8 text-center mb-10 text-white">
					<h2 id="header-title" className="font-fira text-2xl md:text-4xl">rubik-scramble</h2>
				</div>
				<div id="container" className='container flex-grow h-full px-8 text-center text-white'>
					<ScrambleGen ref={scrambleGenElement} numScrambles={numScrambles} mode={mode} scrambleCallback={scrambleCallback}/>
					{ mode == 'timer' ? <Timer stopCallback={timerStopCallback} /> : '' }
					{ mode == 'timer' ? <SolveDisplay solves={solves}/> : ''}
				</div>
				<div className='w-full text-white text-center m-4 font-fira'>
					<button className={`${mode == 'timer' ? 'bg-white text-black' : 'text-white'} mx-2 p-2 rounded-md`} onClick={timerMode.bind(this)}>timer-mode</button>
					<button className={`${mode == 'scramble' ? 'bg-white text-black' : 'text-white'} mx-2 p-2 rounded-md`} onClick={scrambleMode.bind(this)}>scramble-mode</button>
				</div>
				<div className='flex flex-col items-center pb-4'>
				</div>
			</main>
		</div>
	)

	function timerMode() {
		setMode('timer');
		setNumScrambles(1);
	}

	function scrambleMode() {
		setMode('scramble');
		setNumScrambles(25);
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

export default Home
