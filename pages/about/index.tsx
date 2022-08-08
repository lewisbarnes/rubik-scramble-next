import { NextPage } from "next"

export const About : NextPage = () => {
	return (
		<main className='font-fira flex flex-col items-center'>
			<svg className='dark:bg-white rounded-full mt-8'  version="1.0" xmlns="http://www.w3.org/2000/svg"  width="100.000000pt" height="100.000000pt" viewBox="0 0 200.000000 200.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="#ffffff"> <path d="M890 1874 c-218 -40 -375 -118 -510 -254 -115 -114 -194 -256 -236 -420 -26 -104 -26 -296 0 -400 85 -332 324 -571 656 -656 104 -26 296 -26 400 0 333 85 571 323 656 656 26 104 26 296 0 400 -83 327 -317 564 -641 652 -68 18 -271 32 -325 22z m481 -355 l52 -11 -7 -142 c-4 -77 -9 -156 -13 -173 l-5 -33 -69 0 -69 0 0 111 0 111 -42 -7 c-67 -11 -103 -30 -157 -80 -58 -55 -91 -106 -123 -196 -22 -60 -23 -76 -20 -281 l2 -218 105 0 105 0 0 -65 0 -65 -270 0 -270 0 0 65 0 65 80 0 80 0 0 390 0 390 -80 0 -80 0 0 65 0 65 144 0 144 0 12 -115 c7 -63 16 -115 20 -115 4 0 11 10 17 23 17 36 85 122 122 153 73 61 208 87 322 63z"/> </g> </svg> 
			<a className='m-4' href='https://github.com/lewisbarnes'>github.com/lewisbarnes</a>
		</main>
	)
}

export default About;