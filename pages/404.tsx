import { NextPage } from "next";


const FourOhFour: NextPage = () => {
	return (
		<main className="flex flex-col items-center caret-transparent">
			<div id="header" className="mt-8 text-center mb-10 dark:text-white">
			</div>
			<div id="container" className='container flex-grow h-full px-1 text-center dark:text-white'>
				<h2 className='text-6xl'>404 | page not found</h2>
			</div>
		</main>
	);
}

export default FourOhFour;