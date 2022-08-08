export class ScrambleGenerator {

	moves: number;

	notationGroups : Array<Array<string>> = 
	[
		['R','L','F','B','U','D'],
		['R\'','L\'','F\'','B\'','U\'','D\''],
		['R2','L2','F2','B2','U2','D2']
	];

	scrambles: Array<string>;

	constructor(moves: number = 20) {
		this.moves = moves;
		this.scrambles = new Array<string>();
	}

	get nextScramble() {
		if(this.scrambles.length == 0) {
			this.generate();
			return this.scrambles.shift();
		}
		return this.scrambles.shift();
	}

	generate(numScrambles: number = 25) {
		for(let i = 0; i < numScrambles; i++) {
			let lastCol = this.notationGroups[0].length;
			let beforeLastCol = this.notationGroups[0].length;
			let scramble = '';
			for(let j = 0; j < 20; j++) {
				let pickGroup = Math.floor(Math.random() * this.notationGroups.length);
				let pickCol = Math.floor(Math.random() * this.notationGroups[pickGroup].length);
				let isComutative = (lastCol / 2) == (beforeLastCol / 2);
				while(pickCol == lastCol || isComutative && pickCol ==  beforeLastCol) {
					pickCol = Math.floor(Math.random() * this.notationGroups[pickGroup].length);
				}
				scramble += this.notationGroups[pickGroup][pickCol] + ' ';
				beforeLastCol = lastCol;
				lastCol = pickCol;
				
			}
			this.scrambles.push(scramble.trimEnd());
		}
	}
}