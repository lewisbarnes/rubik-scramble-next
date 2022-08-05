import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useRef } from 'react'

const RubikScramble: NextPage = () => {
	return (
		<div>
			<Head>
				<title>rubik-scramble</title>
				<meta name="description" content="A timer for 3x3 twisty puzzles" />
			</Head>
			<main className="flex flex-col items-center caret-transparent">
				<div id="header" className="mt-8 text-center mb-10 dark:text-white">
				</div>
				<div id="container" className='container flex-grow h-full px-1 text-center dark:text-white'>
					<h2 className='text-6xl'>rubik-scramble</h2>
				</div>

			</main>
		</div>
	)
}

export default RubikScramble
