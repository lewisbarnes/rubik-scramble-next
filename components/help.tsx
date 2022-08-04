export const Help : React.FunctionComponent = () => {
	return (
		<div className='font-fira flex flex-col items-center'>
			<p className='mb-4'>{'{space}'} to start/stop timer</p>
			<p className='mb-4'>{'{number}'} to enter time manually, the following regex is matched {'\'/[0-5]{1}[0-9]{1}[0-5]{1}[0-9]{1}[0-9]{3}/\''}</p>
			<p className='mb-4'>{'{enter}'} to submit manually input time</p>
		</div>
	)
}