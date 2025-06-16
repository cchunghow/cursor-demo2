import { api } from 'encore.dev/api';
import { db } from './db';

interface AddJokeRequest {
    joke: string;
    category: string;
}

interface AddJokeResponse {
    message: string;
}

export const addJoke = api(
    { expose: true, method: 'POST', path: '/jokes' },
    async (body: AddJokeRequest): Promise<AddJokeResponse> => {
        if (!body.joke || !body.category) {
            throw new Error('Missing required fields');
        }
        try {
            await db.exec`
                INSERT INTO jokes (joke, category)
                VALUES (${body.joke}, ${body.category})
            `;
            return { message: 'Joke added successfully' };
        } catch (error) {
            throw new Error('Failed to add joke');
        }
    }
); 