 

 export default function formatTime(time: number) {
	let timeString: string = '';
	timeString += Math.floor(((time / 1000) / 60)) >= 1 ? `${Math.floor(((time / 1000) / 60)).toString().padStart(2,'0')}:` : '';
	timeString +=  Math.floor(((time / 1000) % 60)) >= 1 ? `${Math.floor(((time / 1000) % 60)).toString().padStart(2,'0')}.` : '00.';
	timeString += `${Math.floor((time % 1000)).toString().padStart(3,'0')}`;
	return timeString;
 }