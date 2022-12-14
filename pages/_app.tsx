import '../styles/globals.css'
import '../styles/styles.css'
import type { AppProps } from 'next/app'
import NavMenuComponent from '../components/nav/navMenu'
import NavButton from '../components/nav/navButton'
import { withRouter } from 'next/router'
import version from '../package.json';

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  return (
    <div className='bg-gradient-to-b from-gray-800 bg-scroll to-black h-screen w-screen flex flex-col pt-4 font-fira lowercase'>
      <div className='text-white h-full max-h-full overflow-y-auto'>
	  	<div className='w-full text-center'>
			{process.env.NODE_ENV == 'development' ? 'DEVELOPMENT ENVIRONMENT' : ''}
		</div>
        <Component {...pageProps} />
      </div>
      <div className='text-white mt-4 pb-4 font-fira md:flex md:flex-col items-center'>
        <NavMenuComponent>
			<NavButton label='home' route='/'/>
          	<NavButton label='timer' route='/timer'/>
          	<NavButton label='solves' route='/solves'/>
          	<NavButton label='scrambles' route='/scrambles'/>
          	<NavButton label='help' route='/help'/>
          	<NavButton label='settings' route='/settings'/>
          	<NavButton label='about' route='/about'/>
        </NavMenuComponent>
      </div>
    </div>
  )
}

export default MyApp
