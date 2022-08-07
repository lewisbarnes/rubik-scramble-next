import React from 'react';

interface Props {
	children: React.ReactNode;
}

interface State {
	hidden: boolean;
}

class Toast extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = { hidden: false };
	}

	render() {
		return(
			<div className={`max-h-fit max-w-fit bg-white dark:text-black dark:bg-white pb-2 mb-2 ${this.state.hidden ? 'hidden' : ''}`}>
				<button className='w-32 text-right pr-2 mb-2 border-b-2' onClick={this.hide.bind(this)}>x</button>
				{this.props.children}
			</div>
		);
	}

	hide() {
		this.setState({hidden: true});
	}
}

export default Toast;