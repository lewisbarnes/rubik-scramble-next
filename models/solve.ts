import { ObjectId } from 'mongodb';
import { formatTime } from '../utils/time';


export class Solve {
	_id?: ObjectId;
	scramble: string;
	time: number;
	averageOfFive: number;
	averageOfTwelve: number;

	constructor(scramble: string = '', time: number = 0, averageOfFive: number = 0, averageOfTwelve: number = 0, id?: ObjectId) {
		this.scramble = scramble;
		this.time = time;
		this.averageOfFive = averageOfFive;
		this.averageOfTwelve = averageOfTwelve;
		if(id) {
			this._id = id;
		}
	}

	getFormattedTime() {
		return formatTime(this.time);
	}
}