import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

export const HomePage = (props) => {

	return (
		<MeetupList meetups={ props.meetups } />
	)
}

// export const getServerSideProps = async (context) => {
// 	const req = context.req;
// 	const resp = context.res;

// 	return {
// 		props: {
// 			meetups: DUMMY_DATA
// 		}
// 	}
// }

export const getStaticProps = async () => {
	const client = await MongoClient.connect(process.env.MONGODB_URI);									

	const db = client.db(process.env.MONGODB_DB);
	const meetupsCollection = db.collection('meetups');
	const meetups = await meetupsCollection.find({}).toArray();
	client.close();

	return {
		props: {
			meetups: meetups.map(meetup => ({
				id: meetup._id.toString(),
				title: meetup.title,
				image: meetup.image,
				address: meetup.address,
				description: meetup.description,
				date: meetup?.date || null,
				time: meetup?.time || null,
			}))
		},
		revalidate: 10
	}
}

export default HomePage;
