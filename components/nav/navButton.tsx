import { NextRouter, Router, useRouter, withRouter } from 'next/router';
import React from 'react';

interface Props {
	label: string;
	router: NextRouter;
	route: string;
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
			<a href={this.props.route} className={
				`${this.props.route == this.props.router.pathname ? 'bg-black dark:bg-white text-white dark:text-black' : 
				''} rounded-md md:px-2`}>{this.props.label}</a>
		);
	}
}

export default withRouter(NavButton);