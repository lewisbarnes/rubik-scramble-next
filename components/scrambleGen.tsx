import { NextPageContext } from 'next';
import React from 'react';
import $ from 'jquery';
import { stat } from 'fs';
import { Scramble } from './scramble';

interface Props {
	numScrambles : number;
	mode: string;
	scrambleCallback: Function;
	hidden: boolean;
}

interface State {
	currentScrambles: Array<Array<string>>;
	handler: Function;
}

export class ScrambleGen extends React.Component<Props, State> {

	notationGroups : Array<Array<string>> = 
	[
		['R','L','F','B','U','D'],
		['R\'','L\'','F\'','B\'','U\'','D\''],
		['R2','L2','F2','B2','U2','D2']
	];

	constructor(props: Props) {
		super(props);
		this.state = {
			currentScrambles: new Array<Array<string>>(),
			handler: props.scrambleCallback.bind(this)
		}
		props;
	}

	componentDidMount() {
		this.generate();
	}


	componentWillUnmount() {
	}

	componentDidUpdate (prevProps: Props, _prevState : State) {
		if(prevProps.numScrambles != this.props.numScrambles) {
			this.generate();
		}

	}

	render() {
		return (
			<div className={`pb-6 flex flex-col items-center ${this.props.hidden ? 'hidden': ''}`}>
					{
						this.state.currentScrambles.map((scramble, i) => {
							return <Scramble key={i} moves={ scramble } hidden={this.props.hidden} />
						})
					}
			</div>
		);
	}

	generate() {
		let scrambles = new Array<Array<string>>();
		for(let i = 0; i < this.props.numScrambles; i++) {
			let lastCol = this.notationGroups[0].length;
			let beforeLastCol = this.notationGroups[0].length;
			let scramble = new Array<string>();
			for(let j = 0; j < 15; j++) {
				let pickGroup = Math.floor(Math.random() * this.notationGroups.length);
				let pickCol = Math.floor(Math.random() * this.notationGroups[pickGroup].length);
				let isComutative = (lastCol / 2) == (beforeLastCol / 2);
				while(pickCol == lastCol || isComutative && pickCol ==  beforeLastCol) {
					pickCol = Math.floor(Math.random() * this.notationGroups[pickGroup].length);
				}
				scramble.push(this.notationGroups[pickGroup][pickCol]);
				beforeLastCol = lastCol;
				lastCol = pickCol;

			}
			scrambles.push(scramble);
			this.setState((state, _props) => (
				{ currentScrambles: scrambles }
			));
			this.state.handler(scrambles[0]);
		}
	}
}