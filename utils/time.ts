 

 export function formatTime(time: number) {
	let timeString: string = '';
	timeString += Math.floor(((time / 1000) / 60)) >= 1 ? `${Math.floor(((time / 1000) / 60)).toString().padStart(2,'0')}:` : '';
	timeString +=  Math.floor(((time / 1000) % 60)) >= 1 ? `${Math.floor(((time / 1000) % 60)).toString().padStart(2,'0')}.` : '00.';
	timeString += `${Math.floor((time % 1000)).toString().padStart(3,'0')}`;
	return timeString;
 }

 export function averageTime(times: Array<number>) {
	let timeAverage = 0;
	return times.reduce((a, b) => { return a + b }, timeAverage) / times.length;
}