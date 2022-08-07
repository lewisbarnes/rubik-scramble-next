import { ObjectId } from 'mongodb';
import { formatTime } from '../utils/time';


export class Solve {
	_id?: ObjectId;
	scramble: string;
	time: number;
	averageOfFive: number;
	averageOfTwelve: number;
	userHash: string;

	constructor(scramble: string = '', time: number = 0, userHash = '', averageOfFive: number = 0, averageOfTwelve: number = 0, id?: ObjectId, ) {
		this.scramble = scramble;
		this.time = time;
		this.averageOfFive = averageOfFive;
		this.averageOfTwelve = averageOfTwelve;
		this.userHash = userHash;
		if(id) {
			this._id = id;
		}
	}

	getFormattedTime() {
		return formatTime(this.time);
	}

	getFormattedAO5() {
		return formatTime(this.averageOfFive);
	}

	getFormattedAO12() {
		return formatTime(this.averageOfTwelve);
	}
}