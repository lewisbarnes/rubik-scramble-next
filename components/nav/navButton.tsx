import { NextRouter, Router, useRouter, withRouter } from 'next/router';
import React from 'react';

interface Props {
	label: string;
	router: NextRouter;
	routes: Array<string>;
}

class NavButton extends React.Component<Props> {

	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {

	}
	
	componentDidUpdate(prevProps: Props) {

	}

	render() {
		return(
			<a href={this.props.routes[0]} className={
				`${this.props.routes.some(x => x == this.props.router.pathname) ? 'bg-black dark:bg-white text-white dark:text-black' : 
				''} rounded-md px-2`}>{this.props.label}</a>
		);
	}
}

export default withRouter(NavButton);