import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Timer } from '../components/timer'
import { GeneralTimer } from '../scripts/generalTimer'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>rubik-scramble</title>
        <meta name="description" content="A timer for 3x3 twisty puzzles" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col h-screen bg-black items-center  ">
	  	<div id="header" className="mt-8 text-center mb-20 text-white">
                <h2 id="header-title" className="font-fira text-4xl">rubik-scramble</h2>
		</div>
		<div className='container flex-grow h-full px-8 text-center text-white'>
			<Timer />
		</div>
		<div className='w-full text-white text-center mb-4 font-fira'>
			<button className='mx-2 bg-white text-black p-2 rounded-md'>timer-mode</button>
			<button className='mx-2 rounded-md'>scramble-mode</button>
		</div>
      </main>


    </div>
  )
}

export default Home
