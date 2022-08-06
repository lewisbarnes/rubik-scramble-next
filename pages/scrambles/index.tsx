import { NextPage } from "next";
import Head from "next/head";
import { useRef } from "react";
import ScrambleGeneratorComponent from "../../components/scrambleGenerator";

const Scrambles: NextPage = () => {
	let scrambleGenerator =  useRef<ScrambleGeneratorComponent>(null);
	return (
		<div className='max-w-full'>
			<Head>
				<title>rubik-scramble : timer</title>
				<meta name="description" content="A timer for 3x3 twisty puzzles" />
			</Head>
			<div className='flex flex-col items-center max-h-full text-center'>
				<ScrambleGeneratorComponent ref={scrambleGenerator} numScrambles={25} hidden={false} displaySingle={false}/>
			</div>
		</div>
	)
}

export default Scrambles