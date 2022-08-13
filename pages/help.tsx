import { NextPage } from "next"

export const Help : NextPage = () => {
	return (
		<main className='font-fira flex h-full flex-col items-center space-y-4 place-content-center'>
			<p className=''>{'{space}'} to start/stop timer</p>
			<p className=''>{'{number}'} to enter time manually</p>
			<p className=''>{'{enter}'} to submit manually input time</p>
		</main>
	)
}

export default Help;