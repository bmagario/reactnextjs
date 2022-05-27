import { MongoClient } from "mongodb";

const handler = async (req, res) => {
	if(req.method === 'POST') {
		const data = req.body;

		const client = await MongoClient.connect(process.env.MONGODB_URI);									

		const db = client.db(process.env.MONGODB_DB);
		const meetupsCollection = db.collection('meetups');
		const result = await meetupsCollection.insertOne(data);
		client.close();
		res.status(201).json({
			message: 'Meetup created'		
		});
	}
}

export default handler;