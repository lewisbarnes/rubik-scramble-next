/*
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
IN THE SOFTWARE.
*/

export enum TimerMode {
	Countdown = 0,
	Normal,
}

export class GeneralTimer extends Object {

	startTime: number;
	endTime: number;

	isRunning: boolean;
	mode: TimerMode;

	countdownInterval : number;
	updateInterval: number;

	updateTimer!: NodeJS.Timer;
	elapsedTimer!: NodeJS.Timer;

	updateCallback!: Function | null;
	elapsedCallback!: Function | null;
	
	constructor(pUpdateInterval: number, pCallback: Function) {
		super();
		this.startTime = 0;
		this.endTime = 0;
		this.isRunning = false;
		this.mode = TimerMode.Normal;
		this.countdownInterval = 0;
		this.updateCallback = pCallback;
		this.updateInterval = pUpdateInterval;
	}

	start(): void {
		this.startTime =  Date.now();
		if(this.mode != TimerMode.Countdown) {
			this.endTime = this.startTime;
		} else {
				if(this.elapsedCallback != undefined) {
					this.elapsedTimer = setInterval(this.elapse, this.countdownInterval * 1000);
				}
			}
		this.isRunning = true;
		this.updateTimer = setInterval(this.update, this.updateInterval);
	}

	stop(): void {
		this.endTime = Date.now();
		this.countdownInterval = 0;
		this.isRunning = false;
		clearInterval(this.elapsedTimer);
		this.mode = TimerMode.Normal;
	}

	reset(): void {
		this.stop();
		this.startTime = 0;
		this.endTime = 0;
	}

	countDown(pSeconds: number, pCallback: Function) {
		this.mode = TimerMode.Countdown;
		this.countdownInterval = pSeconds;
		this.elapsedCallback = pCallback;
		this.endTime = Date.now() + (pSeconds * 1000);
	}

	update(): void {
		if(!this.isRunning) {
			clearInterval(this.updateInterval);
		}
		if(this.updateCallback != undefined) {
			this.updateCallback(this.toString());
		}
	}

	elapse() : void {
		if(this.elapsedCallback != null) {
			this.elapsedCallback();
		}
		this.stop();
		clearInterval(this.elapsedTimer);
		
	}

	getTime(): string {
		return this.millisecondsAsTimeString((this.mode == TimerMode.Countdown ? this.endTime : this.isRunning ? Date.now() : this.endTime) - (this.mode == TimerMode.Countdown ? Date.now() : this.startTime));
	}

	millisecondsAsTimeString(pMilliseconds: number, pIncludeMinutes: boolean = false): string {
		let timeString: string = '';
		timeString += Math.floor(((pMilliseconds / 1000) / 60)) >= 1 ? `${Math.floor(((pMilliseconds / 1000) / 60)).toString().padStart(2,'0')}:` : pIncludeMinutes ? '00:' : '';
		timeString +=  Math.floor(((pMilliseconds / 1000) % 60)) >= 1 ? `${Math.floor(((pMilliseconds / 1000) % 60)).toString().padStart(2,'0')}.` : '00.';
		timeString += `${Math.floor((pMilliseconds % 1000)).toString().padStart(3,'0')}`;
		return timeString;
	}

	timeToMilliseconds(pMinutes: number, pSeconds: number, pMilliseconds: number): number {
		return ((pMinutes * 1000) * 60) + (pSeconds * 1000) + pMilliseconds;
	}

	timeToMillisecondsFromString(pTimeString: string): number {
		let segments : Array<string> = pTimeString.split(':');
		if(segments.length == 1) {
			segments = segments[0].split('.');
			segments.forEach(x => x = x.replace(/^0*/,''));
			segments.forEach(x => x = x == '' ? '0' : x);
			segments.unshift('0');
		} else if(segments.length == 2) {
			let secMillis: Array<string> = segments[1].split('.');
			secMillis.forEach(x => x = x.replace(/^0*/,''));
			segments.forEach(x => x = x.replace(/^0*/,''));
			secMillis.forEach(x => x = x == '' ? '0' : x);
			segments.forEach(x => x = x == '' ? '0' : x);
			segments[1] = secMillis[0];
			segments[2] = secMillis[1];
		}
		return ((parseInt(segments[0]) * 1000) * 60) + (parseInt(segments[1]) * 1000) + parseInt(segments[2]);
	}
}