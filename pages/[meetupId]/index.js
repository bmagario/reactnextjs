import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

export const MeetupDetailsPage = (props) => {
	return (
		<MeetupDetail
			id={ props.meetupDetail.id }
			image={ props.meetupDetail.image }
			title={ props.meetupDetail.title }
			address={ props.meetupDetail.address }
			date={ props.meetupDetail.date }
			time={ props.meetupDetail.time }
			description={ props.meetupDetail.description }
		/>
	)
}

export const getStaticPaths = async () => {
	const client = await MongoClient.connect(process.env.MONGODB_URI);									

	const db = client.db(process.env.MONGODB_DB);
	const meetupsCollection = db.collection('meetups');
	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
	client.close();

	return {
		fallback: 'blocking',
		paths: meetups.map(meetup => ({
			params: {
				meetupId: meetup._id.toString()
			}
		}))
	}
}

export const getStaticProps = async (context) => {
	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(process.env.MONGODB_URI);									

	const db = client.db(process.env.MONGODB_DB);
	const meetupsCollection = db.collection('meetups');
	const meetupDetail = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
	client.close();

	return {
		props: {
			meetupDetail: {
				id: meetupDetail._id.toString(),
				image: meetupDetail.image,
				title: meetupDetail.title,
				address: meetupDetail.address,
				date: meetupDetail.date || null,
				time: meetupDetail.time || null,
				description: meetupDetail.description
			}
		}
	}
}

export default MeetupDetailsPage;
