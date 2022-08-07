import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../utils/mongodb";
import * as CryptoJS from 'crypto-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let mongodbClient = await (await clientPromise).connect();
	try {
		let db = mongodbClient.db(process.env.DB_NAME);
		if(req.body == {} ) {
			console.log(JSON.parse(req.body));
			res.json({error: 'bad request: a body must be included with this request'});
			res.status(400);
			console.log('failed');
		} else if(!JSON.parse(req.body).userID) {
				console.log(JSON.parse(req.body));
				res.json({error: 'bad request: userID must be included in the request body'});
				res.status(400);
		} else {
			if(req.method === 'GET') {
			} else if(req.method === 'POST'){
				console.log(JSON.parse(req.body));
				let sha256Hash : string;
				sha256Hash = CryptoJS.SHA256(Date.now.toString()).toString();
				console.log(sha256Hash);
				let result = await db.collection('users').insertOne({name: '', hash: sha256Hash});
				console.log(result);
				if(result.acknowledged == true) {
						res.json({message:  'user created', hash: sha256Hash});
						res.status(201);
				} else {
					res.json({message: 'failed to create user'});
					res.status(500);
				}
			} else if(req.method === 'PUT') {
				res.status(204);
			} else if(req.method === 'DELETE') {
				res.status(204);
			}
		}

	} catch(error: any) {
		res.json(error);
		res.status(500);
	}
	finally {
		if(mongodbClient) {
			await mongodbClient.close();
		}
		res.end();
	}
}