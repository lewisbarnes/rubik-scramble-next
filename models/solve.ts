import { ObjectId } from 'mongodb';


export class Solve {
	_id?: ObjectId;
	scramble: string;
	time: number;
	averageOfFive?: number;
	averageOfTwelve?: number;

	constructor(scramble: string, time: number, averageOfFive?: number, averageOfTwelve?: number, id?: ObjectId) {
		this.scramble = scramble;
		this.time = time;
		this.averageOfFive = averageOfFive;
		this.averageOfTwelve = averageOfTwelve;
		this._id = id;
	}

	getFormattedTime() {
		let timeString: string = '';
		timeString += Math.floor(((this.time / 1000) / 60)) >= 1 ? `${Math.floor(((this.time / 1000) / 60)).toString().padStart(2,'0')}:` : '';
		timeString +=  Math.floor(((this.time / 1000) % 60)) >= 1 ? `${Math.floor(((this.time / 1000) % 60)).toString().padStart(2,'0')}.` : '00.';
		timeString += `${Math.floor((this.time % 1000)).toString().padStart(3,'0')}`;
		return timeString;
	}
}