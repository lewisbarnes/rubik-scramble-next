import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { bodyStreamToNodeStream } from 'next/dist/server/body-streams';
import { adler32 } from '../../../utils/hashing';

import clientPromise  from '../../../utils/mongodb';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let mongodbClient = await (await clientPromise).connect();
	try {
		const forwarded = req.headers['x-forwarded-for'];
		const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
		let adlerHash;
		if(ip) {
			adlerHash = adler32(ip);
		}
		let db = mongodbClient.db(process.env.DB_NAME);
		if(!process.env.SOLVE_COLLECTION_NAME) {
			throw new ReferenceError('MISSING SOLVE_COLLECTION_NAME FROM ENVIRONMENT VARIABLES');
		}
		if(req.method === 'POST') {
				let tempBody = JSON.parse(req.body);
				tempBody.userHash = adlerHash;
				delete tempBody.averageOfFive;
				delete tempBody.averageOfTwelve;
				let result = await db.collection(process.env.SOLVE_COLLECTION_NAME).insertOne(tempBody);
				if(result.acknowledged) {
					res.json({inserted: result.acknowledged, id: result.insertedId});
					res.status(201);
				} else {
					res.status(500);
				}
		} else if(req.method === 'GET'){
			let solves = await db.collection(process.env.SOLVE_COLLECTION_NAME).find({}).toArray();
			res.status(200);
			res.json(solves);
			res.end();
		}
	} catch(error: any) {
		res.json(error);
		res.status(500);
	}
	finally {
		if(mongodbClient) {
			mongodbClient.close();
		}
		res.end();
	}
}

export async function getMongoDB() {
	
}
