import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

export const NewMeetupPage = () => {
	const router = useRouter();
	
	const handleAddMeetup = async (meetupData) => {
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(meetupData)
		});

		const data = await response.json();
		console.log(data);

		router.replace('/');
	}

	return (
		<NewMeetupForm onAddMeetUp={ handleAddMeetup }/>
	)
}

export default NewMeetupPage;
