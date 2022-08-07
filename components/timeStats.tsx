
import React from 'react';
import { Solve } from '../models/solve';
import { SolveComponent } from './solve';
import { formatTime, averageTime } from '../utils/time';
import RubikAPI from '../utils/rubikAPI';
import { SolveCollection } from '../models/solveCollection';
import Cookies from 'universal-cookie';
import Toast from './toasts/toast';
import ToastContainer from './toasts/toastContainer';

interface Props {
	Data: Array<Solve>;
}

interface State {
	solveData: SolveCollection;
	userHash: string;
	toasts: Array<string>;
}

export class TimeStatsComponent extends React.Component<{},State> {

	userHashSet: boolean;
	toasts: Array<string>;

	constructor(props: {}) {
		super(props);
		const cookies = new Cookies();
		this.userHashSet = false;
		this.toasts = new Array<string>();
		this.state = {solveData:  new SolveCollection(), userHash: cookies.get('userHash'), toasts: new Array<string>() };
	}

	async componentDidMount() {
		let cookies = new Cookies();
		let userHash = cookies.get('userHash');
		let solves = await RubikAPI.Helper.findAllSolves();
		if(userHash === undefined) {
			let userRequest = await RubikAPI.Helper.createUser();
			let json = await userRequest.json();
			userHash = json.hash;
			this.userHashSet = true;
			if(userHash !== undefined) {
				cookies.set('userHash',userHash);
				this.toasts.push(json.message);
			}
		}
		if(userHash !== undefined) {
			this.setState((state) => ({solveData: new SolveCollection(solves), userHash: userHash, toasts: this.toasts}))
		}
	}

	render() {
		return (
			<div className='max-h-full mt-2 w-11/12 md:w-5/12 overflow-y-auto'>
				<ToastContainer>
					{this.renderToasts.bind(this)()}
				</ToastContainer>
				<div>
					<p className='font-fira'>last: {formatTime(this.state.solveData.lastTime)}</p>
					<p className='font-fira'>best: {formatTime(this.state.solveData.bestTime)}</p>
					<p className='font-fira'>ao5: {formatTime(this.state.solveData.currentAOFive)}</p>
					<p className='font-fira'>ao12: {formatTime(this.state.solveData.currentAOTwelve)}</p>
				</div>
			</div>
		)
	}


	async add(solve : Solve) {
		this.setState({solveData: await this.state.solveData.addSolve(solve, true)});
	}

	renderToasts() {
		let toasts = this.toasts.slice().map((x,i) => { return <Toast key={i+x}>{x}</Toast> });
		this.toasts = new Array<string>();
		return toasts;
	}
}