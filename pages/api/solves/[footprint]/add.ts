import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../utils/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let mongodbClient = await (await clientPromise).connect();
	try {
		const forwarded = req.headers['x-forwarded-for'];
		const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
		let db = mongodbClient.db(process.env.DB_NAME);
		if(!process.env.SOLVE_COLLECTION_NAME) {
			throw new ReferenceError('MISSING SOLVE_COLLECTION_NAME FROM ENVIRONMENT VARIABLES');
		}
		res.setHeader('Content-Type','application/json');
		if(req.method === 'POST') {
			let solve = req.body.solve;
			let footprint = req.body.footprint;
			delete solve.averageOfFive;
			delete solve.averageOfTwelve;
			
			let user = await db.collection('users').findOne({footprint: footprint});
			if(user) {
				solve.userID = user?._id;
				let result = await db.collection(process.env.SOLVE_COLLECTION_NAME).insertOne(solve);
				if(result.acknowledged) {
					res.json({inserted: result.acknowledged, id: result.insertedId});
					res.status(201);
				} else {
				}
			} else {
				res.json({status:500, message: 'internal server error'});
				res.status(500);
			}

		} else {
			res.status(405);
			res.json({status: 405, message: `method '${req.method}' not allowed`});
		}
		res.end();
	} catch(error: any) {
		console.log(error);
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