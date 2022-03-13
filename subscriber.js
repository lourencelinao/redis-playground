import { createClient } from 'redis';

const subscriber = createClient();

subscriber.connect().then(async () => {
	console.log('Redis/Subscriber connected');

	await subscriber.subscribe('notification', (message) => {
		console.log('Subscribed notification:', JSON.parse(message));
	});

  subscriber.on('error', (err) => console.log('Redis Client Error', err));
});
