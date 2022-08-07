import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {

		if(req.method === 'POST') {
			res.status(405);

		} else if(req.method === 'GET'){
			res.json({ result: 'ok'});
			res.status(500);
		}
	} catch(error: any) {
		res.json(error);
		res.status(500);
	}
	finally {
		res.end();
	}
}