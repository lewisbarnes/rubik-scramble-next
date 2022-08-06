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
      <div className='dark:text-white dark:bg-black border-black border-t-8 pb-4 border-solid font-fira md:flex md:flex-col items-center'>
        <NavMenuComponent>
          <NavButton label='timer' routes={['/timer']} />
          <NavButton label='solves' routes={['/solves']}/>
          <NavButton label='scrambles' routes={['/scrambles']} />
          <NavButton label='help' routes={['/help']}/>
          <NavButton label='settings' routes={['/settings']}/>
          <NavButton label='about' routes={['/about']}/>
        </NavMenuComponent>
      </div>
    </div>
  )
}

export default MyApp
