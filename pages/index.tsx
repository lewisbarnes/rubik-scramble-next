import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import version from '../package.json'

const RubikScramble: NextPage = () => {
	return (
		<div className='h-full'>
			<Head>
				<title>rubik-scramble</title>
				<meta name="description" content="A timer for 3x3 twisty puzzles" />
			</Head>
			<main className="flex flex-col h-full items-center caret-transparent ">
				<div id="container" className='flex flex-col text-center flex-grow h-full  place-content-center'>
					<div className='text-4xl'>{version.name}</div>
				</div>
			</main>
		</div>
	)
}

export default RubikScramble
