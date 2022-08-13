import React from 'react';
import { ScrambleGenerator } from '../models/scrambleGenerator';
import { ScrambleComponent } from './scramble';

interface Props {
	displaySingle: boolean;
	hidden: boolean;
}

interface State {
	currentScrambles: Array<string>;
	generator: ScrambleGenerator;
}

class ScrambleList extends React.Component<Props, State> {

	notationGroups : Array<Array<string>> = 
	[
		['R','L','F','B','U','D'],
		['R\'','L\'','F\'','B\'','U\'','D\''],
		['R2','L2','F2','B2','U2','D2']
	];

	constructor(props: Props) {
		super(props);
		
		this.state = {
			currentScrambles: new Array<string>(),
			generator: new ScrambleGenerator()
		}
	}

	componentDidMount() {
		let generator = new ScrambleGenerator();
		generator.generate();
		this.setState({currentScrambles: generator.scrambles, generator: generator});
	}

	render() {
		return (
			<div className={`px-6 pb-6 flex flex-col uppercase ${this.props.hidden ? 'hidden': ''}`}>
					{
						this.props.displaySingle ? <ScrambleComponent key={1} moves={ this.state.currentScrambles[0] ? this.state.currentScrambles[0] : '' } hidden={this.props.hidden} /> :
						this.state.currentScrambles.slice().map((scramble, i) => {
							return <ScrambleComponent key={i} moves={ scramble } hidden={this.props.hidden} />
						})
					}
			</div>
		);
	}

	nextScramble() {
		let scramble = this.state.generator.nextScramble;
		this.setState((state) => ({currentScrambles: this.state.generator.scrambles, generator: this.state.generator}));
		if(scramble) {
			return scramble;
		} else {
			return '';
		}
		
	}
}

export default ScrambleList;