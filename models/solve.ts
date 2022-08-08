import { ObjectId } from 'mongodb';
import { formatTime } from '../utils/time';


export class Solve {
	_id?: ObjectId;
	scramble: string;
	time: number;
	private averageOfFive: number;
	private averageOfTwelve: number;
	method: string;

	constructor(scramble: string = '', time: number = 0, method: string =  'timer', averageOfFive: number = 0, averageOfTwelve: number = 0, id?: ObjectId) {
		this.scramble = scramble;
		this.time = time;
		this.averageOfFive = averageOfFive;
		this.averageOfTwelve = averageOfTwelve;
		this.method = method;
		if(id) {
			this._id = id;
		}
	}

	get AO5() {
		return this.averageOfFive;
	}

	get AO12() {
		return this.averageOfFive;
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