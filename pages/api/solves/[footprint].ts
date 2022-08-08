import type { NextApiRequest, NextApiResponse } from 'next'
import { Solve } from '../../../models/solve';

import clientPromise  from '../../../utils/mongodb';

const PAGE_DOCUMENTS = 25;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let mongodbClient = await (await clientPromise).connect();
	try {
		const forwarded = req.headers['x-forwarded-for'];
		const footprint = req.query.footprint;
		const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
		let db = mongodbClient.db(process.env.DB_NAME);
		if(!process.env.SOLVE_COLLECTION_NAME) {
			throw new ReferenceError('MISSING SOLVE_COLLECTION_NAME FROM ENVIRONMENT VARIABLES');
		}
		if(!process.env.USER_COLLECTION_NAME) {
			throw new ReferenceError('MISSING USER_COLLECTION_NAME FROM ENVIRONMENT VARIABLES');
		}
		res.setHeader('Content-Type','application/json');
		if(req.method === 'GET'){
			let user = await db.collection(process.env.USER_COLLECTION_NAME).findOne({footprint: footprint});
			let solves = await db.collection(process.env.SOLVE_COLLECTION_NAME).find({userID: user?._id}).toArray();
			res.status(200);
			res.json(solves);
		} else {
			res.status(405);
			res.json({status: 405, message: `method '${req.method}' not allowed`});
		}
		res.end();
	} catch(error: any) {
		res.json({status: 500, message: error.message});
		res.status(500);
		res.end();
	}
	finally {
		if(mongodbClient) {
			mongodbClient.close();
		}
		
	}
}

function validateRequestJSON(json: Solve) {
	
}
