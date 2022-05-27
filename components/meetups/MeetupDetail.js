import classes from './MeetupDetail.module.css';

export const MeetupDetail = ({
	id,  
	image,  
	title,
	address,
	date,
	time,
	description
 }) => {
	return (
		<section className={ classes.detail }>
			<img src={ image } alt='imageMeetup' />
			<h1>{ title }</h1>
			<address>{ address }</address>
			<p>{ description }</p>
			<span>{ date } - { time }</span>
		</section>
	)
}


export default MeetupDetail;