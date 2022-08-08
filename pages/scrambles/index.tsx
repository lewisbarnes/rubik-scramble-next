import { NextPage } from "next";
import Head from "next/head";
import { useRef } from "react";
import ScrambleList from "../../components/scrambleList";

const Scrambles: NextPage = () => {
	let scrambleList =  useRef<ScrambleList>(null);
	return (
		<div className='max-w-full'>
			<Head>
				<title>rubik-scramble : timer</title>
				<meta name="description" content="A timer for 3x3 twisty puzzles" />
			</Head>
			<div className='flex flex-col items-center max-h-full text-center'>
				<ScrambleList ref={scrambleList} hidden={false} displaySingle={false}/>
			</div>
		</div>
	)
}

export default Scrambles