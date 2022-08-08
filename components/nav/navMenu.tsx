import React from 'react';

interface Props {
	children: React.ReactNode;
}

interface State {
	isHidden: boolean;
}

class NavMenuComponent extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = { isHidden: false };
	}

	render() {
		return(
			<div className='font-fira max-h-full flex flex-col md:flex-row flex-wrap px-32 text-center'>
				<button className='md:hidden pb-2' onClick={this.hide.bind(this)}>{this.state.isHidden ? 'unhide' : 'hide'}</button>
				{this.state.isHidden ? '' : this.props.children}
			</div>
		);
	}

	hide() {
		this.setState((state) => ({ isHidden: !state.isHidden }));
	}
}

export default NavMenuComponent;