import { NextPage } from "next"
import version from '../../package.json';

export const About : NextPage = () => {
	return (
		<main className='font-fira flex flex-col items-center select-none h-full place-content-center'>
			<img alt="github.com/lewisbarnes" width="200" className="rounded-full p-1 bg-white sepia brightness-130 animate-none" src="https://avatars.githubusercontent.com/u/9212332?v=4"></img>
			<div className="pt-8 flex ">
			<a className='invert' href='https://github.com/lewisbarnes'><img alt="GitHub icon" height="48" src="../img/github_icon.png"></img></a>
			<a className='invert' href='https://linkedin.com/in/lewiswbarnes'><img alt="LinkedIn icon" width="48" src="../img/linkedin_icon.png"></img></a>
			<a className='invert' href='https://soundcloud.com/lewisbarnes7'><img alt="SoundCloud icon" width="48" src="../img/soundcloud_icon.png"></img></a>
			</div>

		</main>
	)
}

export default About;