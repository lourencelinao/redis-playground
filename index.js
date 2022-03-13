import express from 'express';
import { createClient } from 'redis';
import axios from 'axios';

const app = express();

const fakeStoreApi = 'https://fakestoreapi.com/products';

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect().then(async () => {
	console.log('Redis/Publisher connected');

  let count = 0;

	setInterval(async () => {
    await client.publish(
      'notification',
      JSON.stringify({ message: count })
    );

    count += 1;
  }, 1000)
});

app.get('/', (req, res) => {
	return res.send('Data');
});

const checkCache = async (req, res, next) => {
	try {
		const data = await client.get('store');

		if (!data) return next();

		console.log('Fetched from cache');
		return res.json({ data });
	} catch (err) {
		console.log('Cache Checking Error', err);
		return next();
	}
};

app.get('/store', checkCache, async (req, res) => {
	const { data } = await axios.get(fakeStoreApi);

	await client.set('store', JSON.stringify(data));

  console.log('Fetched from API')
	return res.json(data);
});

app.listen(3000, () => console.log('Server started at port 3000'));
