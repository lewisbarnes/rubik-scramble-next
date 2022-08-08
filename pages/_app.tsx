import '../styles/globals.css'
import '../styles/styles.css'
import type { AppProps } from 'next/app'
import NavMenuComponent from '../components/nav/navMenu'
import NavButton from '../components/nav/navButton'
import { withRouter } from 'next/router'

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  return (
    <div className='dark:bg-black h-screen w-screen flex flex-col pt-4 font-fira'>
      <div className='dark:text-white dark:bg-black h-full max-h-full overflow-y-auto'>
        <Component {...pageProps} />
      </div>
      <div className='dark:text-white mt-8 pb-8 font-fira md:flex md:flex-col items-center'>
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
