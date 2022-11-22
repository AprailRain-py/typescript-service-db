import { IncomingMessage } from 'http';
import https from 'https';

// type definitions
interface Character {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	origin: {
		name: string;
		url: string;
	};
	location: {
		name: string;
		url: string;
	};
	image: string;
	episode: string[];
	url: string;
	created: string;
}

interface Episode {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: string[] | Character[];
	url: string;
	created: string;
}
interface Info {
	count: number;
	pages: number;
	next?: string;
	prev?: string;
}

interface EpisodeApiResponse {
	info: Info;
	results: Episode[];
}

const API_URL = 'https://rickandmortyapi.com/api';

// function to make api request. it returns a promise with given generic type
function request<T>(url: https.RequestOptions | string | URL): Promise<T> {
	return new Promise((resolve, reject) => {
		const cb = (res: IncomingMessage) => {
			let data = '';

			res.on('data', (chunk) => {
				data += chunk;
			});

			res.on('end', () => {
				const json = JSON.parse(data);
				if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
					const err = { error: data, statusCode: res.statusCode };
					reject(err);
				}
				resolve(json);
			});
		};
		https
			.request(url, cb)
			.on('error', (error) => {
				const err = { error };
				reject(err);
			})
			.end();
	});
}

async function main() {
	try {
		console.log('making all episodes request');
		//make episodes request
		const episodes = await request<EpisodeApiResponse>(`${API_URL}/episode`);

		//returns array of ids from given array of character url
		const getCharacterIdsFromEpisode = (characters: string[]) => {
			const charIds: string[] = [];
			for (const ch of characters) {
				const split = ch.split('/');
				charIds.push(split[split.length - 1]);
			}
			return charIds;
		};

		//make characters request
		for (const ep of episodes.results) {
			console.log('making character request for ep:', ep.id);
			const charIds = getCharacterIdsFromEpisode(ep.characters as string[]).join(',');
			ep.characters = await request<Character[]>(`https://rickandmortyapi.com/api/character/${charIds}`);
		}

		console.log(episodes.results);
	} catch (err) {
		console.log(err);
	}
}

main();
