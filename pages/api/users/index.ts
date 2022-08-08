import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../utils/mongodb";
import * as CryptoJS from 'crypto-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let mongodbClient = await (await clientPromise).connect();
	try {
		let db = mongodbClient.db(process.env.DB_NAME);
		if(req.method === 'POST'){
			if(req.body == {} ) {
				res.json({error: 'bad request: a body must be included with this request'});
				res.status(400);
			} else if(!JSON.parse(req.body).footprint) {
					res.json({error: 'bad request: footprint must be included in the request body'});
					res.status(400);
			} else {
				let footprint : string;
				footprint = CryptoJS.SHA256(Date.now().toString()).toString();
				let result = await db.collection('users').insertOne({name: '', footprint: footprint});
				if(result.acknowledged == true) {
						res.json({message:  'user created', footprint: footprint});
						res.status(201);
				} else {
					res.json({message: 'failed to create user'});
					res.status(500);
				}
			}
		} else {
			console.log(405);
			res.json({status:405,message:'method not allowed'});
			res.status(405);
		}
	} catch(error: any) {
		res.json(error);
		res.status(500);
	} finally {
		if(mongodbClient) {
			await mongodbClient.close();
		}
		res.end();
	}
}