import { api } from 'encore.dev/api';
import { db } from './db';

// Define the response type
interface JokeResponse {
    id: number;
    setup: string;
    punchline: string;
    category: string;
}

// API endpoint to get a random joke
export const getRandomJoke = api(
    { expose: true, method: 'GET', path: '/jokes/random' },
    async (): Promise<JokeResponse> => {
        // Get a random joke from the database
        const result = await db.query<JokeResponse>`
            SELECT id, setup, punchline, category 
            FROM jokes 
            ORDER BY RANDOM() 
            LIMIT 1
        `;
        
        // Convert async iterator to array
        const jokes: JokeResponse[] = [];
        for await (const row of result) {
            jokes.push(row);
        }
        
        if (jokes.length === 0) {
            throw new Error('No jokes found');
        }

        return jokes[0];
    }
); 