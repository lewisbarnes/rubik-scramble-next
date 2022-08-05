import { NextPageContext } from 'next';
import React from 'react';
import $ from 'jquery';
import { stat } from 'fs';
import { ScrambleComponent } from './scramble';

interface Props {
	numScrambles : number;
	displaySingle: boolean;
	hidden: boolean;
}

interface State {
	currentScrambles: Array<string>;
}

class ScrambleGeneratorComponent extends React.Component<Props, State> {

	notationGroups : Array<Array<string>> = 
	[
		['R','L','F','B','U','D'],
		['R\'','L\'','F\'','B\'','U\'','D\''],
		['R2','L2','F2','B2','U2','D2']
	];

	constructor(props: Props) {
		super(props);
		this.state = {
			currentScrambles: new Array<string>()
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
						this.props.displaySingle ? <ScrambleComponent key={1} moves={ this.state.currentScrambles[this.state.currentScrambles.length -1] ? this.state.currentScrambles[this.state.currentScrambles.length -1] : '' } hidden={this.props.hidden} /> :
						this.state.currentScrambles.slice().map((scramble, i) => {
							return <ScrambleComponent key={i} moves={ scramble } hidden={this.props.hidden} />
						})
					}
			</div>
		);
	}

	generate() {
		for(let i = 0; i < this.props.numScrambles; i++) {
			let lastCol = this.notationGroups[0].length;
			let beforeLastCol = this.notationGroups[0].length;
			let scramble = '';
			for(let j = 0; j < 15; j++) {
				let pickGroup = Math.floor(Math.random() * this.notationGroups.length);
				let pickCol = Math.floor(Math.random() * this.notationGroups[pickGroup].length);
				let isComutative = (lastCol / 2) == (beforeLastCol / 2);
				while(pickCol == lastCol || isComutative && pickCol ==  beforeLastCol) {
					pickCol = Math.floor(Math.random() * this.notationGroups[pickGroup].length);
				}
				scramble += this.notationGroups[pickGroup][pickCol] + ' ';
				beforeLastCol = lastCol;
				lastCol = pickCol;

			}
			this.state.currentScrambles.push(scramble);
			this.setState({currentScrambles: this.state.currentScrambles})
		}
	}

	popScramble() {
		let scramble = this.state.currentScrambles.pop();
		let retScramble : string;
		if(scramble) {
			retScramble = scramble;
		} else {
			retScramble = '';
		}
		if(this.state.currentScrambles.length == 0) {
			this.generate();
		}
		return retScramble;
	}
}

export default ScrambleGeneratorComponent;