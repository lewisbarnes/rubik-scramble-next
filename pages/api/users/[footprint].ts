import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../utils/mongodb";
import * as CryptoJS from 'crypto-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let mongodbClient = await (await clientPromise).connect();
	try {
		let db = mongodbClient.db(process.env.DB_NAME);
			if(req.method === 'PATCH') {
				let footprint : string;
				let currentFootPrint = req.query.footprint;
				footprint = CryptoJS.SHA256(Date.now().toString()+currentFootPrint).toString();
				let user = await db.collection('users').findOne({footprint: currentFootPrint});
				if(user != null) {
					let result = await db.collection('users').updateOne({_id: user._id}, { $set: { footprint: footprint }});
					if(result.acknowledged) {
						if(result.modifiedCount > 0) {
							res.json({message: 'user footprint updated', footprint: footprint});
							res.status(200);
						}
					}
				} else {
					res.json({status:404,message:"user not found"});
					res.status(404);
				}
			} else {
				console.log(405);
				res.json({status:405,message: "method not allowed"});
				res.status(405);
			}
	} catch(error: any) {
		console.log(error);
		res.json(error);
		res.status(500);
	} finally {
		if(mongodbClient) {
			await mongodbClient.close();
		}
		res.end();
	}
}