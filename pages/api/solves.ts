import type { NextApiRequest, NextApiResponse } from 'next'

import clientPromise  from '../../utils/mongodb';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let mongodbClient = await (await clientPromise).connect();
	if(req.method === 'POST') {
		try {
			if(!process.env.SOLVE_COLLECTION_NAME) {
				throw new Error('MISSING SOLVE_COLLECTION_NAME FROM ENVIRONMENT');
			}
			let mongodbClient = await (await clientPromise).connect();
			let db = mongodbClient.db('rubik-scramble');
			await db.collection(process.env.SOLVE_COLLECTION_NAME).insertOne(JSON.parse(req.body));
			res.setHeader('Content-Type','application/json');
			res.status(200);
			await mongodbClient.close();
		} catch(error) {
			res.setHeader('Content-Type','application/json');
			res.json(error);
			res.status(405)
			res.end();
		}
	} else {
		try {
			let mongodbClient = await (await clientPromise).connect();
			let db = mongodbClient.db('rubik-scramble');
			res.setHeader('Content-Type','application/json');
			res.status(200);
			let solves = await db.collection('solves').find({}).toArray();
			res.setHeader('Content-Type', 'application/json');
			res.status(200);
			res.write(JSON.stringify(solves, null, 2));
			res.end();
			await mongodbClient.close();
		} catch(error) {
			res.setHeader('Content-Type','application/json');
			res.json(error);
			res.status(405)
			res.end();
			if(mongodbClient) {
				mongodbClient.close();
			}
		}
	}
	if(mongodbClient) {
		await mongodbClient.close();
	}
}

export async function getMongoDB() {
	
}
