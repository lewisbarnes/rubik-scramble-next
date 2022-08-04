import React from 'react'

export const About : React.FunctionComponent = () => {
	return (
		<div className='font-fira flex flex-col items-center'>
			<p>rubik-scramble is a minimal scramble generator and timer for 3x3 twisty puzzles
				created by <a href='https://github.com/lewisbarnes' className='underline'>Lewis Barnes</a></p>
			<p>it is written in React on <a href='https://nextjs.org/' className='underline'>next.js</a> using TypeScript</p>
			<p>here is the <a href='https://github.com/lewisbarnes/rubik-scramble-next' className='underline'>source code</a></p>
		</div>
	)
}